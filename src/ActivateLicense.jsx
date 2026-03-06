import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { api } from "./utils/api";

const initialFormState = {
    license_token: "",
    license_key: "",
};

const ActivateLicense = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { activateLicense, logout, isAuthenticated, isLoading, isLicenseVerified } = useAuth();

    const presetToken = useMemo(() => location.state?.licenseToken || "", [location.state]);
    const registeredEmail = useMemo(() => location.state?.registeredEmail || "", [location.state]);

    const [formData, setFormData] = useState(initialFormState);
    const [fieldErrors, setFieldErrors] = useState({});
    const [formError, setFormError] = useState("");
    const [successMsg, setSuccessMsg] = useState(location.state?.message || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isFetchingToken, setIsFetchingToken] = useState(false);
    const hasFetchedTokenRef = useRef(false);

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => {
                setSuccessMsg("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const fetchLicenseToken = useCallback(async (email) => {
        if (!email || isFetchingToken) return;

        setIsFetchingToken(true);
        try {
            // Use the local api utility instead of RTK Query mutation
            const response = await api.post('license/get-token', { email });
            if (response?.success && response?.licenseToken) {
                setFormData((prev) => ({ ...prev, license_token: response.licenseToken }));
            }
        } catch (error) {
            // Silently fail - user can still enter the token manually
            console.error("Failed to fetch license token:", error);
        } finally {
            setIsFetchingToken(false);
        }
    }, [isFetchingToken]);

    useEffect(() => {
        if (!isLoading && isAuthenticated && isLicenseVerified) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, isLoading, isLicenseVerified, navigate]);

    useEffect(() => {
        if (presetToken) {
            setFormData((prev) => ({ ...prev, license_token: presetToken }));
        } else if (registeredEmail && !hasFetchedTokenRef.current) {
            // Fetch license token from backend if not provided in state
            hasFetchedTokenRef.current = true;
            fetchLicenseToken(registeredEmail);
        }
    }, [presetToken, registeredEmail, fetchLicenseToken]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFieldErrors((prev) => ({ ...prev, [name]: "" }));
        setFormError("");
    };

    const validate = () => {
        const errors = {};

        if (!formData.license_token.trim()) {
            errors.license_token = "License request token is required";
        }

        if (!formData.license_key.trim()) {
            errors.license_key = "License key is required";
        }

        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsSubmitting(true);
        setFormError("");

        const payload = {
            licenseToken: formData.license_token.trim(),
            licenseKey: formData.license_key.trim(),
        };

        try {
            const response = await activateLicense(payload);

            if (response?.success) {
                // For restaurant project, we might want to reload or go to dashboard
                // Based on salon code, they go to login
                navigate("/login", {
                    replace: true,
                    state: {
                        message: "License activated. Please sign in.",
                        registeredEmail: registeredEmail,
                    },
                });
                return;
            }

            throw new Error(response?.message || "License activation failed");
        } catch (error) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to activate the license. Please verify the details and try again.";
            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8FA] px-4 py-10">
            <div className="w-full max-w-xl rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Activate your license</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Enter the license request token you received during registration along with the license
                        key shared by the administrator.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                        Both values must match what was issued to your business. If you haven't received a
                        license key yet, please contact your super admin.
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="license_token" className="block text-sm font-medium text-gray-700">
                            License request token
                        </label>
                        <input
                            id="license_token"
                            name="license_token"
                            type="text"
                            value={formData.license_token}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.license_token ? "border-red-400" : "border-gray-200"
                                }`}
                            placeholder="REQ-2025-XYZ"
                            disabled={isSubmitting || isFetchingToken}
                        />
                        {isFetchingToken && (
                            <p className="text-xs text-gray-500 mt-1">Loading license token...</p>
                        )}
                        {fieldErrors.license_token && (
                            <p className="text-xs text-red-500">{fieldErrors.license_token}</p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="license_key" className="block text-sm font-medium text-gray-700">
                            License key
                        </label>
                        <input
                            id="license_key"
                            name="license_key"
                            type="text"
                            value={formData.license_key}
                            onChange={handleChange}
                            className={`w-full rounded-lg border px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 ${fieldErrors.license_key ? "border-red-400" : "border-gray-200"
                                }`}
                            placeholder="LIC-2025-ABC123-XYZ789"
                            disabled={isSubmitting}
                        />
                        {fieldErrors.license_key && (
                            <p className="text-xs text-red-500">{fieldErrors.license_key}</p>
                        )}
                    </div>

                    {successMsg && (
                        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600">{successMsg}</div>
                    )}

                    {formError && (
                        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">{formError}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75"
                    >
                        {isSubmitting ? "Activating license..." : "Activate license"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Need to register instead?{" "}
                    <button
                        onClick={() => {
                            logout();
                            navigate("/register");
                        }}
                        className="font-medium text-blue-600 hover:text-blue-700 bg-transparent border-0 p-0 cursor-pointer"
                    >
                        Go back to registration
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ActivateLicense;

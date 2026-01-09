import React, { useState } from 'react';
import { api } from './utils/api';
import { useNavigate } from 'react-router-dom';

const LicenseKey = () => {
    const [licenseKey, setLicenseKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!licenseKey.trim()) return;

        setIsLoading(true);
        setMessage('');
        setStatus(null);

        try {
            const response = await api.post('license/verify', { licenseKey });

            if (response.success) {
                setStatus('success');
                setMessage(response.message || 'License verified successfully!');
                // Update local storage or context if they store license status?
                // For now, redirect to dashboard after a delay
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setStatus('error');
                setMessage(response.message || 'Verification failed');
            }
        } catch (error) {
            console.error('License verification error:', error);
            setStatus('error');
            setMessage(error.message || 'Failed to verify license. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Activate License
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Please enter your license key to activate your restaurant account.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerify}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="license-key" className="sr-only">
                                License Key
                            </label>
                            <input
                                id="license-key"
                                name="licenseKey"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Enter License Key (e.g. XXXX-XXXX-XXXX)"
                                value={licenseKey}
                                onChange={(e) => setLicenseKey(e.target.value)}
                            />
                        </div>
                    </div>

                    {message && (
                        <div
                            className={`rounded-md p-4 ${status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                                }`}
                        >
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium">{message}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${isLoading
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                                }`}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : null}
                            {isLoading ? 'Verifying...' : 'Verify License'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LicenseKey;

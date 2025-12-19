// import React, { useState, useEffect } from "react";
// import { generateLicense, getMyLicense } from "./utils/licenses";
// import { Copy, Check, Key } from "lucide-react";

// const LicenseKey = () => {
//   const [licenseKey, setLicenseKey] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [copied, setCopied] = useState(false);

//   // Fetch license on component mount
//   useEffect(() => {
//     fetchLicense();
//   }, []);
  

//   const fetchLicense = async () => {
//     try {
//       setLoading(true);
//       const response = await getMyLicense();
//       if (response.success && response.data) {
//         setLicenseKey(response.data.licenseKey || "");
//       } else {
//         // No license exists yet - this is normal
//         setLicenseKey("");
//       }
//     } catch (error) {
//       console.error("Error fetching license:", error);
//       // Only show error if it's not a 404 (license not found)
//       if (error.status !== 404) {
//         setError("Failed to fetch license. Please try again.");
//       }
//       // 404 is expected when no license exists, so we don't show error
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");
      
//       const response = await generateLicense();
//       if (response.success) {
//         setLicenseKey(response.data.licenseKey);
//         setSuccess("License key generated successfully!");
//         setTimeout(() => setSuccess(""), 3000);
//       }
//     } catch (error) {
//       setError(error.message || "Failed to generate license key");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     if (licenseKey) {
//       navigator.clipboard.writeText(licenseKey);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//       <div className="flex items-center gap-2 mb-4">
//         <Key className="h-5 w-5 text-blue-600" />
//         <h2 className="text-lg font-semibold text-gray-900">License Key</h2>
//       </div>

//       {error && (
//         <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-3">
//           <p className="text-sm text-red-600">{error}</p>
//         </div>
//       )}

//       {success && (
//         <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-3">
//           <p className="text-sm text-green-600">{success}</p>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center py-4 text-gray-500">Loading...</div>
//       ) : licenseKey ? (
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <div className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-4 py-3 font-mono text-sm">
//               {licenseKey}
//             </div>
//             <button
//               onClick={handleCopy}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
//             >
//               {copied ? (
//                 <>
//                   <Check className="h-4 w-4" />
//                   Copied!
//                 </>
//               ) : (
//                 <>
//                   <Copy className="h-4 w-4" />
//                   Copy
//                 </>
//               )}
//             </button>
//           </div>
//           <p className="text-xs text-gray-500">
//             Your unique license key. Keep it safe and secure.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <p className="text-sm text-gray-600">
//             You don't have a license key yet. Generate one to get started.
//           </p>
//           <button
//             onClick={handleGenerate}
//             disabled={loading}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
//           >
//             {loading ? "Generating..." : "Generate License Key"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LicenseKey;
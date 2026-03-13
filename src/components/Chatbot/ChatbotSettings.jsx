import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatbotSettings = ({ restaurantId }) => {
    const [settings, setSettings] = useState(null);
    const [qrCode, setQrCode] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const response = await axios.get(`/api/v1/chatbot/${restaurantId}`);
            setSettings(response.data.config);
            setQrCode(response.data.whatsapp.qr);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching chatbot settings", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
        // Poll for QR status every 5 seconds if not authenticated
        const interval = setInterval(fetchSettings, 5000);
        return () => clearInterval(interval);
    }, [restaurantId]);

    const handleInitWhatsApp = async () => {
        await axios.post(`/api/v1/chatbot/${restaurantId}/init-whatsapp`);
        alert("WhatsApp initialization started. Please wait for QR code.");
    };

    if (loading) return <div>Loading Chatbot Settings...</div>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Chatbot & WhatsApp Management</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Connection Status */}
                <div className="border p-4 rounded bg-gray-50">
                    <h3 className="text-xl font-semibold mb-2">WhatsApp Connection</h3>
                    {qrCode ? (
                        <div className="text-center">
                            <p className="mb-2 text-sm text-gray-600">Scan this QR code with your WhatsApp app</p>
                            <img src={qrCode} alt="WhatsApp QR Code" className="mx-auto border-4 border-white shadow-sm" />
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="mb-4">No active connection found.</p>
                            <button
                                onClick={handleInitWhatsApp}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Initialize WhatsApp
                            </button>
                        </div>
                    )}
                </div>

                {/* Configuration */}
                <div className="border p-4 rounded bg-gray-50">
                    <h3 className="text-xl font-semibold mb-2">General Settings</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Welcome Message</label>
                            <textarea
                                className="w-full border rounded p-2 text-sm"
                                value={settings?.welcomeMessage}
                                onChange={(e) => setSettings({ ...settings, welcomeMessage: e.target.value })}
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Digital Menu URL</label>
                            <input
                                type="text"
                                className="w-full border rounded p-2 text-sm"
                                value={settings?.digitalMenuUrl || ''}
                                placeholder="https://menu.yourrestro.com"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotSettings;

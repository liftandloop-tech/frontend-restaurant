import React, { useState } from "react";

const OrderCart = ({ cartItems, setCartItems, onConfirmOrder, orderType = "takeaway", loading, error, success }) => {
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(false);
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);
  const tax = Math.round(0.05 * subtotal); // 5% tax as shown in image
  const serviceCharge = serviceChargeEnabled ? Math.round(0.1 * subtotal) : 0; // 10% service charge
  const total = subtotal + tax + serviceCharge;

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Order Cart</h3>
        <span className={`${orderType === 'phone' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'} text-sm px-3 py-1.5 rounded-full font-medium capitalize`}>
          {orderType === 'takeaway' ? 'Takeaway' : orderType === 'phone' ? 'Phone Order' : orderType}
        </span>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-3 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15v-3a2 2 0 114 0v3h2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v7h2z"
                clipRule="evenodd"
              />
            </svg>
            <p>Your cart is empty</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <img
                src={item.img}
                className="w-16 h-16 rounded-xl object-cover shadow-sm"
                alt={item.name}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600 mb-2">{item.note}</p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-200 hover:border-gray-400 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-900 text-lg">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-200 hover:border-gray-400 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 text-lg">
                  ₹{item.price * item.qty}
                </div>
                <div className="text-sm text-gray-500">₹{item.price} each</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="border-t border-gray-200 pt-6 space-y-3">
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Tax (5%)</span>
          <span className="font-semibold">₹{tax}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="text-gray-600">Service Charge</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold">₹{serviceCharge}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={serviceChargeEnabled}
                onChange={(e) => setServiceChargeEnabled(e.target.checked)}
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
        <div className="flex justify-between text-xl font-bold border-t border-gray-200 pt-3">
          <span>Total</span>
          <span className="text-blue-600">₹{total}</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-600">{success}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 space-y-4">
        <button
          onClick={onConfirmOrder}
          disabled={loading || cartItems.length === 0}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:bg-blue-400 disabled:cursor-not-allowed disabled:hover:bg-blue-400"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Order...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Confirm Order & send KOT WA
            </>
          )}
        </button>
        <div className="flex gap-3">
          <button className="flex-1 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center gap-2 font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Discount
          </button>
          <button className="flex-1 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
            KOT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCart;

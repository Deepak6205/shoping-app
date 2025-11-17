
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleOpen();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    
  }, [open]); 

  
  const modalContent = (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      
      <div
        className={`absolute inset-0 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => handleOpen()}
        style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
      />

      
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-50 mx-4 w-full max-w-md transform-gpu transition-all duration-200 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
       
        <div className="rounded-lg shadow-lg bg-pink-50">
          <div className="p-4 md:p-6">
            <div className="mb-3">
              <input
                type="text"
                name="name"
                value={addressInfo.name}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    name: e.target.value,
                  });
                }}
                placeholder="Enter your name"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="address"
                value={addressInfo.address}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    address: e.target.value,
                  });
                }}
                placeholder="Enter your address"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                name="pincode"
                value={addressInfo.pincode}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    pincode: e.target.value,
                  });
                }}
                placeholder="Enter your pincode"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="mobileNumber"
                value={addressInfo.mobileNumber}
                onChange={(e) => {
                  setAddressInfo({
                    ...addressInfo,
                    mobileNumber: e.target.value,
                  });
                }}
                placeholder="Enter your mobileNumber"
                className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
              />
            </div>

            <div className="">
              <button
                type="button"
                onClick={() => {
                  handleOpen();
                  buyNowFunction();
                }}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;

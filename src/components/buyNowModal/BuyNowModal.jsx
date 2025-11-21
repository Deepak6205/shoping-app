import React, { useState, useEffect } from "react";

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

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="w-full px-4 py-3 text-center text-white bg-gradient-to-r from-rose-500 to-pink-600 border border-transparent hover:from-rose-600 hover:to-pink-700 rounded-xl shadow-sm transition"
      >
        Buy now
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => handleOpen()}
            className="absolute inset-0 bg-[rgba(15,23,42,0.6)]"
          />
          <div className="relative z-50 mx-4 w-full max-w-lg transform scale-100 opacity-100 transition-all duration-200 rounded-2xl shadow-2xl bg-white dark:bg-slate-900 overflow-hidden ring-1 ring-black/5">
            <div className="p-6">
              <div className="mb-4">
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
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2 w-full rounded-md outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-rose-300"
                />
              </div>
              <div className="mb-4">
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
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2 w-full rounded-md outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div className="mb-4">
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
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2 w-full rounded-md outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div className="mb-4">
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
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-4 py-2 w-full rounded-md outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  handleOpen();
                  buyNowFunction();
                }}
                className="w-full px-4 py-3 text-center text-white bg-gradient-to-r from-rose-500 to-pink-600 border rounded-lg shadow-md hover:scale-[1.01] transform transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowModal;

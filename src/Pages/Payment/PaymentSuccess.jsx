// import React from 'react';

import axios from "axios";
import { useEffect } from "react";
import { FaCheckCircle, FaFileInvoiceDollar, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/paymentSuccess`, { sessionId });
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linier-to-br from-green-50 to-emerald-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 dark:shadow-[0_0_20px_rgba(255,255,255,0.35)] transition max-w-md w-full rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="flex justify-center mb-4"
        >
          <FaCheckCircle className="text-green-500 text-6xl" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold dark:text-gray-200 text-gray-800 mb-2">
          Payment Successful
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>

        {/* Info box */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Transaction ID:</span>
            <br />
            <span className="break-all text-xs text-gray-500">
              {sessionId}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="btn btn-primary hover:bg-white hover:text-primary w-full sm:w-44 flex items-center justify-center gap-2 rounded-lg"
          >
            <FaHome /> Go Home
          </Link>

          <Link
            to="/dashboard/myOrder"
            className="btn btn-ghost border text-gray-800 border-black dark:border-gray-200 dark:bg-white hover:bg-gray-700 hover:text-white dark:hover:bg-gray-900 dark:hover:text-gray-50 w-full sm:w-44 flex items-center justify-center gap-2 rounded-lg"
          >
            <FaFileInvoiceDollar /> View Orders
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

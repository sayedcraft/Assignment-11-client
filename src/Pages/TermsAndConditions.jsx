import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hook/useAuth";
import Loading from "../Components/Loading";
import { FiFileText, FiCheckCircle, FiShield, FiBook, FiUserCheck } from "react-icons/fi";

const TermsAndConditions = () => {
  const { user } = useAuth();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books-count"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 shadow-sm">
            <FiFileText />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
            Terms & <span className="text-sky-500">Conditions</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Please read these terms carefully before using our platform. By accessing or using our services, you agree to be bound by these terms.
          </p>
        </div>

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Summary & Dynamic Data Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-5">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">
                Quick Summary
              </h3>
              <ul className="space-y-4 text-sm font-medium text-slate-600">
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-500 text-lg shrink-0 mt-0.5" />
                  <span>You must provide accurate delivery information.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-500 text-lg shrink-0 mt-0.5" />
                  <span>Payments must be completed within 24 hours of placing a pending order.</span>
                </li>
                <li className="flex items-start gap-3">
                  <FiCheckCircle className="text-emerald-500 text-lg shrink-0 mt-0.5" />
                  <span>Returns are accepted within 7 days for defective copies.</span>
                </li>
              </ul>
            </div>

            {/* Dynamic Info Card (Using Existing Backend Data) */}
            <div className="bg-gradient-to-br from-sky-500 to-indigo-500 rounded-3xl shadow-md p-6 text-white space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-xl">
                  <FiBook className="text-xl" />
                </div>
                <h3 className="font-bold text-lg text-white">Our Library Stats</h3>
              </div>
              <p className="text-sky-100 text-sm leading-relaxed">
                You currently have access to our entire catalog of <span className="font-black text-white bg-white/20 px-2 py-0.5 rounded-md">{books.length}+</span> authentic books.
              </p>
            </div>
          </div>

          {/* Right Side: Detailed Terms Content */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-10 text-slate-600 space-y-8">
            
            {/* Personalized Greeting */}
            {user && (
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-center gap-3">
                <FiUserCheck className="text-sky-500 text-2xl shrink-0" />
                <p className="text-sm font-medium text-slate-700">
                  Hello <span className="font-bold text-sky-600">{user.displayName || "Valued User"}</span>! As a registered member, these terms apply to your current session and future purchases.
                </p>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                <FiShield className="text-sky-500" /> 1. General Agreement
              </h3>
              <p className="text-sm leading-relaxed">
                By accessing this website, placing an order, or using any of our services, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-800">2. Book Availability & Pricing</h3>
              <p className="text-sm leading-relaxed">
                We strive to keep our inventory updated. However, book availability is subject to change without notice. If a book you ordered is out of stock, our support team will contact you for a refund or replacement. All prices are listed in Bangladeshi Taka (BDT) and are inclusive of applicable taxes, unless stated otherwise.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-800">3. User Accounts</h3>
              <p className="text-sm leading-relaxed">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the terms, which may result in immediate termination of your account on our platform.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-800">4. Shipping & Delivery</h3>
              <p className="text-sm leading-relaxed">
                Delivery times are estimated and may vary due to external factors like weather conditions or courier delays. We are not responsible for any delay caused by the third-party shipping company, but we will assist you in tracking your parcel.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-extrabold text-slate-800">5. Changes to Terms</h3>
              <p className="text-sm leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these terms at any time. What constitutes a material change will be determined at our sole discretion. We recommend checking this page periodically for updates.
              </p>
              <p className="text-xs font-bold text-slate-400 mt-6 pt-6 border-t border-slate-100">
                Last updated: June 2026
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-11/12 mx-auto px-4 md:px-8">
        
        {/* Main Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-extrabold text-white tracking-tight">
              Book<span className="text-sky-400">Courier</span>
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              The fastest and most reliable book delivery network in Bangladesh. Connecting passionate readers with nationwide bookstores.
            </p>
          </div>

          {/* Column 2: Fully Functional Internal Links */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link to="/" className="hover:text-sky-400 transition-colors block py-0.5">Home</Link>
              </li>
              <li>
                <Link to="/allBook" className="hover:text-sky-400 transition-colors block py-0.5">All Books</Link>
              </li>
              <li>
                <Link to="/dashboard/myProfile" className="hover:text-sky-400 transition-colors block py-0.5">User Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information Requirement */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li className="flex items-start gap-3">
                <span className="text-sky-400 mt-0.5 text-base"><FaMapMarkerAlt /></span>
                <span className="text-slate-400">Khushi, Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sky-400 text-base"><FaPhoneAlt /></span>
                <a href="tel:+8801700000000" className="hover:text-sky-400 transition-colors">+880 1700-000000</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sky-400 text-base"><FaEnvelope /></span>
                <a href="mailto:support@bookcourier.com" className="hover:text-sky-400 transition-colors">support@bookcourier.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Links Requirement */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">Follow Our Journey</h4>
            <p className="text-xs text-slate-400 font-medium">Stay updated with our latest offers and book reviews.</p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white flex items-center justify-center text-lg transition-all duration-300 shadow-md"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white flex items-center justify-center text-lg transition-all duration-300 shadow-md"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white flex items-center justify-center text-lg transition-all duration-300 shadow-md"
                aria-label="Youtube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright Notice */}
        <div className="pt-8 border-t border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
            <span className="text-slate-400 font-semibold">BookCourier Ltd</span>
          </p>
          <div className="flex gap-4">
            <span className="cursor-default hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="cursor-default hover:text-slate-400 transition-colors">Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
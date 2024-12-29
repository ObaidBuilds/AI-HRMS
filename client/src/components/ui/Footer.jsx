import React from "react";

const Footer = () => {
  return (
    <footer className="bg-navy border-t border-gray-700 py-6 text-[0.83rem] rounded-lg text-white">
      <div className="w-full mx-auto px-6">
        <div className="flex justify-center sm:pb-4 animate-float">
          <div className="sm:w-[150px] flex flex-col items-center justify-center">
            <img className="w-[55px]" src="/metro.png" alt="logo" />
            <h1
              className="text-center mt-1 text-base"
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
            >
              Metro Cash & Carry
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap justify-around gap-5 md:gap-8 my-5 border-b border-gray-700 pt-5 pb-10">
          <div className="w-full md:w-[20%] pb-5 border-b border-gray-700 md:pb-0 md:border-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Daily Attendance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Onboarding
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Application
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[20%] border-b border-gray-700 pb-5 md:pb-0 md:border-0">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Payroll management
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Reports & Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Software Settings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  My Account
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[20%] border-b border-gray-700 pb-5 md:pb-0 md:border-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[20%]">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center gap-6 py-1">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-facebook-f text-[18px]"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-twitter text-[18px]"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-linkedin-in text-[18px]"></i>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <i className="fab fa-instagram text-[18px]"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

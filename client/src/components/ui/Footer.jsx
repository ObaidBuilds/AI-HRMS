import React from "react";

const Footer = () => {
  return (
    <footer className="w-[100vw] bg-gradient-to-r from-[#0a2540] to-[#1d3557] py-6 text-[0.83rem] rounded-t-md text-gray-200">
      <div className="w-full mx-auto px-6">
        <div className="flex justify-center sm:pb-4 animate-float">
          <div className="sm:w-[150px] flex flex-col items-center justify-center">
            <img src="/metro.png" alt="logo" />
            <h1
              className="text-center mt-1 text-base"
              style={{ fontFamily: "Bruno Ace, sans-serif" }}
            >
              Metro HR
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap justify-around gap-5 md:gap-8 my-5 border-b border-gray-700 pt-5 pb-10">
          <div className="w-full md:w-[20%] pb-5 border-b border-gray-700 md:pb-0 md:border-0">
            <h3 className="text-lg font-semibold mb-4">Career Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#jobs" className="hover:text-gray-300">
                  Open Positions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Hiring Process
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Internships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Employee Benefits
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[20%] border-b border-gray-700 pb-5 md:pb-0 md:border-0">
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Life at Metro
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Our Culture
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Teams & Departments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Career Growth
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[20%] border-b border-gray-700 pb-5 md:pb-0 md:border-0">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Application Help
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contact Recruiting
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Interview Tips
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-[20%]">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Equal Opportunity
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Candidate Privacy
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

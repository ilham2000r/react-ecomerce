import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-white">
        <div className="mx-auto max-w-screen px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid grid-cols-1 justify-items-between mx-10 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">About Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Company History
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Meet the Team
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Employee Handbook
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    Careers{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Our Services</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Web Development
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    Web Design{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    Marketing{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    Google Ads{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    FAQs{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    Support{" "}
                  </a>
                </li>

                <li>
                  <a
                    className="group flex justify-start gap-1.5 ltr:sm:justify-start"
                    href="/"
                  >
                    <span className="text-gray-700 transition group-hover:text-gray-700/75">
                      Live Chat
                    </span>

                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-slate-500"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-700">john@doe.com</span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="/"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>

                    <span className="flex-1 text-gray-700">0123456789</span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    213 Lane, London, United Kingdom
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>

              <a
                className="inline-block text-slate-600 underline transition hover:text-slate-600/75"
                href="/"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className="inline-block text-slate-600 underline transition hover:text-slate-600/75"
                href="/"
              >
                Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2022 Company Name
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

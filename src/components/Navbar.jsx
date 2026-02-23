import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { themeContext } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);

  const {theme} = useContext(themeContext)
  
  
  

  function toggler() {
    setOpen(!isOpen)
  }

  return (
    <nav className="bg-neutral-primary  w-full z-20  top-0 start-0 border-b border-default">
      <div className="max-w-screen-xl flex  md:flex-nowrap gap-x-10 flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
        
          <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
            Social
          </span>
        </Link>
        <button
          onClick={toggler}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>
        <div
          className={`${!isOpen&&'hidden'} w-full md:flex md:w-full md:justify-between`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                to="/home"
                className="block py-2 px-3  rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="block py-2 px-3  rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Profile
              </Link>
            </li>
          </ul>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
            <li>
              <Link
                to="/"
                className="block py-2 px-3  rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block py-2 px-3  rounded md:bg-transparent md:text-fg-brand md:p-0"
                aria-current="page"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

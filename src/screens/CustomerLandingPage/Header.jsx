import React, { useState, useEffect } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-8 transition-all duration-300 ${
        isScrolled ? "bg-gray-800 bg-opacity-80 backdrop-blur-md" : "bg-black"
      }`}
    >
      <button
        className="navbar-menu-icon md:hidden text-white"
        onClick={toggleMenu}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
        </svg>
      </button>
      <div className="flex-grow flex justify-center">
        {!menuOpen && (
          <nav
            className={`navbar-menu ${
              menuOpen ? "block" : "hidden"
            } md:flex gap-12 transition-all duration-300 w-full md:w-auto`}
          >
            <a
              className="text-lg font-medium text-gray-300 transition-colors hover:text-white underline-animation"
              href="#about-mis"
            >
              ABOUT POST OFFICE MIS
            </a>
            <a
              className="text-lg font-medium text-gray-300 transition-colors hover:text-white underline-animation"
              href="/#services"
            >
              SERVICES
            </a>
            <a
              className="text-lg font-medium text-gray-300 transition-colors hover:text-white underline-animation"
              href="/#experience"
            >
              EDUCATION
            </a>

            <a
              className="text-lg font-medium text-gray-300 transition-colors hover:text-white underline-animation"
              href="/#contact-us"
            >
              CONTACT US
            </a>
          </nav>
        )}
      </div>
      <div className="hidden md:flex items-center gap-6">
        <a
          href="https://github.com/roshanemoraes"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 496 512"
            className="h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
          </svg>
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/adam-moraes/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            className="h-6 w-6"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M100.28 448H7.4V148.9h92.78zm-46.2-344C24.09 104 0 79.86 0 50.91 0 22.44 24.55 0 54.55 0c29.78 0 54.52 22.44 54.52 50.91 0 28.95-24.76 53.09-54.55 53.09zM447.8 448h-92.66V306.4c0-33.7-12-56.7-42.1-56.7-22.9 0-36.5 15.4-42.5 30.2-2.2 5.4-2.9 13-2.9 20.6V448h-92.66s1.2-255.1 0-281.6h92.66v39.9c-0.2 0.3-0.4 0.7-0.5 1h0.5v-1c12.3-19 34.3-46 83.5-46 61 0 106.7 39.8 106.7 125.4V448z"></path>
          </svg>
          <span className="sr-only">LinkedIn</span>
        </a>
      </div>
    </header>
  );
};

export default Header;

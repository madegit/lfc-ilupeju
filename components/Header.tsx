"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Projects", href: "/projects" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed w-full z-50 ${isHomePage ? 'bg-transparent' : 'bg-transparent pb-20'}`}>
      <nav className="container mx-auto px-4 py-4 md:py-6 flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/lfc.png"
            alt="Living Faith Church Logo"
            width={50}
            height={50}
          />
        </Link>

        <div className="flex items-center md:hidden">
          <Link
            href="/contact"
            className="mr-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-400 transition duration-300"
          >
            Contact Us
          </Link>
          <button
            className="text-white z-20 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm md:hidden z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row fixed md:relative inset-x-0 top-0 md:top-auto h-[80%] md:h-auto overflow-y-auto md:overflow-visible bg-black bg-opacity-80 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 md:space-x-10 text-white text-md md:text-lg tracking-tight transition-all duration-300 ease-in-out z-30`}
        >
          {navItems.map((item) => (
            <li key={item.name} className={item.name === "Home" ? "mt-16 md:mt-0" : ""}>
              <Link 
                href={item.href} 
                className="block py-2 hover:underline text-white"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-block bg-red-500 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-red-400 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}


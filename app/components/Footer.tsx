'use client'; // Needed for useState and animation logic

import React, { useState } from "react";
import Image from "next/image";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaYoutube,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

const sections = [
  {
    title: "HELP",
    links: [
      "FAQs", "Shipping", "Refunds & Returns", "Size Guide",
      "Gift Card", "Contact Us", "Location & Stores",
    ],
  },
  {
    title: "INFO",
    links: [
      "Student Offer", "Give $20, Get $20", "Healthcare Offer", "Sign Up",
      "Privacy Policy", "Fashion Glossary", "Terms and Conditions",
      "White Fox Sorority", "White Fox University", "Terms of Purchase", "Website Terms",
    ],
  },
  {
    title: "ABOUT US",
    links: ["About Us", "Careers", "Accessibility"],
  },
];

const Footer = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <footer className="bg-black text-gray-300 px-6 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        {/* LOGO + SOCIAL */}
        <div className="space-y-6 flex flex-col items-center md:items-start">
          <Image src="/logo.png" alt="Logo" width={160} height={50} />
          <div className="flex space-x-5 text-xl text-pink-500">
            <FaInstagram className="hover:text-pink-400 transition" />
            <FaTiktok className="hover:text-pink-400 transition" />
            <FaFacebookF className="hover:text-pink-400 transition" />
            <FaYoutube className="hover:text-pink-400 transition" />
            <FaPinterest className="hover:text-pink-400 transition" />
            <FaTwitter className="hover:text-pink-400 transition" />
          </div>
        </div>

        {/* Dynamic Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4 md:mb-0">
            {/* Toggle Button */}
            <button
              onClick={() => toggleSection(idx)}
              className="w-full flex items-center justify-between text-pink-400 text-sm font-semibold tracking-wider py-2 md:cursor-default md:pointer-events-none"
            >
              <span className="mx-auto md:mx-0">{section.title}</span>
              <IoIosArrowUp
                className={`ml-2 transition-transform duration-300 md:hidden ${
                  openIndex === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Collapsible Content */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === idx ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              } md:max-h-full md:opacity-100`}
            >
              <ul className="space-y-3 text-sm mt-4 md:mt-0">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-pink-500 transition block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Pink Malibu Boutique.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

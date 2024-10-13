import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo3.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-6 md:mb-0">
            <img src={logo} alt="Logo" className="h-20 w-24 mb-4" />
            <p className="text-sm text-gray-400">
            Join the Flow, Save a Life
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row gap-10">
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="text-gray-400">
                <li className="mb-2 hover:text-red-600">
                  <Link to="/">Home</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/BloodDirectory">Blood Bank Directory</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/NearbyDonor">Nearby Donor</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">For Donors</h4>
              <ul className="text-gray-400">
                <li className="mb-2 hover:text-red-600">
                  <Link to="/DonorRegister">Donor Register</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/DonorLogin">Donor Login</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/">Donor FAQs</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">For Blood Banks</h4>
              <ul className="text-gray-400">
                <li className="mb-2 hover:text-red-600">
                  <Link to="/BloodBankRegister">Add Your Blood Bank</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/BloodBankLogin">Blood Bank Login</Link>
                </li>
                <li className="mb-2 hover:text-red-600">
                  <Link to="/">Blood Bank FAQs</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-600" />

        <div className="flex justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-red-600">
              <FaLinkedin size={24} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} BloodBank. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

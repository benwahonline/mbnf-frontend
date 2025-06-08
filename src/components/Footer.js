import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-100 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Missing But Not Forgotten (MBNF) — A project of The Tanganyikan NGO. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Contact us: info@tanganyikan.ngo | Tel: +255 123 456 789
        </p>
      </div>
    </footer>
  );
};

export default Footer;

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import AvatarDropdown from "../avatar/admin/AvatarAdminDropdown";

const navLinksLeft = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "GroupDevs", href: "/admin/groupDevs" },
];

const navLinksRight = [{ label: "Logout", href: "/logout" }];

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 text-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/admin/dashboard"
          className="text-3xl font-bold text-white hover:text-yellow-300 transition duration-300 tracking-wide"
        >
          Admin Panel
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center flex-1 mx-10">
          {/* Left Links */}
          <div className="flex space-x-6">
            {navLinksLeft.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold px-3 py-1 rounded-lg transition duration-200 ${
                  pathname === link.href
                    ? "bg-white text-blue-600"
                    : "hover:bg-white/80 hover:text-blue-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Links */}
          <div className="flex space-x-6">
            {navLinksRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-semibold px-3 py-1 rounded-lg transition duration-200 ${
                  pathname === link.href
                    ? "bg-white text-blue-600"
                    : "hover:bg-white/80 hover:text-blue-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Avatar - Desktop */}
        <div className="hidden md:block me-4">
          <AvatarDropdown size={40} />
        </div>

        {/* Mobile Avatar + Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <AvatarDropdown size={32} />
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-3 px-4 pb-4 pt-2">
              {[...navLinksLeft, ...navLinksRight].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium px-4 py-2 rounded-md transition duration-200 ${
                    pathname === link.href
                      ? "bg-white text-blue-600"
                      : "text-white hover:bg-white/80 hover:text-blue-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminNavbar;

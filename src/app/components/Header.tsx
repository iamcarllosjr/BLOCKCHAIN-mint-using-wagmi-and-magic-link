"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SunMedium, BellDot, HelpCircle, GripHorizontal } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", delay: 0.3 }}
      className="flex md:justify-between sm:justify-around justify-center px-3 pt-3 w-full bg-trasparent backdrop-blur-sm"
    >
      <div className="flex items-center gap-4 tracking-wider">
        <Link href="#home">{/* IMAGE */}</Link>

        <div className="lg:flex text-white gap-4 hidden">
          <Link href="#home" className="links">
            Home
          </Link>
          <Link href="#exchange" className="links">
            About
          </Link>
          <Link href="#liquidity" className="links">
            Team
          </Link>
          <Link href="orders" className="links">
            Features
          </Link>
        </div>
      </div>

      <div className="items-center gap-4 justify-center flex">
        <button className="icons">
          <SunMedium size={20} />
        </button>
        <button className="icons">
          <BellDot size={20} />
        </button>
        <button className="icons">
          <HelpCircle size={20} />
        </button>
        <button className="icons">
          <GripHorizontal size={20} />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;

"use client"
import { Copyright, Linkedin, Twitter, Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{ease: "easeIn", delay: 0.6}}
    className="flex items-center justify-center w-full backdrop-blur-md h-20">
      <div className="flex flex-col items-center gap-3 text-white pt-3">
        <div className="flex gap-3">
        <Copyright size={20}/>
        <p>2023 Carlos Junior - All Rights Reserved.</p>
        </div>
        <div className="flex gap-3">
        <Link className="hover:scale-105" href="https://www.linkedin.com/in/iamcarllosjr/" target="_blank"><Linkedin size={15}/></Link>
        <Link className="hover:scale-105" href="https://twitter.com/iamcarllosjr" target="_blank"><Twitter size={15}/></Link>
        <Link className="hover:scale-105" href="https://github.com/iamcarllosjr" target="_blank"><Github size={15}/></Link>
        </div>
      </div>
    </motion.div>
  )
}

export default Footer;
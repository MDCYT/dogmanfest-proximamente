"use client";

import Image from "next/image";
import { PasswordEntry } from "@/components/PasswordEntry";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-16 font-[family-name:var(--font-geist-sans)] bg-[url(https://cdn.dogmanfestperu.com/background.png)] bg-cover bg-center bg-no-repeat bg-fixed">
      <motion.main
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-[32px] row-start-2 items-center justify-items-center bg-white/85 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-900/90 dark:border-gray-700 max-w-xl w-full"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Image
            src="https://cdn.dogmanfestperu.com/DOGMAN%20FEST%20sin%20fondo_Mesa%20de%20trabajo%201.png"
            alt="Dog Man Fest Logo"
            width={500}
            height={100}
            priority
            className="drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full items-center justify-items-center"
        >
          <PasswordEntry />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-center text-gray-500 mt-4"
        >
          © {new Date().getFullYear()} Dog Man Fest • Todos los derechos
          reservados
        </motion.div>
      </motion.main>
    </div>
  );
}

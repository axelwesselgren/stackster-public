"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="sm:py-32 py-20">
      <section aria-labelledby="hero-title" className="flex flex-col items-center justify-center text-center">
        <motion.h1
          id="hero-title"
          className="inline-block bg-gradient-to-br from-gray-900 to-gray-800 bg-clip-text p-2 text-4xl font-bold tracking-tighter text-transparent sm:text-6xl md:text-7xl dark:from-gray-50 dark:to-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Keep Track of Your
          <br/>
          <span className="inline-block bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            Stack
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 sm:max-w-lg max-w-sm sm:text-lg text-sm text-gray-700 dark:text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          A central platform to track your stack, store key details, and keep everything organized effortlessly.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-col justify-center gap-3 px-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
        >
          <Button className="h-10 font-semibold">
            <Link href="/signup">Get Started Now</Link>
          </Button>
        </motion.div>
        <motion.div
          className="relative mx-auto ml-3 sm:mt-20 mt-12 h-fit max-w-6xl sm:ml-auto sm:w-full sm:px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          <section aria-label="Hero Image of the website" className="flow-root">
            <div className="rounded-2xl bg-slate-50/40 p-2 ring-1 ring-inset ring-slate-200/50 dark:bg-gray-900/70 dark:ring-white/10">
              <div className="rounded-xl bg-white ring-1 ring-slate-900/5 dark:bg-slate-950 dark:ring-white/15">
                <Image
                  src='/images/hero-dark.png'
                  alt="Hero Image"
                  width={0}
                  height={0}
                  className="rounded-xl shadow-2xl dark:shadow-indigo-600/10"
                  layout="responsive"
                  priority
                />
              </div>
            </div>
          </section>
        </motion.div>
      </section>
    </div>
  );
}
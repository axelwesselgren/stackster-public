"use client";

import { LoginForm } from "@/components/forms/login-form";
import { WrappedLogo } from "@/components/icons/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <WrappedLogo scale={1} adjusted={false}/>
          </Link>
        </div>
        <div className="flex flex-1 md:items-center justify-center mt-6 md:mt-0">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden lg:block h-full bg-gradient-to-br from-orange-400 to-orange-600"/>
    </div>
  )
}
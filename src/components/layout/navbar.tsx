"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { WrappedLogo } from "@/components/icons/logo";
import {
  ChevronRight,
  MenuIcon,
  X,
  ArrowRight,
  Store,
  Radar,
  Search,
  History,
  Vault,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { authClient } from "@/auth-client";

interface ListItemProps {
  href: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({
  href,
  title,
  children,
  className,
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modded, setModded] = useState(false);

  const path = usePathname();
  const session = authClient.useSession();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const moddedRoutes = ["/login", "/signup"];

    if (moddedRoutes.includes(path)) {
      setModded(true);
    } else {
      setModded(false);
    }
  }, [path]);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={cn("fixed w-full z-50 bg-background/80 backdrop-blur-sm", {
          "border-b border-neutral-300 dark:border-neutral-900": scrolled,
        })}
      >
        <div className="w-full max-w-[1300px] px-4 mx-auto items-center justify-between flex h-14">
          <div className="flex-1">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <WrappedLogo scale={1} adjusted={false} />
              </div>
            </Link>
          </div>
          <NavigationMenu className="hidden lg:flex flex-1 justify-center">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Product
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/product/marketplace"
                          className="flex flex-row items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground gap-1"
                        >
                          <Store size={16} />
                          <div className="text-sm font-medium leading-none">
                            Marketplace
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/product/scanner"
                          className="flex flex-row items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground gap-1"
                        >
                          <Search size={16} />
                          <div className="text-sm font-medium leading-none">
                            AI Scanner
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/product/track"
                          className="flex flex-row items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground gap-1"
                        >
                          <Radar size={16} />
                          <div className="text-sm font-medium leading-none">
                            Stack Tracker
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/product/versioning"
                          className="flex flex-row items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground gap-1"
                        >
                          <History size={16} />
                          <div className="text-sm font-medium leading-none">
                            Versioning
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/product/vault"
                          className="flex flex-row items-center select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground gap-1"
                        >
                          <Vault size={16} />
                          <div className="text-sm font-medium leading-none">
                            Vault
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <ListItem href="/about/purpose" title="Purpose">
                      What is ToolVoyage and how it can help you.
                    </ListItem>
                    <ListItem href="/about/faq" title="FAQ">
                      Frequently asked questions.
                    </ListItem>
                    <ListItem href="/about/us" title="Us">
                      Who we are and what we do.
                    </ListItem>

                    <ListItem href="/contact" title="Contact">
                      Get in touch with us.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <ListItem href="/docs" title="Documentation">
                      Documentation
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent"
                    )}
                  >
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex-1 flex justify-end items-center space-x-4">
            <div className="hidden lg:flex space-x-3">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className={cn(buttonVariants(), "text-white")}
              >
                Get Started
              </Link>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDrawerOpen}
              className="lg:hidden"
            >
              {open ? (
                <X className="w-6 h-6 animate" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden mt-14 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className=" mx-auto flex flex-col p-4 space-y-4">
              <Link
                href="/signup"
                onClick={handleLinkClick}
                className={buttonVariants() + " w-full py-6"}
              >
                Get Started <ChevronRight />
              </Link>
              <Link
                href="/login"
                onClick={handleLinkClick}
                className={
                  buttonVariants({ variant: "secondary" }) + " w-full py-6"
                }
              >
                Log In
              </Link>
              <Link
                href="/pricing"
                onClick={handleLinkClick}
                className="flex justify-between items-center p-3 text-lg font-semibold border-b border-gray-750"
              >
                About <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                onClick={handleLinkClick}
                className="flex justify-between items-center p-3 text-lg font-semibold border-b border-gray-750"
              >
                Pricing <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs"
                onClick={handleLinkClick}
                className="flex justify-between items-center p-3 text-lg font-semibold border-b border-gray-750"
              >
                Docs <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                onClick={handleLinkClick}
                className="flex justify-between items-center p-3 text-lg font-semibold border-b border-gray-750"
              >
                Contact <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

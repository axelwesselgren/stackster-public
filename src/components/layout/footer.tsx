import { WrappedLogo } from "@/components/icons/logo";
import { Dot } from 'lucide-react';
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

export const Footer = ({
  menuItems = [
    {
      title: "Documentation",
      links: [
        { text: "Get Started", url: "/docs" },
        { text: "Reference", url: "/docs" },
        { text: "Guides", url: "/docs" },
        { text: "SDKs", url: "/docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "/about" },
        { text: "Purpose", url: "/about/purpose" },
        { text: "FAQ", url: "/about/faq" },
        { text: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "Github", url: "https://github.com/stackster-public" },
        { text: "X", url: "https://x.com/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { text: "Terms & Conditions", url: "/terms" },
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Cookie Policy", url: "/cookies" },
      ],
    },
  ],
}: Footer2Props) => {
  return (
		<section className="py-6 lg:py-32 flex justify-center border-t border-neutral-300 bg-background dark:border-neutral-900">
			<div className="container">
				<footer className="max-w-[1300px] mx-auto md:px-4 px-6">
					<div className="grid grid-cols-2 gap-8 lg:gap-8 lg:grid-cols-6 md:grid-cols-4">
						<div className="col-span-2 mb-4 md:mb-8 lg:mb-0 row-span-2">
              <div>
                <div className="flex items-center gap-2 lg:justify-start">
                  <WrappedLogo scale={1} adjusted={false} />
                </div>
                <p className="mt-2">
                  Stacks made easy.
                </p>
              </div>
							<div className="mt-8 flex-col hidden md:flex">
								<Link href="/status" passHref className="text-muted-foreground text-sm">
									All Systems Operational <Dot size={24} className="inline-block" color="green" />
								</Link>
								<p className="justify-between text-sm font-medium text-muted-foreground mt-2">
									© 2025 Copyright. All rights reserved.
								</p>
							</div>
						</div>
						{menuItems.map((section, sectionIdx) => (
							<div key={sectionIdx}>
								<h3 className="mb-4 font-bold">{section.title}</h3>
								<ul className="space-y-4 text-muted-foreground">
									{section.links.map((link, linkIdx) => (
										<li
											key={linkIdx}
											className="font-medium hover:text-primary"
										>
											<a href={link.url}>{link.text}</a>
										</li>
									))}
								</ul>
							</div>
						))}
            <div className="mt-8 flex-col md:hidden flex col-span-2">
              <Link href="/status" passHref className="text-muted-foreground text-sm">
                All Systems Operational <Dot size={24} className="inline-block" color="green" />
              </Link>
              <p className="justify-between text-sm font-medium text-muted-foreground mt-2">
                © 2025 Copyright. All rights reserved.
              </p>
            </div>
					</div>
				</footer>
			</div>
		</section>
  );
};
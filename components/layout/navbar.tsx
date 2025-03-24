"use client";
import { BookOpen, Github, Menu } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  // {
  //   href: "#testimonials",
  //   label: "Testimonials",
  // },
  {
    href: "#team",
    label: "Team",
  },
  {
    href: "#contact",
    label: "Contact",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Lesson Planning",
    description: "Create detailed lesson plans with objectives, activities, and resources.",
  },
  {
    title: "Assignments",
    description:
      "Generate quizzes, tests, and homework assignments",
  },
  {
    title: "Summarization",
    description:
      "Create concise summaries and study materials",
  },
  {
    title: "Flashcard Generation",
    description:
      "Generate interactive flashcards for effective memorization and review",
  },
  {
    title: "Presentation Generator",
    description:
      "Create engaging slide presentations with key points and visuals",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        <BookOpen className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" />
        Syllabai
      </Link>
      {/* <!-- Mobile --> */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <BookOpen className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-7 h-7 mr-2 border text-white " />
                    SyllabAi
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* <!-- Desktop --> */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-card text-base">
              Features
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[800px] p-4 bg-card rounded-xl shadow-lg transition-all duration-200 ease-in-out">
                <ul className="grid grid-cols-3 gap-3">
                  {featureList.map(({ title, description }) => (
                    <li
                      key={title}
                      className="group rounded-lg p-3 text-sm transition-all duration-200 hover:bg-muted/50 cursor-pointer border border-transparent hover:border-muted-foreground/20"
                    >
                      <div className="flex flex-col gap-1.5">
                        <p className="text-[#007FFF] font-semibold text-sm group-hover:scale-105 transition-transform duration-200">
                          {title}
                        </p>
                        <p className="text-muted-foreground text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-200 leading-relaxed line-clamp-2">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            {routeList.map(({ href, label }) => (
              <NavigationMenuLink key={href} asChild>
                <Link href={href} className="text-base px-2">
                  {label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden lg:flex">
        <ToggleTheme />

        {/* <Button asChild size="sm" variant="ghost" aria-label="View on GitHub">
          <Link
            aria-label="View on GitHub"
            href="https://github.com/nobruf/SyllabAi-landing-page.git"
            target="_blank"
          >
            <Github className="size-5" />
          </Link>
        </Button> */}
      </div>
    </header>
  );
};

"use client";
import { Github, Menu } from "lucide-react";
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
    description: "Generate quizzes, tests, and homework assignments",
  },
  {
    title: "Summarization",
    description: "Create concise summaries and study materials",
  },
  {
    title: "Flashcard Generation",
    description: "Generate interactive flashcards for effective memorization and review",
  },
  {
    title: "Presentation Generator",
    description: "Create engaging slide presentations with key points and visuals",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href="/" className="font-bold text-lg flex items-center">
        {/* Replacing BookOpen with your SVG */}
        <svg
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-9 mr-2"
          fill="#FFFFFF"
        >
          <rect width="512" height="512" rx="50" fill="#0066CC" />
          <g transform="scale(0.8) translate(64,64)">
            <path
              d="M256,160c16-63.16,76.43-95.41,208-96a15.94,15.94,0,0,1,16,16V368a16,16,0,0,1-16,16c-128,0-177.45,25.81-208,64-30.37-38-80-64-208-64-9.88,0-16-8.05-16-17.93V80A15.94,15.94,0,0,1,48,64C179.57,64.59,240,96.84,256,160Z"
              style={{
                fill: "none",
                stroke: "#FFFFFF",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "32px",
              }}
            />
          </g>
          <path
            d="M220 180 L300 260 L260 260 L300 340 L200 260 L260 260 Z"
            fill="white"
            stroke="white"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </svg>
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
                    {/* Replacing BookOpen with your SVG in mobile sheet */}
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-7 h-7 mr-2"
                      fill="#FFFFFF"
                    >
                      <rect width="512" height="512" rx="50" fill="#0066CC" />
                      <g transform="scale(0.8) translate(64,64)">
                        <path
                          d="M256,160c16-63.16,76.43-95.41,208-96a15.94,15.94,0,0,1,16,16V368a16,16,0,0,1-16,16c-128,0-177.45,25.81-208,64-30.37-38-80-64-208-64-9.88,0-16-8.05-16-17.93V80A15.94,15.94,0,0,1,48,64C179.57,64.59,240,96.84,256,160Z"
                          style={{
                            fill: "none",
                            stroke: "#FFFFFF",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "32px",
                          }}
                        />
                      </g>
                      <path
                        d="M220 180 L300 260 L260 260 L300 340 L200 260 L260 260 Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="6"
                        strokeLinejoin="round"
                      />
                    </svg>
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
      </div>
    </header>
  );
};
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link';

export const HeroSection = () => {
  const { theme } = useTheme();
  const supabase = createClientComponentClient()

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  }

  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <Badge variant="outline" className="text-sm py-2">
            <span className="mr-2" style={{ color: "#007FFF" }}>
              <Badge color="#007FFF">New</Badge>
            </span>
            <span> Demo is out now! </span>
          </Badge>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              Boost Teaching Power with
              <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                Syllabai
              </span>
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {`Automate lesson planning, assessments, and study materials with AI. Free up 10+ hours a week and focus on what truly matters—teaching. 🚀`}
          </p>
{/* <Link href="/dashboard"> */}
<div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button
              className="w-5/6 md:w-1/4 font-bold group/arrow"
              style={{ backgroundColor: "#007FFF" }}
              onClick={login}
            >
              Join the Waitlist
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>
          </div>
{/* </Link> */}
          
        </div>

        <div className="relative group mt-14 w-full">
          <div
            className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 rounded-full blur-3xl"
            style={{ backgroundColor: "#007FFF" }}
          ></div>
          <div className="relative w-full max-w-[1200px] mx-auto rounded-lg overflow-hidden border border-t-2 border-secondary border-t-primary/30">
            <div className="relative w-full aspect-video">
              <iframe
                src="https://www.youtube.com/embed/pjHHxjIe7eM?autoplay=0&rel=0&modestbranding=1&showinfo=0&controls=1&hd=1&vq=hd1080"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
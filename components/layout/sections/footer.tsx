import { Separator } from "@/components/ui/separator";
import { BookOpenIcon } from "lucide-react";
import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-12">
      <div className="p-8 bg-card border border-secondary rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Logo and Brand */}
          <div className="col-span-full md:col-span-1">
            <Link href="#" className="flex font-bold items-center">
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
              <h3 className="text-xl">Syllabai</h3>
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Navigation</h3>
            <Link href="#features" className="opacity-60 hover:opacity-100 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#team" className="opacity-60 hover:opacity-100 hover:text-primary transition-colors">
              Team
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">Contact</h3>
            <Link href="https://github.com/AtulSemwal963" target="_blank" className="opacity-60 hover:opacity-100 hover:text-primary transition-colors">
              Github
            </Link>
          </div>
        </div>

        <Separator className="my-6" />
        
        {/* Copyright */}
        <div className="text-sm text-muted-foreground">
          &copy; 2024 Designed and developed by
          <Link
            target="_blank"
            href="https://github.com/AtulSemwal963"
            className="text-primary transition-colors hover:text-primary/80 ml-1"
          >
            Atul Semwal
          </Link>
        </div>
      </div>
    </footer>
  );
};

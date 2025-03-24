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
              <BookOpenIcon className="w-8 h-8 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary" />
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

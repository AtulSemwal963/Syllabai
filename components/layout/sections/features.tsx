import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

// const featureList: FeaturesProps[] = [
//   {
//     icon: "TabletSmartphone",
//     title: "Mobile Friendly",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, consectetur.",
//   },
//   {
//     icon: "BadgeCheck",
//     title: "Social Proof",
//     description:
//       "Lorem ipsum dolor sit amet consectetur. Natus consectetur, odio ea accusamus aperiam.",
//   },
//   {
//     icon: "Goal",
//     title: "Targeted Content",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. odio ea accusamus aperiam.",
//   },
//   {
//     icon: "PictureInPicture",
//     title: "Strong Visuals",
//     description:
//       "Lorem elit. A odio velit cum aliquam. Natus consectetur dolores, odio ea accusamus aperiam.",
//   },
//   {
//     icon: "MousePointerClick",
//     title: "Clear CTA",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing. odio ea accusamus consectetur.",
//   },
//   {
//     icon: "Newspaper",
//     title: "Clear Headline",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur.",
//   },
// ];
const featureList: FeaturesProps[] = [
  {
    icon: "Clock",
    title: "AI-Powered Lesson Planning",
    description:
      "Generate structured lesson plans instantly, saving hours of manual work every week.",
  },
  {
    icon: "FileText",
    title: "Automated Assessments & Quizzes",
    description:
      "Create MCQs, flashcards, and tests from study material in seconds—no manual input needed.",
  },
  {
    icon: "BookOpen",
    title: "AI-Generated Book Summaries",
    description:
      "Summarize books into key takeaways, chapter breakdowns, and discussion prompts in minutes.",
  },
  {
    icon: "Sparkle",
    title: "Smart Content Customization",
    description:
      "Tailor AI-generated lesson plans and quizzes to fit different teaching styles and subjects.",
  },
  {
    icon: "UserCheck",
    title: "Easy to Use & Intuitive",
    description:
      "Designed for teachers of all tech levels—seamless interface with no learning curve.",
  },
  {
    icon: "Cloud",
    title: "Accessible Anywhere",
    description:
      "Cloud-based platform ensures you can access lesson plans, assessments, and summaries anytime, anywhere.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Features
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        What Makes Us Different
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      AI-driven lesson planning, assessments, and book summaries—all in one tool.  
      Built to save educators time, improve efficiency, and enhance student engagement.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="#007FFF"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

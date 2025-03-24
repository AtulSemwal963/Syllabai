import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

// const benefitList: BenefitsProps[] = [
//   {
//     icon: "Blocks",
//     title: "Build Brand Trust",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
//   },
//   {
//     icon: "LineChart",
//     title: "More Leads",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam, natus consectetur.",
//   },
//   {
//     icon: "Wallet",
//     title: "Higher Conversions",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur. A odio velit cum aliquam",
//   },
//   {
//     icon: "Sparkle",
//     title: "Test Marketing Ideas",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. A odio velit cum aliquam. Natus consectetur dolores.",
//   },
// ];
const benefitList: BenefitsProps[] = [
  {
    icon: "Clock",
    title: "Save 10+ Hours a Week",
    description:
      "Automate lesson planning, assessments, and study materials so teachers can focus on teaching, not paperwork.",
  },
  {
    icon: "BookOpen",
    title: "AI-Powered Chapter Summaries",
    description:
      "Instantly generate concise, structured chapter summaries to enhance lesson plans and student engagement.",
  },
  {
    icon: "FileText",
    title: "Auto-Generated Assessments",
    description:
      "Create quizzes, MCQs, and flashcards from study material in seconds—no more manual question-making.",
  },
  {
    icon: "Users",
    title: "Designed for Schools & Colleges",
    description:
      "Custom-built for educational institutions, ensuring seamless adoption, integration, and impact.",
  },
  {
    icon: "TrendingUp",
    title: "Boost Teaching Efficiency",
    description:
      "Reduce time spent on admin tasks, improve content quality, and enhance student learning outcomes.",
  },
  {
    icon: "Settings",
    title: "Customizable & Easy to Use",
    description:
      "Tailor AI-generated lesson plans and assessments to your teaching style with an intuitive interface.",
  },
  {
    icon: "LayoutDashboard",
    title: "Collaboration Dashboards",
    description:
      "Unlock teacher superpowers with dashboards to create vibrant spaces for teaming up, sharing ideas, and sparking teacher collaboration magic, made simple!",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider" style={{color:"#007FFF"}}>Benefits</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Teach Smarter, Not Harder
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
          Automate lesson planning, assessments, and chapter summaries with AI.  
          Free up your time and focus on what truly matters—engaging and inspiring students.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="#007FFF"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

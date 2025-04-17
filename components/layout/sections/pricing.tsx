import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number|string;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Free",
    popular: 0,
    price: 0,
    description:
      "Get started with essential tools to streamline your teaching process at no cost.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Unlimited Lesson Summarizations",
      "Unlimited Lesson Planning",
      "Create up to 5 Projects",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 12.99,
    description:
      "Unlock advanced AI tools and unlimited access to enhance your teaching efficiency.",
    buttonText: "Get Started",
    benefitList: [
      "Unlimited Lesson Summarizations",
      "Unlimited Lesson Planning",
      "Unlimited Assignment Creation",
      "Unlimited Flashcard Generation",
      "Unlimited Presentation Generation",
      "Unlimited Projects",
      "Access to Group Workspace",
      "Priority AI Assistance",
    ],
  },
  {
    title: "Institution",
    popular: 0,
    price: "Custom Pricing",
    description:
      "Tailored solutions for schools and organizations with enterprise-grade features.",
    buttonText: "Contact Us",
    benefitList: [
      "Unlimited Access",
      "Access to Group Workspace",
      "Priority AI Assistance",
      "Dedicated Account Manager",
      "Custom Integrations",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Pricing
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
      Unlock the Full Power of Syllabai
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
      Choose a plan to access AI-powered lesson planning, assessments, and teaching tools that save you time and elevate your classroom.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">{price=="Custom Pricing"?"":"$"}{price}</span>
                  <span className="text-muted-foreground">{price=="Custom Pricing"?"":"/month"}</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
// "use client"
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Check } from "lucide-react";
// import { useEffect, useState } from "react";

// enum PopularPlan {
//   NO = 0,
//   YES = 1,
// }

// interface PlanProps {
//   title: string;
//   popular: PopularPlan;
//   price: number | string;
//   description: string;
//   buttonText: string;
//   benefitList: string[];
// }

// const plans: PlanProps[] = [
//   {
//     title: "Free",
//     popular: 0,
//     price: 0,
//     description:
//       "Get started with essential tools to streamline your teaching process at no cost.",
//     buttonText: "Start Free Trial",
//     benefitList: [
//       "Unlimited Lesson Summarizations",
//       "Unlimited Lesson Planning",
//       "Create up to 5 Projects",
//     ],
//   },
//   {
//     title: "Premium",
//     popular: 1,
//     price: 12.99,
//     description:
//       "Unlock advanced AI tools and unlimited access to enhance your teaching efficiency.",
//     buttonText: "Get Started",
//     benefitList: [
//       "Unlimited Lesson Summarizations",
//       "Unlimited Lesson Planning",
//       "Unlimited Assignment Creation",
//       "Unlimited Flashcard Generation",
//       "Unlimited Presentation Generation",
//       "Unlimited Projects",
//       "Access to Group Workspace",
//       "Priority AI Assistance",
//     ],
//   },
//   {
//     title: "Institution",
//     popular: 0,
//     price: "Custom Pricing",
//     description:
//       "Tailored solutions for schools and organizations with enterprise-grade features.",
//     buttonText: "Contact Us",
//     benefitList: [
//       "Unlimited Access",
//       "Access to Group Workspace",
//       "Priority AI Assistance",
//       "Dedicated Account Manager",
//       "Custom Integrations",
//     ],
//   },
// ];

// // Map locales to currency codes for prominent countries across all continents
// const currencyMap: { [key: string]: string } = {
//   // Americas
//   "en-US": "USD", // United States
//   "en-CA": "CAD", // Canada
//   "es-MX": "MXN", // Mexico
//   "pt-BR": "BRL", // Brazil
//   "es-AR": "ARS", // Argentina
//   "es-CL": "CLP", // Chile
//   "es-CO": "COP", // Colombia
//   "es-PE": "PEN", // Peru
//   // Europe
//   "en-GB": "GBP", // United Kingdom
//   "de-DE": "EUR", // Germany
//   "fr-FR": "EUR", // France
//   "es-ES": "EUR", // Spain
//   "it-IT": "EUR", // Italy
//   "nl-NL": "EUR", // Netherlands
//   "sv-SE": "SEK", // Sweden
//   "no-NO": "NOK", // Norway
//   "da-DK": "DKK", // Denmark
//   "fi-FI": "EUR", // Finland
//   "pl-PL": "PLN", // Poland
//   "pt-PT": "EUR", // Portugal
//   "cs-CZ": "CZK", // Czech Republic
//   "hu-HU": "HUF", // Hungary
//   // Africa
//   "en-ZA": "ZAR", // South Africa
//   "en-NG": "NGN", // Nigeria
//   "en-GH": "GHS", // Ghana
//   "en-KE": "KES", // Kenya
//   "fr-DZ": "DZD", // Algeria
//   "ar-EG": "EGP", // Egypt
//   "fr-MA": "MAD", // Morocco
//   "en-UG": "UGX", // Uganda
//   // Asia
//   "en-IN": "INR", // India
//   "ja-JP": "JPY", // Japan
//   "zh-CN": "CNY", // China
//   "ko-KR": "KRW", // South Korea
//   "th-TH": "THB", // Thailand
//   "vi-VN": "VND", // Vietnam
//   "ms-MY": "MYR", // Malaysia
//   "id-ID": "IDR", // Indonesia
//   "en-PH": "PHP", // Philippines
//   "en-SG": "SGD", // Singapore
//   // Middle East
//   "ar-SA": "SAR", // Saudi Arabia
//   "ar-AE": "AED", // United Arab Emirates
//   "he-IL": "ILS", // Israel
//   "ar-QA": "QAR", // Qatar
//   "ar-KW": "KWD", // Kuwait
//   "tr-TR": "TRY", // Turkey
//   // Oceania
//   "en-AU": "AUD", // Australia
//   "en-NZ": "NZD", // New Zealand
// };

// export const PricingSection = () => {
//   const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
//   const [userCurrency, setUserCurrency] = useState<string>("USD");
//   const [userLocale, setUserLocale] = useState<string>("en-US");

//   // Detect user's locale and fetch exchange rates
//   useEffect(() => {
//     // Get user's locale
//     const locale = navigator.language || "en-US";
//     setUserLocale(locale);
//     const currency = currencyMap[locale] || "USD";
//     setUserCurrency(currency);

//     // Fetch exchange rates from API
//     const fetchExchangeRates = async () => {
//       try {
//         const response = await fetch(
//           `https://v6.exchangerate-api.com/v6/a41a4459b07abc825d1e0590/latest/USD`
//         );
//         const data = await response.json();
//         if (data.result === "success") {
//           setExchangeRates(data.conversion_rates);
//         } else {
//           console.error("Failed to fetch exchange rates");
//         }
//       } catch (error) {
//         console.error("Error fetching exchange rates:", error);
//       }
//     };

//     if (currency !== "USD") {
//       fetchExchangeRates();
//     }
//   }, []);

//   // Function to format price based on currency
//   const formatPrice = (price: number | string, currency: string, locale: string) => {
//     if (typeof price === "string") {
//       return price; // Return "Custom Pricing" as is
//     }
//     if (price === 0) {
//       return "Free";
//     }

//     const rate = exchangeRates[currency] || 1; // Default to 1 if no rate (USD)
//     const convertedPrice = price * rate;

//     return new Intl.NumberFormat(locale, {
//       style: "currency",
//       currency,
//     }).format(convertedPrice);
//   };

//   return (
//     <section className="container py-24 sm:py-32">
//       <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
//         Pricing
//       </h2>

//       <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
//         Unlock the Full Power of Syllabai
//       </h2>

//       <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
//         Choose a plan to access AI-powered lesson planning, assessments, and teaching tools that save you time and elevate your classroom.
//       </h3>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
//         {plans.map(
//           ({ title, popular, price, description, buttonText, benefitList }) => (
//             <Card
//               key={title}
//               className={
//                 popular === PopularPlan?.YES
//                   ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
//                   : ""
//               }
//             >
//               <CardHeader>
//                 <CardTitle className="pb-2">{title}</CardTitle>

//                 <CardDescription className="pb-4">
//                   {description}
//                 </CardDescription>

//                 <div>
//                   <span className="text-3xl font-bold">
//                     {formatPrice(price, userCurrency, userLocale)}
//                   </span>
//                   {typeof price === "number" && price !== 0 && (
//                     <span className="text-muted-foreground">/month</span>
//                   )}
//                 </div>
//               </CardHeader>

//               <CardContent className="flex">
//                 <div className="space-y-4">
//                   {benefitList.map((benefit) => (
//                     <span key={benefit} className="flex">
//                       <Check className="text-primary mr-2" />
//                       <h3>{benefit}</h3>
//                     </span>
//                   ))}
//                 </div>
//               </CardContent>

//               <CardFooter>
//                 <Button
//                   variant={
//                     popular === PopularPlan?.YES ? "default" : "secondary"
//                   }
//                   className="w-full"
//                 >
//                   {buttonText}
//                 </Button>
//               </CardFooter>
//             </Card>
//           )
//         )}
//       </div>
//     </section>
//   );
// };
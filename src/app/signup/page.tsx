import { Card, CardContent } from "@/components/ui/card";
import { Users, KeyRound, Building2, Home } from "lucide-react";
import Link from 'next/link';

const managementAreas = [
  {
    icon: (
      <div className="bg-orange-100 rounded-full p-3 inline-block">
        <Home className="w-8 h-8 text-orange-600" />
      </div>
    ),
    title: "Tenants",
    description: "Manage individual tenant configurations and data.",
    href: "/signup/tenant",
  },
  {
    icon: (
      <div className="bg-pink-100 rounded-full p-3 inline-block">
        <Building2 className="w-8 h-8 text-pink-600" />
      </div>
    ),
    title: "Clients",
    description: "Administer client-specific rules, settings, and data.",
    href: "/signup/clients",
  },
  {
    icon: (
      <div className="bg-blue-100 rounded-full p-3 inline-block">
        <Users className="w-8 h-8 text-blue-600" />
      </div>
    ),
    title: "Users",
    description: "Manage individual user accounts & permissions.",
    href: "/signup/users",
  },
  {
    icon: (
      <div className="bg-yellow-100 rounded-full p-3 inline-block">
        <KeyRound className="w-8 h-8 text-yellow-600" />
      </div>
    ),
    title: "Roles",
    description: "Define and assign access roles & hierarchies.",
    href: "#",
  },
  {
    icon: (
      <div className="bg-green-100 rounded-full p-3 inline-block">
        <Users className="w-8 h-8 text-green-600" />
      </div>
    ),
    title: "Groups",
    description: "Organize users into logical groups for bulk management.",
    href: "#",
  },
];

export default function SignupPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">
            Rule Engine Management
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Streamline access control and system configurations with intuitive tools for managing users, roles, groups, and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {managementAreas.map((area) => (
            <Link key={area.title} href={area.href} className="block group">
              <Card className="h-full text-center group-hover:shadow-xl group-hover:border-primary transition-all duration-300">
                <CardContent className="p-8 flex flex-col items-center gap-4">
                  {area.icon}
                  <h3 className="text-2xl font-semibold font-headline">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

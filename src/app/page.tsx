import { LandingHeader } from '@/components/landing-header';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { Bot, BookOpenCheck, Rocket, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <BookOpenCheck className="w-8 h-8 text-accent" />,
    title: 'Advanced Rule Management',
    description: 'Easily define, manage, and apply custom business rules with a powerful and intuitive system.',
  },
  {
    icon: <Rocket className="w-8 h-8 text-accent" />,
    title: 'Increase Productivity',
    description: 'Automate complex decision-making processes to save time and reduce manual effort.',
  },
  {
    icon: <Bot className="w-8 h-8 text-accent" />,
    title: 'Automate with AI',
    description: 'Leverage AI to clarify ambiguous logic and translate natural language into structured rules.',
  },
];

const rules = [
  { name: 'Commission Bonus', trigger: 'Sales > 10 units', action: '5% bonus', status: 'active' },
  { name: 'Content Moderation', trigger: 'Text contains "spam"', action: 'Flag for review', status: 'active' },
  { name: 'Free Shipping', trigger: 'Order total > $50', action: 'Apply free shipping', status: 'inactive' },
  { name: 'VIP Discount', trigger: 'Customer loyalty = "gold"', action: '15% discount', status: 'active' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />
      <main className="flex-1">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 bg-card">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tight text-primary">
              RuleMaster AI
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground md:text-xl">
              Streamline your business logic. Define, manage, and apply custom rules using natural language and AI-powered automation.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-bold">
                <Link href="/signup">Try for Free <ChevronRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-bold">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
              Why RuleMaster AI?
            </h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="mb-4 p-3 bg-accent/10 rounded-full">{feature.icon}</div>
                  <CardTitle className="font-headline text-xl mb-2">{feature.title}</CardTitle>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="rules-preview" className="w-full py-16 md:py-24 bg-card">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
              Powerful Rules Engine at Your Fingertips
            </h2>
            <Card className="shadow-lg">
              <CardContent className="p-4 md:p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead className="hidden sm:table-cell">Trigger Condition</TableHead>
                      <TableHead className="hidden md:table-cell">Action</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rules.map((rule) => (
                      <TableRow key={rule.name}>
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">{rule.trigger}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">{rule.action}</TableCell>
                        <TableCell>
                          <Badge variant={rule.status === 'active' ? 'default' : 'secondary'} className={cn(rule.status === 'active' ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700', 'border-none')}>
                            {rule.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 border-t bg-background">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">&copy; 2025 RuleMaster AI. All rights reserved.</p>
          <nav className="flex gap-4 sm:gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground">Terms of Service</Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4 text-muted-foreground">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

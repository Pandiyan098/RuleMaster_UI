import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const RuleFormSkeleton = () => (
  <div className="space-y-8">
      <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-20 w-full" />
      </div>
      <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-24" />
      </div>
  </div>
);

const RuleForm = dynamic(() => import('@/components/dashboard/rule-form').then(mod => mod.RuleForm), {
  ssr: false,
  loading: () => <RuleFormSkeleton />,
});


export default function NewRulePage() {
  return (
    <div className="mx-auto grid max-w-2xl flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="h-7 w-7" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Create a New Rule
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Rule Definition</CardTitle>
          <CardDescription>
            Use natural language to define your rule. Our AI will help clarify any ambiguities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RuleForm />
        </CardContent>
      </Card>
    </div>
  );
}

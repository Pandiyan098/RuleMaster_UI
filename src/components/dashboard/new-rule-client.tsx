'use client';

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

export function NewRuleClient() {
  return <RuleForm />;
}

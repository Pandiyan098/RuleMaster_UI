'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock data for rule usage - in a real app, this would come from a database.
const ruleUsageData = [
  { id: 's3', name: 'VIP Customer Discount', executionCount: 1520 },
  { id: 's2', name: 'Free Shipping', executionCount: 1230 },
  { id: 'b1', name: 'High-Value Order Alert', executionCount: 980 },
  { id: 'e1', name: 'Overtime Pay', executionCount: 850 },
  { id: 's1', name: 'Commission Bonus', executionCount: 640 },
  { id: 'b2', name: 'Content Moderation', executionCount: 450 },
  { id: 'e2', name: 'Vacation Accrual', executionCount: 320 },
  { id: 'g2', name: 'System Maintenance Alert', executionCount: 150 },
  { id: 'g1', name: 'Document Archival', executionCount: 75 },
];

// Sort the data by execution count in descending order
const sortedRules = ruleUsageData.sort((a, b) => b.executionCount - a.executionCount);
const maxExecutions = sortedRules.length > 0 ? sortedRules[0].executionCount : 0;

export default function AnalyticsPage() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Rule Analytics</CardTitle>
          <CardDescription>
            An overview of how frequently your rules are being executed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sortedRules.map((rule) => {
              const usagePercentage = maxExecutions > 0 ? (rule.executionCount / maxExecutions) * 100 : 0;
              return (
                <div key={rule.id}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">{rule.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {rule.executionCount.toLocaleString()} executions
                    </p>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

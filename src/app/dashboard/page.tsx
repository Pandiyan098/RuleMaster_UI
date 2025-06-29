"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Rule } from "@/lib/definitions";
import { RuleTable } from "@/components/dashboard/rule-table";

const initialBusinessRules: Rule[] = [
    { id: 'b1', name: 'High-Value Order Alert', description: 'Send a notification for any order over $1000.', status: 'active', createdAt: '2023-06-19' },
    { id: 'b2', name: 'Content Moderation', description: 'Flag content for review if it contains "spam" or "offensive".', status: 'active', createdAt: '2023-06-22' },
];

const initialSalesRules: Rule[] = [
    { id: 's1', name: 'Commission Bonus', description: 'Give a 5% bonus if sales are greater than 10 units.', status: 'active', createdAt: '2023-06-23' },
    { id: 's2', name: 'Free Shipping', description: 'Apply free shipping for all orders over $50.', status: 'inactive', createdAt: '2023-06-21' },
    { id: 's3', name: 'VIP Customer Discount', description: 'Give a 15% discount to all customers with "gold" loyalty status.', status: 'active', createdAt: '2023-06-20' },
];

const initialEmployeeRules: Rule[] = [
    { id: 'e1', name: 'Overtime Pay', description: 'Calculate overtime pay for hours worked over 40 in a week.', status: 'active', createdAt: '2023-05-10' },
    { id: 'e2', name: 'Vacation Accrual', description: 'Accrue 8 hours of vacation per month for full-time employees.', status: 'active', createdAt: '2023-05-01' },
];

const initialGeneralRules: Rule[] = [
    { id: 'g1', name: 'Document Archival', description: 'Archive documents older than 5 years.', status: 'inactive', createdAt: '2023-04-15' },
    { id: 'g2', name: 'System Maintenance Alert', description: 'Display a maintenance banner every Sunday from 2 AM to 4 AM.', status: 'active', createdAt: '2023-04-01' },
];

export default function DashboardPage() {
  const { toast } = useToast();
  
  const [businessRules, setBusinessRules] = useState<Rule[]>(initialBusinessRules);
  const [salesRules, setSalesRules] = useState<Rule[]>(initialSalesRules);
  const [employeeRules, setEmployeeRules] = useState<Rule[]>(initialEmployeeRules);
  const [generalRules, setGeneralRules] = useState<Rule[]>(initialGeneralRules);

  const createHandler = (setRules: React.Dispatch<React.SetStateAction<Rule[]>>) => {
    const handleToggleStatus = (ruleId: string) => {
      setRules(prevRules =>
        prevRules.map(rule =>
          rule.id === ruleId
            ? { ...rule, status: rule.status === 'active' ? 'inactive' : 'active' }
            : rule
        )
      );
      toast({ title: "Success", description: "Rule status updated." });
    };

    const handleDelete = (ruleId: string) => {
      setRules(prevRules => prevRules.filter(rule => rule.id !== ruleId));
      toast({ title: "Success", description: "Rule deleted." });
    };

    const handleEdit = (ruleId: string) => {
      toast({ title: "Edit Action", description: `Proceeding to edit rule ${ruleId}`});
    };

    return { handleToggleStatus, handleDelete, handleEdit };
  };

  const businessRuleHandlers = createHandler(setBusinessRules);
  const salesRuleHandlers = createHandler(setSalesRules);
  const employeeRuleHandlers = createHandler(setEmployeeRules);
  const generalRuleHandlers = createHandler(setGeneralRules);

  return (
    <div className="grid gap-4 md:gap-8">
      <RuleTable
        title="Business Rules"
        description="Core operational rules for your business."
        rules={businessRules}
        onToggleStatus={businessRuleHandlers.handleToggleStatus}
        onDelete={businessRuleHandlers.handleDelete}
        onEdit={businessRuleHandlers.handleEdit}
      />
      <RuleTable
        title="Sales Rules"
        description="Rules related to promotions, discounts, and commissions."
        rules={salesRules}
        onToggleStatus={salesRuleHandlers.handleToggleStatus}
        onDelete={salesRuleHandlers.handleDelete}
        onEdit={salesRuleHandlers.handleEdit}
      />
      <RuleTable
        title="Employee Rules"
        description="Rules governing payroll, time-off, and other HR processes."
        rules={employeeRules}
        onToggleStatus={employeeRuleHandlers.handleToggleStatus}
        onDelete={employeeRuleHandlers.handleDelete}
        onEdit={employeeRuleHandlers.handleEdit}
      />
      <RuleTable
        title="General Rules"
        description="Miscellaneous and system-level rules."
        rules={generalRules}
        onToggleStatus={generalRuleHandlers.handleToggleStatus}
        onDelete={generalRuleHandlers.handleDelete}
        onEdit={generalRuleHandlers.handleEdit}
      />
    </div>
  );
}

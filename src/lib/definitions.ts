export type Rule = {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  createdAt: string;
};

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  target: string;
  severity: SeverityLevel;
  cvss: number;
  bounty?: string;
  summary: string;
}
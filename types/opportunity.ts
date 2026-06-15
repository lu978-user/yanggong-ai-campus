import { type Opportunity, type OpportunityFollowStatus } from "@/data/opportunities";

export type OpportunityNotice = {
  title: string;
  date: string;
  url: string;
  type: string;
  summary: string;
};

export type WechatArticle = {
  title: string;
  content: string;
  summary: string;
  url: string;
};

export type FavoriteOpportunity = {
  title: string;
  type: string;
  deadline: string;
  url?: string;
};

export type TrackedOpportunityStatus = Exclude<OpportunityFollowStatus, "未关注">;

export type OpportunityTrackerGroup = {
  status: TrackedOpportunityStatus;
  desc: string;
  items: Opportunity[];
};

export type OpportunityStat = {
  label: string;
  value: number;
};

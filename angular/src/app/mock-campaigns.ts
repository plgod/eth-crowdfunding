export interface ICampaign {
  contractAddress: string;
  title: string;
  description: string;
  imgSrc?: string;
  categories: string[];
}

export const CAMPAIGNS: ICampaign[] = [
  {
    contractAddress: "0x63Ab33f00a296abfc3605aa689f911E1830A8fa2",
    title: "One Gwei",
    description: "Fund me and I will get one full Gwei",
    categories: ["Misc"],
  },
];

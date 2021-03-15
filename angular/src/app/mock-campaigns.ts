export interface ICampaign {
  contractAddress: string;
  title: string;
  description: string;
  imgSrc?: string;
  categories: string[];
}

export const CAMPAIGNS: ICampaign[] = [
  {
    contractAddress: "0x5B5bEFc27af45BcbEEBc40dc6e38448cE0faf025",
    title: "One Gwei",
    description: "Fund me and I will get one full Gwei",
    categories: ["Misc"],
  },
  {
    contractAddress: "0xC7579c19d6BA53bfd6A7a9C8EF120F61e12534dB",
    title: "Two Gwei",
    description: "Fund me and I will get two full Gwei",
    categories: ["Misc"],
  },
];

export interface ICampaign {
  contractAddress: string;
  title: string;
  description: string;
  imgSrc?: string;
  categories: string[];
}

export const CAMPAIGNS = [
  {
    contractAddress: "0xf8231373345e66f741a0e83966AF52827a63198C",
    title: "One Ether",
    description: "Fund me and I will get one full Ether",
    categories: ["Misc"]
  }
];

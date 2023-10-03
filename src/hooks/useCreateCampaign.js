import { useCallback } from "react";
import { useConnection } from "../context/connection";
import { parseEther } from "ethers";

export const useCreateCampaign = () => {
  const { active, signedContract } = useConnection();

  const proposeCampaign = useCallback(
    async (title, goal, duration) => {
      if (!title || !goal || !duration)
        return alert("Please provide all values");

      if (!active) return alert("please, connect");

      const contract = await signedContract();
      console.log(goal);
      return contract.createCampaigns(
        duration,
        parseEther(String(goal)),
        title
      );
    },
    [active, signedContract]
  );

  return proposeCampaign;
};

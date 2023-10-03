import { useCallback } from "react";
import { useConnection } from "../context/connection";

export const useFundCampaign = () => {
  const { signedContract } = useConnection();

  const fundCampaign = useCallback(
    async (campaignid, amount) => {
      const contract = await signedContract();
      console.log({ amount });

      const tx = await contract.payCampaign(Number(campaignid), {
        value: amount,
      });
      const receipt = await tx.wait();
      if (receipt.status === 0) return alert("tx failed");
      alert("Fund sent!!");
    },
    [signedContract]
  );
  return fundCampaign;
};

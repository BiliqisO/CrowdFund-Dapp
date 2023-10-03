import { useCallback } from "react";
import { useConnection } from "../context/connection";

function useCampaignRefundContributors(id) {
  const { signedContract } = useConnection();

  const cashOut = useCallback(
    async (id) => {
      const contract = await signedContract();
      return await contract.refundContributors(Number(id));
    },
    [signedContract]
  );

  return cashOut;
}
export default useCampaignRefundContributors;

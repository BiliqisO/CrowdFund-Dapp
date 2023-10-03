import { useCallback } from "react";
import { useConnection } from "../context/connection";

function useCampaignPayCampaignOwner(id) {
  const { signedContract } = useConnection();

  const cashOut = useCallback(
    async (id) => {
      const contract = await signedContract();
      return await contract.payCampaignOwner(Number(id));
    },
    [signedContract]
  );

  return cashOut;
}
export default useCampaignPayCampaignOwner;

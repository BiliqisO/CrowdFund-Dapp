import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";

function useCampaign(id) {
  const [campaigns, setCampaigns] = useState();
  const { readOnlyContract } = useConnection();

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        const contract = await readOnlyContract();
        const details = await contract.mapCampaign(Number(id));

        // const contributors = await contract.getcontributors(Number(id));

        const campaignDetails = {
          id: Number(id),
          title: details.campaignTitle,
          fundingGoal: details.fundingGoal,
          owner: details.campaignOwner,
          durationTime: Number(details.duration),
          isActive: details.isActive,
          campaignBalance: details.campaignBalance,
          // contributors,
        };
        setCampaigns(campaignDetails);
        console.log(campaignDetails);
      } catch (error) {
        console.error("Eeror fetching campaigns:", error);
      }
    };
    fetchAllCampaigns();
  }, [readOnlyContract, id]);
  return campaigns;
}
export default useCampaign;

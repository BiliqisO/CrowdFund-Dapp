import { useEffect, useState } from "react";
import { useConnection } from "../context/connection";
import { formatEther } from "ethers";

function useCampaignArray() {
  const [campaigns, setCampaigns] = useState([]);
  const { readOnlyContract } = useConnection();

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      try {
        const contract = await readOnlyContract();
        const campaignResults = await contract.getAllCampaign();
        const campaignDetails = campaignResults.map((details, index) => ({
          id: details.campaignId,
          title: details.campaignTitle,
          fundingGoal: formatEther(details.fundingGoal),
          owner: details.campaignOwner,
          durationTime: Number(details.duration),
          isActive: details.isActive,
          campaignBalance: formatEther(details.campaignBalance),
          // contributors: contributorsResults[index],
        }));
        setCampaigns(campaignDetails);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchAllCampaigns();
  }, [readOnlyContract]);

  return campaigns;
}
export default useCampaignArray;

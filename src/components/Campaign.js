import React from "react";
import useCampaignArray from "../hooks/useCampaignArray";
import { formatDate } from "../hooks/useTime";
import { Link } from "react-router-dom";
import { useConnection } from "../context/connection";

export const Campaign = () => {
  const { active } = useConnection();
  const arrayCampaign = useCampaignArray();

  const showCampaign = arrayCampaign.map((camp) => {
    return (
      <Link to={`/post/${Number(camp.id)}`}>
        <div
          key={camp.id}
          className="camp"
        >
          <h3> CAMPAIGN "{camp.title}"</h3>

          <p>Funding goal: {camp.fundingGoal} ETH</p>

          <p>Campaign Balance : {camp.campaignBalance} ETH</p>
          <p> Campaign Owner: {camp.owner.toString()}</p>
          <p> Deadline: {formatDate(camp.durationTime)}</p>
        </div>
      </Link>
    );
  });

  return (
    <div className="body">
      {showCampaign}

      {!active && (
        <div className="inactive">
          {" "}
          <h1>CROWDFUND DAPP</h1>
          <p className="big">
            {" "}
            connect your wallet (sepolia network) to get started
          </p>{" "}
        </div>
      )}
    </div>
  );
};

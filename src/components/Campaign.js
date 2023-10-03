import React from "react";
import useCampaignArray from "../hooks/useCampaignArray";
import { formatDate } from "../hooks/useTime";
import { Link } from "react-router-dom";

export const Campaign = () => {
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

  return <div className="body">{showCampaign}</div>;
};

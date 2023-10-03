import React from "react";
import { useParams } from "react-router-dom";
import useCampaign from "../../hooks/useCampaign";
import { FundCampaign } from "../FundCampaign";
import "./CampaignDetail.css";

import { formatDate } from "../../hooks/useTime";
import { formatEther } from "ethers";
import useCampaignPayCampaignOwner from "../../hooks/useCampaignPayOwner";
import useCampaignRefundContributors from "../../hooks/useCampaignRefundContributors";
export const CampaignDetail = () => {
  const payOwner = useCampaignPayCampaignOwner();
  const refundContributors = useCampaignRefundContributors();
  let { id } = useParams();
  const post = useCampaign(id);

  const handlePayOwner = async () => {
    if (Number(post.campaignBalance) === 0)
      return alert("no funds in this campaign");
    try {
      const tx = await payOwner(id);
      const receipt = await tx.wait();
      if (receipt.status === 0) return alert("tx failed");
      alert("Owner PAid");
    } catch (error) {
      console.log("error: ", error);
      if (error.info.error.code === 4001) {
        return alert("You rejected the request");
      }
      alert("something went wrong");
    } finally {
      //   setSendingTx(false);
    }
  };

  const handleRefundContributors = async () => {
    if (Date.now() / 1000 < post.durationTime)
      return alert("time e o ti pe, pada wa");
    if (Number(post.campaignBalance) === 0)
      return alert("no funds in this campaign");
    try {
      const tx = await refundContributors(id);
      const receipt = await tx.wait();
      if (receipt.status === 0) return alert("tx failed");
      alert("refund sent");
    } catch (error) {
      console.log("error: ", error);
      if (error.info.error.code === 4001) {
        return alert("You rejected the request");
      }
      alert("something went wrong");
    } finally {
      //   setSendingTx(false);
    }
  };
  if (!post) return <>Loading.....</>;
  return (
    <div className="card">
      <h1>{post.title}</h1>
      <p>
        {" "}
        <b>Campaign Owner: </b> {post.owner}
      </p>
      <p>{post.details}</p>
      <p>
        {" "}
        <b>funding Goal :</b> {formatEther(post.fundingGoal)} ETH
      </p>

      <p>
        {" "}
        <b>Campaign Balance :</b> {formatEther(post.campaignBalance)} ETH
      </p>

      <p>
        {" "}
        <b>Deadline: </b> {formatDate(post.durationTime)}
      </p>
      <FundCampaign
        id={post.id}
        time={post.durationTime}
        active={post.isActive}
      />
      {Number(post.campaignBalance) !== 0 && (
        <button
          onClick={
            formatEther(post.campaignBalance) > formatEther(post.fundingGoal)
              ? handlePayOwner
              : handleRefundContributors
          }
        >
          {formatEther(post.campaignBalance) > formatEther(post.fundingGoal)
            ? "PayOwner"
            : "RefundContributors"}
        </button>
      )}
      {Number(post.campaignBalance) === 0 && (
        <p className="error"> Zero Funds In this Campaign </p>
      )}
    </div>
  );
};

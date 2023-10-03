import React, { useState } from "react";
import { useFundCampaign } from "../hooks/useFundCampaign";
import { parseEther } from "ethers";
import "./CampaignDetail/CampaignDetail.css";
export const FundCampaign = ({ id, time, active }) => {
  const [amount, setAmount] = useState(0);
  const fundCampaign = useFundCampaign();

  const handleFundCampaign = async () => {
    if (!active) return alert("Campaign is no longer active");
    if (Date.now() / 1000 > time) return alert("Campaign Over");

    if (amount <= 0) return alert("Enter a non-zero amount!");

    try {
      //   setSendingTx(true);
      console.log({ formatted: parseEther(String(amount)) });
      const tx = await fundCampaign(id, parseEther(String(amount)));
      const receipt = await tx.wait();

      if (receipt.status === 0) return alert("tx failed");

      alert("Thanks for contibuting!!");
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

  return (
    <div>
      <label> FUND CAMPAIGN</label>
      <input
        name="name"
        value={amount}
        style={{ paddingRight: "4px", paddingTop: "5px" }}
        onChange={(e) => setAmount(e.target.value)}
        type="number"
      />
      <button
        value="Submit"
        type="submit"
        onClick={() => handleFundCampaign()}
        disabled={Date.now() / 1000 > time}
      >
        CONTRIBUTE
      </button>

      <p>
        <i>
          {" "}
          {Date.now() / 1000 > time
            ? "Campaign Time Passed"
            : "Campaign Active"}
        </i>
      </p>
    </div>
  );
};

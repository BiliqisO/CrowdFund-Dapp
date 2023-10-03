import React, { useRef, useState } from "react";
import { useCreateCampaign } from "../../hooks/useCreateCampaign";
import { useConnection } from "../../context/connection";

import "./CreateCampaign.css";

export const CreateCampaign = () => {
  const proposeCampaign = useCreateCampaign();
  const dateInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState(10);
  const [duration, setDuration] = useState("");
  const [modal, setModal] = useState(false);
  const [sendingTx, setSendingTx] = useState(false);
  const { active, account } = useConnection();

  const handleChange = (e) => {
    setDuration(e.target.value);
    console.log(duration);
  };

  const date = new Date(duration);
  const timestamp = date.getTime();

  const unixTimestamp = Math.floor(timestamp / 1000);

  const handleProposeCampaign = async (e) => {
    e.preventDefault();
    if (!title || !goal || !unixTimestamp)
      return alert("Please provide all values");
    if (!active) return alert("please, connect");
    setModal(!modal);
    try {
      setSendingTx(true);
      const tx = await proposeCampaign(title, goal, unixTimestamp);
      const receipt = await tx.wait();
      if (receipt.status === 0) return alert("tx failed");
      setModal(!modal);
      alert("campaign created!!");
    } catch (error) {
      console.log("error: ", error);
      if (error.info.error.code === 4001) {
        return alert("You rejected the request");
      }
      alert("something went wrong");
    } finally {
      setModal(!modal);
      setSendingTx(false);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {active && (
        <button
          onClick={toggleModal}
          className="btn-modal button-62"
        >
          create campaign
        </button>
      )}
      {modal && (
        <div className="modal">
          <div
            onClick={toggleModal}
            className="overlay"
          ></div>
          <div className="modal-content">
            <h2>
              Hello {account.substring(0, 6)}...{account.substring(38)}
            </h2>
            <form>
              <label>
                Campaign Title:
                <textarea
                  rows={4}
                  cols={32}
                  type="text"
                  name="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <br />
              <label>
                Campaign Goal:
                <input
                  type="number"
                  name="name"
                  min={0}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                />
                ETH
              </label>
              <br />
              <label>
                Select a Date:
                <input
                  type="date"
                  onChange={handleChange}
                  value={duration}
                  ref={dateInputRef}
                />
              </label>
              <button
                value="Submit"
                onClick={handleProposeCampaign}
              >
                Create Campaign
              </button>
            </form>
            <button
              className="close-modal"
              onClick={toggleModal}
            >
              PROFILE
            </button>
          </div>
        </div>
      )}
    </>
  );
};

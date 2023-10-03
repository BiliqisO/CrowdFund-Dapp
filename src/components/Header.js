import React from "react";
import { useConnection } from "../context/connection";
import { CreateCampaign } from "./CreateCampaign/CreateCampaign";

export const Header = () => {
  const { connectToMetamask, account, active } = useConnection();
  return (
    <div className="header">
      <CreateCampaign />
      <div className="metamask">
        {active && (
          <p>
            {account.substring(0, 6)}...{account.substring(38)}
          </p>
        )}

        {active ? (
          <button>Connected</button>
        ) : (
          <button onClick={connectToMetamask}>Connect to metamask</button>
        )}
      </div>
    </div>
  );
};

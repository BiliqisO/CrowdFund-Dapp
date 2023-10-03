import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Campaign } from "./components/Campaign";

import { Header } from "./components/Header";
import { CampaignDetail } from "./components/CampaignDetail/CampaignDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Campaign />,
    },
    {
      path: "/post/:id",
      element: <CampaignDetail />,
    },
  ]);
  return (
    <div className="App">
      <Header />
      <div className="body">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;

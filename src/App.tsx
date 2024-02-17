import React, { useEffect, useMemo } from "react";
import {
  Routes,
  Route,
  useNavigate,
  redirect,
  useLocation,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Profile from "./pages/Profile";
import Onboarding1 from "./components/Onboarding/Onboarding1";
import Campaign from "./components/Campaign";
import Details from "./components/Campaign/Details";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";

const App = () => {
  // const { initialized } = React.useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  React.useMemo(() => {
    console.log(publicKey, location);
    if (publicKey === null) {
      if (location.pathname.includes("details/")) {
        return;
      } else {
        navigate("/", {
          state: location || "/",
        });
      }
    }
  }, [publicKey]);

  // if (initialized) {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="onboarding" element={<Onboarding1 />} />
        <Route path="profile" element={<Profile />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="details/:id" element={<Details />} />
      </Routes>
    </React.Fragment>
  );
  // } else {
  //   return (
  //     <React.Fragment>
  //       <Routes>
  //         <Route path="/" element={<LandingPage />} />
  //       </Routes>
  //     </React.Fragment>
  //   );
  // }
};

export default App;

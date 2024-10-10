import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import BloodBankLogin from "./pages/BloodBankLogin.jsx";
import BloodBankRegister from "./pages/BloodBankRegister.jsx";
import DonorLogin from "./pages/DonorLogin.jsx";
import DonorRegister from "./pages/DonorRegister.jsx";
import BloodDirectory from "./pages/BloodDirectory.jsx";
import NearbyDonor from "./pages/NearbyDonor.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import ProfileOverview from "./pages/Profile/ProfileOverview.jsx";
import Request from "./pages/Profile/Request.jsx";
import BloodRequest from "./pages/Profile/BloodRequest.jsx";
import "react-toastify/dist/ReactToastify.css";
import BloodInventory from "./pages/Profile/BloodInventory.jsx";
import AvailableBlood from "./pages/AvailableBlood.jsx";
import AddBloodCamp from "./pages/Profile/AddBloodCamp.jsx";
import AllCamp from "./pages/Profile/AllCamp.jsx";
import BloodbankCamps from "./pages/BloodbankCamps.jsx";
import DonorRegcamp from "./pages/Profile/DonorRegcamp.jsx";
import Chatbot from "./components/Chatbot.jsx";
const rout = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App></App>}>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/chatbot" element={<Chatbot></Chatbot>}></Route>
      <Route
        path="/BloodBankLogin"
        element={<BloodBankLogin></BloodBankLogin>}
      ></Route>
      <Route
        path="/BloodBankRegister"
        element={<BloodBankRegister></BloodBankRegister>}
      ></Route>
      <Route path="/DonorLogin" element={<DonorLogin></DonorLogin>}></Route>
      <Route
        path="/DonorRegister"
        element={<DonorRegister></DonorRegister>}
      ></Route>
      <Route
        path="/BloodDirectory"
        element={<BloodDirectory></BloodDirectory>}
      ></Route>
      <Route
        path="/BloodbankCamps"
        element={<BloodbankCamps></BloodbankCamps>}
      ></Route>
      <Route path="/NearbyDonor" element={<NearbyDonor></NearbyDonor>}></Route>
      <Route path="/profile" element={<Profile></Profile>}>
        <Route
          path="/profile"
          element={<ProfileOverview></ProfileOverview>}
        ></Route>
        <Route
          path="profileOverview"
          element={<ProfileOverview></ProfileOverview>}
        ></Route>
        <Route path="request" element={<Request></Request>}></Route>
        <Route
          path="donation_request"
          element={<BloodRequest></BloodRequest>}
        ></Route>
        <Route
          path="blood_inventory"
          element={<BloodInventory></BloodInventory>}
        ></Route>
        <Route
          path="AddBlood_Camp"
          element={<AddBloodCamp></AddBloodCamp>}
        ></Route>
        <Route path="AllBlood_Camp" element={<AllCamp></AllCamp>}></Route>
        <Route
          path="camp"
          element={<DonorRegcamp></DonorRegcamp>}
        ></Route>
      </Route>
      <Route path="/Availableblood/:id" element={<AvailableBlood />}></Route>
    </Route>
  )
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={rout} />
  </StrictMode>
);

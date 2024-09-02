import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import DonorLogin from "./pages/DonorLogin";
import DonorRegister from "./pages/DonorRegister";
import BloodBankRegister from "./pages/BloodBankRegister";
import BloodBankLogin from "./pages/BloodBankLogin";
import BloodDirectory from "./pages/BloodDirectory";

function App() {
  return (
    <>
      <Header></Header>
      <BloodDirectory></BloodDirectory>
    </>
  );
}

export default App;

import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import store from "./store/Store";
import { Provider } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <div className="min-h-[29rem]">
        <Outlet></Outlet>{" "}
      </div>
      <Footer></Footer>
    </Provider>
  );
}

export default App;

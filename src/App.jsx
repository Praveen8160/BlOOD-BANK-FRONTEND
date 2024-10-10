import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import store from "./store/Store";
import { Provider } from "react-redux";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Loader from "./components/Loader";
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (you can replace this with your actual app initialization logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time or use actual API calls/initialization here

    return () => clearTimeout(timer);
  }, []);
  return (
    <Provider store={store}>
      {isLoading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <Loader />
        </div>
      ) : (
        <>
          <Header></Header>
          <div className="min-h-[29rem]">
            <Outlet></Outlet>{" "}
          </div>
          <Footer></Footer>
        </>
      )}
    </Provider>
  );
}

export default App;

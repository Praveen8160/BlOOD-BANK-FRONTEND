import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import store from "./store/Store";
import { Provider } from "react-redux";
import io from "socket.io-client";
import { useEffect } from "react";
function App() {
  // const [notifications, setNotifications] = useState([]);
  // const savedBloodBankId = localStorage.getItem("id");
  // useEffect(() => {
  //   const socket = io("http://localhost:4000");
  //   if (savedBloodBankId) {
  //     socket.emit("register", savedBloodBankId);
  //   }
  //   socket.on("newBloodRequest", (data) => {
  //     console.log("data", data);
  //     toast.success(data.message);
  //   });

  //   // Cleanup socket on unmount
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [savedBloodBankId]);
  return (
    <Provider store={store}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </Provider>
  );
}

export default App;

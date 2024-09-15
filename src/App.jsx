import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import store from "./store/Store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </Provider>
  );
}

export default App;

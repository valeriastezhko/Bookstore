import { Provider } from "react-redux";
import Router from "./router/Router";
import "reset-css";
import "./variables.css";
import { store } from "./store";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";

const App = () => {
  return (
    <Provider store={store}>
      <Router />
      <ScrollToTopButton />
    </Provider>
  );
};

export default App;

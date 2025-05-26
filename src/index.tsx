import ReactDOM from "react-dom/client";
import App from "./App";
import StateProvider from "./providers/StateProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persister } from "./flux/store";
import { BrowserRouter } from "react-router-dom";
import io from "socket.io-client";
import { MessageProvider } from "utils";
import "./index.css";

export const socket = io(process.env.REACT_APP_SOCKET_URL as string, {
  transports: ["websocket"],
});
// @ts-ignore
const appRoot = ReactDOM.createRoot(document.getElementById("root"));

appRoot.render(
  <StateProvider>
    <PersistGate persistor={persister}>
      <BrowserRouter>
        <MessageProvider>
          <App />
        </MessageProvider>
      </BrowserRouter>
    </PersistGate>
  </StateProvider>
);

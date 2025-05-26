import axios from "axios";
import store from "../flux/store";
import { clearUser, setUser } from "../flux/reducers/auth";
// import { setChatsData } from "flux/reducers/chat";
// import { setTemplates } from "../flux/reducers/extras";

const API = axios.create({ baseURL: "http://localhost:8001/api" });

API.interceptors.request.use(
  (config) => {
    const {
      auth: { token },
    } = store.getState();
    if (token && config.headers) {
      config.headers["auth-token"] = token;
    }

    return config;
  },
  (error) => {
    console.log("API Request | Interceptor |  Error", error);
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearUser());
      // store.dispatch(setChatsData({}));
      // store.dispatch(setTemplates({}));
    } else {
      return error?.response;
    }
  }
);
export default API;

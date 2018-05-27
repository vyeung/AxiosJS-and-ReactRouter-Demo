import axios from "axios";

const instance = axios.create({
  baseURL: "some other website or route"
});

instance.defaults.headers.common["Auth"] = "Auth From Instance";

//can also add interceptors in the instance
//instance.interceptors.request...

export default instance;
import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-on-you-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default instance;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
});
let userStorage = localStorage.getItem("user");


export default instance;

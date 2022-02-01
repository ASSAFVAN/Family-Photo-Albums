import axios from "axios";

let url = "http://localhost:5000/api";

if (process.env.NODE_ENV === "production") {
  url = "api";
}
export default axios.create({
  baseURL: url,
});

import axios from "axios";

let url = "http://localhost:5000/api";

if (process.env.NODE_ENV === "production") {
  // url = "api";
  url = "https://assaf-family-photo-album.herokuapp.com/api";
}
export default axios.create({
  baseURL: url,
});

import axios from "axios";
const LOCAL_SERVER = "http://localhost:8000";

function getHost() {
  return LOCAL_SERVER;
}

export async function getDashboardInfo() {
  const url = getHost() + "/api/useractivitylog";
  const res = await axios.get(url);
  return res.data;
}
import axios from "axios";

const reposEndpoint = `https://firestore.googleapis.com/google.firestore.v1.Firestore/Listen/channel?database=projects%2Fclic-compostnew%2Fdatabases%2F(default)&gsessionid=mWRB8BpjLFsv2HJUwiSEzpJpAX6dJ46pusOx0hBJYgw&VER=8&RID=rpc&SID=3STlU_uddGTy33-6igiUsQ&CI=0&AID=0&TYPE=xmlhttp&zx=az7bi3f9n2mv&t=1`;
export const fetchFirebase = async () => {
  return await axios.get(reposEndpoint);
};

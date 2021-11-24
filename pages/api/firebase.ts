import { NextApiResponse } from "next";
import { fetchFirebase } from "../../libs/firebase";
export default async (_, res: NextApiResponse) => {
  const response = await fetchFirebase();
  const items = response.data.slice(0, 30).map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    svn_url: item.svn_url,
    stargazers_count: item.stargazers_count,
    watchers_count: item.watchers_count,
    forks_count: item.forks_count,
  }));
  return res.status(200).json({ items });
};

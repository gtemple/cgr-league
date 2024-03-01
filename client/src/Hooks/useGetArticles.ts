import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ArticleData from "../classes/ArticleData";

const supabase = createClient(
  import.meta.env.VITE_DB_URL,
  import.meta.env.VITE_DB_KEY
);

export default function useGetArticles() {
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    const { data } = await supabase
      .from("articles")
      .select()
      .order("created_at");
    //@ts-expect-error
    setArticlesData(data);
    setLoaded(true);
  }

  return {
    articlesData,
    loaded,
  };
}

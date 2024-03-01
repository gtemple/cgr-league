import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import ArticleData from "../classes/ArticleData";

const supabase = createClient(
  import.meta.env.VITE_DB_URL,
  import.meta.env.VITE_DB_KEY
);

export default function useGetArticle(id: number | string | undefined) {
  const [articleData, setArticleData] = useState<ArticleData>();
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    getArticle();
  }, []);

  async function getArticle() {
    const { data } = await supabase
      .from("articles")
      .select()
      .eq('id', id)
    //@ts-expect-error
    setArticleData(data);
    setLoaded(true);
  }

  return {
    articleData,
    loaded,
  };
}

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchNewsThunk } from "../store/sliceNews";
import { type AppDispatch } from "../store/store";
import { ArticleCard } from "./ArticleCard";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";

export function NewsArea() {
  const dispatch = useDispatch<AppDispatch>();
  const [userId, setUserId] = useState<string | undefined>(undefined);

  const articles = useSelector((state: any) => state.news.articles);
  const loading = useSelector((state: any) => state.news.loading);
  const selectedSection = useSelector(
    (state: any) => state.news.selectedSection,
  );

  useEffect(() => {
    dispatch(fetchNewsThunk(selectedSection));
  }, [selectedSection]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user?.uid);
    });
    return () => unsubscribe();
  }, []);

  const leftArticles = articles.slice(0, 15);
  const mainArticles = articles.slice(15, 22);
  const rightArticles = articles.slice(22, 32);

  if (loading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-10 animate-pulse">
        <div className="flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-t border-zinc-300 pt-2"
            >
              <div className="h-4 bg-zinc-200 rounded w-full" />
              <div className="h-4 bg-zinc-200 rounded w-4/5" />
              <div className="h-3 bg-zinc-100 rounded w-3/5" />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="w-full h-56 bg-zinc-200 rounded" />
              <div className="h-3 bg-zinc-100 rounded w-2/3 mx-auto" />
            </div>
          ))}
        </div>
        <div className="hidden lg:flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border-b border-zinc-100 pb-4"
            >
              <div className="w-full h-24 bg-zinc-200 rounded" />
              <div className="h-3 bg-zinc-100 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-10">
      <div className="flex flex-col gap-6">
        {leftArticles.map((article: any) => (
          <ArticleCard
            key={article.url}
            title={article.title}
            abstract={article.abstract}
            url={article.url}
            multimedia={article.multimedia}
            variant="text"
            userId={userId}
          />
        ))}
      </div>

      <div className="flex flex-col gap-8">
        {mainArticles.map((article: any) => (
          <ArticleCard
            key={article.url}
            title={article.title}
            abstract={article.abstract}
            url={article.url}
            multimedia={article.multimedia}
            variant="main"
            userId={userId}
          />
        ))}
      </div>

      <div className="hidden lg:flex flex-col border-l border-zinc-300 pl-4 gap-2">
        {rightArticles.map((article: any) => (
          <ArticleCard
            key={article.url}
            title={article.title}
            abstract={article.abstract}
            url={article.url}
            multimedia={article.multimedia}
            variant="small"
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
}

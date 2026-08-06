import { useState, useEffect } from "react";
import { addBookmark, removeBookmark, isBookmarked } from "../services/bookmarkService";

interface ArticleCardProps {
  title: string;
  abstract: string;
  url: string;
  multimedia: { url: string }[] | null;
  variant: "text" | "main" | "small";
  userId?: string;
}

export function ArticleCard({
  title,
  abstract,
  url,
  multimedia,
  variant,
  userId,
}: ArticleCardProps) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (userId) {
      isBookmarked(userId, url).then(setBookmarked);
    }
  }, [userId, url]);

  async function toggleBookmark(e: React.MouseEvent) {
    e.preventDefault();
    if (!userId) return;
    if (bookmarked) {
      await removeBookmark(userId, url);
      setBookmarked(false);
    } else {
      await addBookmark({
        userId,
        title,
        abstract,
        url,
        imageUrl: multimedia?.[0]?.url ?? "",
      });
      setBookmarked(true);
    }
  }

  const BookmarkIcon = () => (
    <button
      onClick={toggleBookmark}
      className="absolute top-0 left-2 bg-zinc-200 border border-zinc-400 p-0.5 hover:bg-zinc-100 cursor-pointer"
    >
      {bookmarked ? "★" : "☆"}  
    </button>
  );

  if (variant === "text") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className={`relative flex flex-col gap-1`}>
          {userId && <BookmarkIcon />}
          <h2 className={`font-bold text-base hover:text-zinc-500 border-t border-zinc-300 pt-2 ${userId ? "mt-2 pt-5" : ""}`}>{title}</h2>
          <p className="text-sm font-light">{abstract}</p>
        </div>
      </a>
    );
  }

  if (variant === "main") {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="relative flex flex-col gap-1">
          {userId && <BookmarkIcon />}
          <img
            src={multimedia?.[0]?.url}
            alt={title}
            className={`w-full h-85.25 object-cover border-2 border-zinc-300 ${userId ? "mt-2" : ""}`}
          />
          <p className="text-sm font-light text-center">{title}</p>
        </div>
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className={`relative flex flex-col gap-1 border-b border-zinc-300 pb-5 ${userId ? "pt-2" : ""} `}>
        {userId && <BookmarkIcon />}
        <img
          src={multimedia?.[0]?.url}
          alt={title}
          className="w-full object-cover mb-1 border-2 border-zinc-300"
        />
        <h2 className="font-bold text-sm">{title}</h2>
      </div>
    </a>
  );
}
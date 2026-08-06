import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../services/firebase";
import { loginWithGoogle, logout } from "../services/authService";
import {
  getUserBookmarks,
  removeBookmark,
  type BookmarkedArticle,
} from "../services/bookmarkService";
import { Link } from "react-router-dom";
import NytLogo from "./NytLogo";

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const saved = await getUserBookmarks(currentUser.uid);
        setBookmarks(saved);
      }
    });
    return () => unsubscribe();
  }, []);

  async function handleRemove(url: string) {
    if (!user) return;
    await removeBookmark(user.uid, url);
    setBookmarks((prev) => prev.filter((b) => b.url !== url));
  }

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 pt-20">
        <Link to="/" className="text-sm hover:underline">
          ← Back to Home
        </Link>
        <div className="w-70 md:w-100">
          <NytLogo />
        </div>

        <p className="text-zinc-500">Sign in to access your dashboard</p>
        <button
          onClick={loginWithGoogle}
          className="flex items-center gap-2 border border-zinc-300 px-6 py-3 hover:bg-zinc-100 cursor-pointer"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pt-8">
      <div className="flex flex-col md:flex-row items-center">
        <Link to="/" className="text-sm hover:underline w-1/4">
          ← Back to Home
        </Link>
        <div className="w-1/2 flex items-center justify-center">
          <NytLogo className="w-70" />
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-zinc-300 pb-4">
        <h1 className="md:text-2xl font-bold font-nyt-title">My Dashboard</h1>
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL ?? ""}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm hidden md:block">{user.displayName}</span>
          <button
            onClick={logout}
            className="text-sm border border-zinc-300 px-3 py-1 hover:bg-zinc-100 cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>

      <div>
        <h2 className="md:text-lg md:font-bold mb-4">Saved Articles</h2>
        {bookmarks.length === 0 ? (
          <p className="text-zinc-500 text-sm">No saved articles yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {bookmarks.map((article) => (
              <div
                key={article.url}
                className="flex gap-4 border-b border-zinc-300 pb-4"
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-24 h-16 object-cover shrink-0"
                  />
                )}
                <div className="flex flex-col gap-1 flex-1">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm hover:underline"
                  >
                    {article.title}
                  </a>
                  <p className="text-xs text-zinc-500">{article.abstract}</p>
                </div>
                <button
                  onClick={() => handleRemove(article.url)}
                  className="text-xs text-zinc-400 hover:text-red-500 cursor-pointer self-start"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

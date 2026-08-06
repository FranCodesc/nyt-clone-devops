import { MarketData } from "./MarketData";
import { useDispatch } from "react-redux";
import { setSelectedSection } from "../store/sliceNews";
import { Categories } from "./Categories";
import NytLogo from "./NytLogo";
import { Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../services/firebase";

export function Navbar() {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const dispatch = useDispatch();

  // Teniamo l'intero oggetto User (non solo l'uid)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full mb-2">
        <div className="hidden lg:flex w-1/4 flex-col pt-6">
          <span className="text-sm font-light">{date}</span>
          <span className="text-sm font-light">Today's Paper</span>
        </div>
        <div></div>
        <div
          className="w-full lg:w-1/2 flex justify-center hover:cursor-pointer"
          onClick={() => dispatch(setSelectedSection("home"))}
        >
          <NytLogo className="h-19" />
        </div>

        <div className="hidden lg:flex w-1/4 justify-end items-center text-sm font-medium">
          <MarketData />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Link
          to="/dashboard"
          className="hover:underline flex items-center justify-center border border-zinc-300 px-4 py-2 w-fit text-sm"
          title={
            !user
              ? "Sign in to access your dashboard and save your favorite articles"
              : undefined
          }
        >
          {user ? (
            <div className="flex items-center gap-4">
              {user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>MY DASHBOARD</span>
            </div>
          ) : (
            "SIGN IN"
          )}
        </Link>
        <Categories />
      </div>
      <div className="w-full">
        <div className="divider w-full"></div>
        <div className="divider w-full"></div>
      </div>
    </div>
  );
}

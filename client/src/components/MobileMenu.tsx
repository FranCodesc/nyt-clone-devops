import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSelectedSection } from "../store/sliceNews";
import { categories } from "../data/categories";
import { Link } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../services/firebase";
import NytLogo from "./NytLogo";

export function MobileMenu() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  function handleCategoryClick(section: string) {
    dispatch(setSelectedSection(section));
    setIsOpen(false);
  }

  return (
    <div className="lg:hidden">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-300">
        <button onClick={() => setIsOpen(true)} className="text-2xl cursor-pointer">☰</button>
        <div onClick={() => dispatch(setSelectedSection("home"))} className="hover:cursor-pointer">
          <NytLogo className="w-60"/>
        </div>
        <Link to="/dashboard">
          {user?.photoURL ? (
            <img src={user.photoURL} alt="avatar" className="w-7 h-7 rounded-full" />
          ) : (
            <span className="text-xl">👤</span>
          )}
        </Link>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full sm:w-80 w-full bg-white z-50 overflow-y-auto transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-300">
          <span className="font-bold text-sm">SECTIONS</span>
          <button onClick={() => setIsOpen(false)} className="text-xl cursor-pointer">✕</button>
        </div>

        <div className="flex flex-col">
          {categories.map((cat) => (
            <div key={cat.section} className="border-b border-zinc-100">
              <div className="flex items-center justify-between px-4 py-3">
                <span
                  className="font-medium text-sm cursor-pointer hover:underline"
                  onClick={() => handleCategoryClick(cat.section)}
                >
                  {cat.label}
                </span>
                <button
                  onClick={() => setExpandedSection(expandedSection === cat.section ? null : cat.section)}
                  className="text-zinc-500 text-xs cursor-pointer px-2"
                >
                  {expandedSection === cat.section ? "▲" : "▼"}
                </button>
              </div>

              {expandedSection === cat.section && (
                <div className="px-6 pb-3 flex flex-col gap-1">
                  {cat.subsections.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-600 py-1 hover:underline"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

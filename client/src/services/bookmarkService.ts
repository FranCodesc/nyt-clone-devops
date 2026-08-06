import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";

export interface BookmarkedArticle {
  id?: string;
  userId: string;
  title: string;
  abstract: string;
  url: string;
  imageUrl: string;
}

export async function addBookmark(article: BookmarkedArticle) {
  await addDoc(collection(db, "bookmarks"), article);
}

export async function removeBookmark(userId: string, url: string) {
  const q = query(
    collection(db, "bookmarks"),
    where("userId", "==", userId),
    where("url", "==", url)
  );
  const snapshot = await getDocs(q);
  snapshot.forEach((document) => deleteDoc(doc(db, "bookmarks", document.id)));
}

export async function getUserBookmarks(userId: string): Promise<BookmarkedArticle[]> {
  const q = query(collection(db, "bookmarks"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BookmarkedArticle));
}

export async function isBookmarked(userId: string, url: string): Promise<boolean> {
  const q = query(
    collection(db, "bookmarks"),
    where("userId", "==", userId),
    where("url", "==", url)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
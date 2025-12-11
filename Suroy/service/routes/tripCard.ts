import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import getUser from "../authDB";
import { db } from "@/FirebaseConfig";

export type tripCardContent = {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
  minBudget: number;
  maxBudget: number;
  isComplete: Boolean;
  createdAt: Date;
};

export const addTripCard = async (tripContent: tripCardContent) => {
  const user = getUser(); // Get the user automatically

  await addDoc(collection(db, "tripCards"), {
    userId: user.uid, // 👈 Attached automatically
    id: tripContent.id,
    title: tripContent.title,
    location: tripContent.location,
    startDate: tripContent.startDate,
    endDate: tripContent.endDate,
    minBudget: tripContent.minBudget,
    maxBudgget: tripContent.maxBudget,
    isComplete: tripContent.isComplete,
    createdAt: tripContent.createdAt,
  });
};

// 2. Get Tasks (Automatically filters for THIS user)
export const getTripCard = async () => {
  const user = getUser();

  const q = query(
    collection(db, "tripCards"),
    where("userId", "==", user.uid), // 👈 Filter automatically
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTripCard = async (taskId: string, updatedData: object) => {
  const taskRef = doc(db, "tripCards", taskId);

  await updateDoc(taskRef, updatedData);
};

export const deleteTripCard = async (taskId: string) => {
  const taskRef = doc(db, "tripCards", taskId);

  await deleteDoc(taskRef);
};

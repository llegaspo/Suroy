import {
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import getUser from "../authDB";
import { db } from "@/FirebaseConfig";

export type tripCardContent = {
  id: string;
  title: string;
  imageUri: string;
  location: string;
  startDate: Date;
  endDate: Date;
  minBudget: number;
  maxBudget: number;
  isComplete: Boolean;
  createdAt: Date;
  isActive: Boolean;
};

export const addTripCard = async (tripContent: tripCardContent) => {
  const user = getUser(); // Get the user automatically

  await addDoc(collection(db, "tripCards"), {
    userId: user.uid, // 👈 Attached automatically
    id: tripContent.id,
    title: tripContent.title,
    imageUri: tripContent.imageUri,
    location: tripContent.location,
    startDate: tripContent.startDate,
    endDate: tripContent.endDate,
    minBudget: tripContent.minBudget,
    maxBudget: tripContent.maxBudget,
    isComplete: tripContent.isComplete,
    createdAt: tripContent.createdAt,
    isActive: tripContent.isActive,
  });
};

// 2. Get Tasks (Automatically filters for THIS user)
export const getTripCard = async () => {
  const user = getUser();

  const q = query(
    collection(db, "tripCards"),
    // where("userId", "==", user.uid), // 👈 Filter automatically
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title,
      imageUri: data.imageUri,
      location: data.location,
      startDate:
        data.startDate instanceof Timestamp
          ? data.startDate.toDate()
          : data.startDate,
      endDate:
        data.endDate instanceof Timestamp
          ? data.endDate.toDate()
          : data.endDate,
      createdAt:
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : data.createdAt,
      minBudget: data.minBudget,
      maxBudget: data.maxBudget, // Note: Watch your spelling (maxBudgget vs maxBudget)
      isComplete: data.isComplete,
      isActive: data.isActive,
    } as tripCardContent;
  });
};

export const updateTripCard = async (taskId: string, updatedData: object) => {
  const taskRef = doc(db, "tripCards", taskId);

  await updateDoc(taskRef, updatedData);
};

export const deleteTripCard = async (taskId: string) => {
  const taskRef = doc(db, "tripCards", taskId);

  await deleteDoc(taskRef);
};

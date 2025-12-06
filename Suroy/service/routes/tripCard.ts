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

// --- DATABASE OPERATIONS ---

// 1. Add Task (Automatically adds the User ID)
export const addTripCard = async (taskContent: string) => {
  const user = getUser(); // Get the user automatically

  await addDoc(collection(db, "tripCard"), {
    content: taskContent,
    userId: user.uid, // 👈 Attached automatically
    createdAt: new Date(),
    isComplete: false,
  });
};

// 2. Get Tasks (Automatically filters for THIS user)
export const getTripCard = async () => {
  const user = getUser();

  const q = query(
    collection(db, "tripCard"),
    where("userId", "==", user.uid), // 👈 Filter automatically
  );

  const snapshot = await getDocs(q);
  // Convert snapshot to simple array
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTripCard = async (taskId: string, updatedData: object) => {
  const taskRef = doc(db, "tripCard", taskId);

  await updateDoc(taskRef, updatedData);
};

// 4. Delete Task
export const deleteTripCard = async (taskId: string) => {
  const taskRef = doc(db, "tripCard", taskId);

  await deleteDoc(taskRef);
};

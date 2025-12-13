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
export const addTripRequest = async (taskContent: string) => {
  const user = getUser(); // Get the user automatically

  await addDoc(collection(db, "tripRequests"), {
    locations: taskContent,
    userID: user.uid, // 👈 Attached automatically
    activities: "",
    isComplete: false,
  });
};

// 2. Get Tasks (Automatically filters for THIS user)
export const getTripRequest = async () => {
  const user = getUser();

  const q = query(
    collection(db, "tripRequests"),
    where("userId", "==", user.uid), // 👈 Filter automatically
  );

  const snapshot = await getDocs(q);
  // Convert snapshot to simple array
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateTripRequest = async (
  taskId: string,
  updatedData: object,
) => {
  const taskRef = doc(db, "tripRequests", taskId);

  await updateDoc(taskRef, updatedData);
};

export const deleteTripRequest = async (taskId: string) => {
  const taskRef = doc(db, "tripRequests", taskId);

  await deleteDoc(taskRef);
};

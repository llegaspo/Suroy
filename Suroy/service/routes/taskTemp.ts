import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import getUser from "../authDB";

// --- DATABASE OPERATIONS ---

// 1. Add Task (Automatically adds the User ID)
export const addTaskToDB = async (taskContent: string) => {
  const user = getUser(); // Get the user automatically

  await addDoc(collection(db, "tasks"), {
    content: taskContent,
    userId: user.uid, // 👈 Attached automatically
    createdAt: new Date(),
    isComplete: false,
  });
};

// 2. Get Tasks (Automatically filters for THIS user)
export const getMyTasks = async () => {
  const user = getUser();

  const q = query(
    collection(db, "tasks"),
    where("userId", "==", user.uid), // 👈 Filter automatically
  );

  const snapshot = await getDocs(q);
  // Convert snapshot to simple array
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

import { auth } from "@/FirebaseConfig"; // Import auth ONCE here

// Helper to get user or throw error
export default function getUser() {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return user;
}

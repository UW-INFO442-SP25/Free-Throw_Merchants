import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig"; // your existing config

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const isBusiness = userData?.userType === "business";
  const isConsumer = userData?.userType === "consumer";


  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    setCurrentUser(user);

    if (user) {
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Error loading user data:", err);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    } else {
      setUserData(null);
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);


  const value = {
    currentUser,
    userData,
    loading,
    isBusiness,
    isConsumer 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebaseConfig";

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
          const snapshot = await get(ref(db, `users/${user.uid}`));
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.warn("User profile not found in Firebase");
            setUserData(null);
          }
        } catch (err) {
          console.error("Error loading user data from Firebase:", err);
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
    isBusiness,
    isConsumer,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}



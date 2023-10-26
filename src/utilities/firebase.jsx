import { useCallback, useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC3SHbiF6WUXL-YTyRCTvf9qSE2MXdPB9Q",
  authDomain: "reacttutorialscheduler.firebaseapp.com",
  databaseURL: 'https://reacttutorialscheduler-default-rtdb.firebaseio.com/',
  projectId: "reacttutorialscheduler",
  storageBucket: "reacttutorialscheduler.appspot.com",
  messagingSenderId: "213366435728",
  appId: "1:213366435728:web:6322402d3bd4879eb10d15",
  measurementId: "G-824EMS09WT"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

export const useDbData = (path) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, path);
    const unsubscribe = onValue(dataRef, (snapshot) => {
        const fetchedData = snapshot.val();
        setData(fetchedData);
    }, (error) => {
        setError(error);
    });
    return () => unsubscribe();
  }, [path]);

  return [data, error];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState(null);

  const updateData = useCallback((value) => {
    const dataRef = ref(database, path);
    update(dataRef, value)
        .then(() => setResult({ success: true }))
        .catch((error) => setResult({ success: false, error }));
  }, [path]);

  return [updateData, result];
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return { success: true, user };
  } catch (error) {
    return { success: false, error };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const useAuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export const AuthButtons = () => {
  const user = useAuthState();

  return (
    <div>
      { user 
        ? <button className="btn btn-outline-dark" onClick={signOutUser}>Sign Out</button> 
        : <button className="btn btn-outline-dark" onClick={signInWithGoogle}>Sign In with Google</button>
      }
    </div>
  );
};
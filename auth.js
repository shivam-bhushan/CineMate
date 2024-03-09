import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// Initialize Firebase app and get authentication instance
const auth = getAuth();

// Sign up a new user with email and password
const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // User signed up successfully
    const user = userCredential.user;
    console.log("User signed up:", user.uid);
    return user;
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

// Sign in a user with email and password
const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // User signed in successfully
    const user = userCredential.user;
    console.log("User signed in:", user.uid);
    return user;
  } catch (error) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

// Sign out the current user
const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
};

export { signUpWithEmailAndPassword, signInWithEmailAndPassword, signOutUser };

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithEmailAndPassword,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {displayName: displayName});
  await signOut(auth);  
}

async function doChangePassword(email, oldPassword, newPassword) {
  const auth = getAuth();
  let credential = EmailAuthProvider.credential(email, oldPassword);
  console.log(credential);
  await reauthenticateWithCredential(auth.currentUser, credential);

  await updatePassword(auth.currentUser, newPassword);
  await doSignOut();
}

async function doSignInWithEmailAndPassword(email, password) {
  let auth = getAuth();
  const user = await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem('user', JSON.stringify(user));
}

async function doSocialSignIn() {
  const auth = getAuth();
  const socialProvider = new GoogleAuthProvider();

  try {
    const user = await signInWithPopup(auth, socialProvider);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    alert(error.message);
  }
}


async function doPasswordReset(email) {
  let auth = getAuth();
  await sendPasswordResetEmail(auth, email);
}

async function doSignOut() {
  const auth = getAuth();
  // const navigate = useNavigate();
  try {
    await signOut(auth);
    window.localStorage.removeItem('user');
    alert("Sign-out successful");
    // navigate("/signin");
  } catch (error) {
    console.error('Error during sign-out:', error);
    throw error; // Re-throw the error to handle in the calling code
  }
}


export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doSignOut,
  doChangePassword
};

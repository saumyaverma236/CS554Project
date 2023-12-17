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

async function doCreateUserWithEmailAndPassword(email, password, displayName) {
  const auth = getAuth();
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {displayName: displayName});
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
  await signInWithEmailAndPassword(auth, email, password);
}

async function doSocialSignIn() {
  const auth = getAuth();
  const socialProvider = new GoogleAuthProvider();

  try {
    const { user } = await signInWithPopup(auth, socialProvider);
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
  let auth = getAuth();
  await signOut(auth);
}

export {
  doCreateUserWithEmailAndPassword,
  doSocialSignIn,
  doSignInWithEmailAndPassword,
  doPasswordReset,
  doSignOut,
  doChangePassword
};

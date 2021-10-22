import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  collection,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
<<<<<<< HEAD
}; 
=======
};
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export async function setUser(db, email, password) {
  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef, where('email', '==', email), where('password', '==', password));
  const querySnapshot = await getDocs(userQuery);
  if (querySnapshot.empty) {
      await addDoc(usersRef, {
        email,
        password
      });
  }
}

async function findOrAddUser(db, email, password) {
  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef, where('email', '==', email), where('password', '==', password));
  const querySnapshot = await getDocs(userQuery);
  let userRef = null;
  if (querySnapshot.empty) {
      userRef = await addDoc(usersRef, {
        email,
        password,
      });
  } else {
    const [userDoc] = querySnapshot.docs;
    userRef = userDoc.ref;
  }
  const userDocSnap = await getDoc(userRef);
  return {
    _id: userRef.id,
    ...userDocSnap.data()
  };
}

export async function signUserIn(db, email, password) {
  const user = await findOrAddUser(db, email, password);
  return user;
}

export async function addShowToFavorites(db, userId, showId) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    favorites: arrayUnion(showId)
  });
}

export async function getShowsLikes(db, showId) {
  const showRef = doc(db, 'shows', `${showId}`);
  const showSnap = await getDoc(showRef);

  if (showSnap.exists()) {
    return showSnap.data().likeQuantity;
  }
  
  const likeNumber = 0;
  await setDoc(showRef, {
    likeQuantity: likeNumber
  });
  return likeNumber;
}

export async function appendShowLikeQuantity(db, showId) {
  const showRef = doc(db, 'shows', `${showId}`);
  await updateDoc(showRef, {
    likeQuantity: increment(1)
  });
}

export async function setUserInfo(db, userInfo) {
  const userRef = doc(db, 'users', `${userInfo._id}`);
  await updateDoc(userRef, {
    email: userInfo.email,
    password: userInfo.password,
    age: userInfo.age,
    username: userInfo.username,
  });
}

export async function getPotentialFriends(db, usernameOrEmail) {
  const usersRef = collection(db, 'users');
  const potentialFriendsQuery1 = query(usersRef, where('email', '==', usernameOrEmail.trim()));
  const potentialFriendsQuery2 = query(usersRef, where('username', '==', usernameOrEmail.trim()));
  const querySnapshot1 = await getDocs(potentialFriendsQuery1);
  const querySnapshot2 = await getDocs(potentialFriendsQuery2);
<<<<<<< HEAD
  const result1 = querySnapshot1.docs.map(doc => {return {...doc.data(), _id: doc.id}});
  const result2 = querySnapshot2.docs.map(doc => {return {...doc.data(), _id: doc.id}});
=======
  const result1 = querySnapshot1.docs.map(doc => doc.data());
  const result2 = querySnapshot2.docs.map(doc => doc.data());
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
  const result = result1.concat(result2);
  return result;
}

export async function addFriend(db, userId, friendEmail) {
  const userRef = doc(db, 'users', `${userId}`);
  const userSnap = await getDoc(userRef);
  if (!userSnap.data().friends) {
    await setDoc(userRef, {
      friends: [friendEmail]
    }, 
    {
      merge: true
    });
    return;
  }
  await updateDoc(userRef, {
    friends: arrayUnion(friendEmail)
  });
  // adding user to friend's list of friends
  const usersRef = collection(db, 'users');
  const friendQuery = query(usersRef, where('email', '==', friendEmail));
  const querySnapshot = await getDocs(friendQuery);
  const friendRef = doc(db, 'users', querySnapshot.docs[0].id);
  if (querySnapshot.docs[0].data().friends) {
    await setDoc(friendRef, {
      friends: [userSnap.data().email]
    }, 
    {
      merge: true
    });
    return;
  }
  await updateDoc(friendRef, {
    friends: arrayUnion(userSnap.data().email)
  });
}

export async function deleteFriend(db, userId, userEmail, friendEmail) {
  const usersRef = collection(db, 'users');
  const friendQuery = query(usersRef, where('email', '==', friendEmail));
  const querySnapshot = await getDocs(friendQuery);
  const friendRef = doc(db, 'users', querySnapshot.docs[0].id);
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    friends: arrayRemove(friendEmail)
  });
  await updateDoc(friendRef, {
    friends: arrayRemove(userEmail)
  });
}

export async function getUsersFriends(db, userId) {
  const userRef = doc(db, 'users', `${userId}`);
  const userSnap = await getDoc(userRef);
  const usersRef = collection(db, 'users');
  const friendsDetails = [];
  const friendsList = userSnap.data().friends;
<<<<<<< HEAD
  if (!friendsList) {
    return [];
  }
=======
>>>>>>> a7dcf95201f76ca2ec863d00507fcde1bf155189
  for (let i = 0; i < friendsList.length; i+=10) {
    const userQuery = query(usersRef, where('email', 'in', friendsList.slice(i, i+10)));
    const friendData = await getDocs(userQuery);
    friendsDetails.push(...friendData.docs);
  }
  return friendsDetails.map(friendDoc => {
    return {...friendDoc.data(), _id: friendDoc.id}
  });
}

export async function getUserShows(db, id) {
  const userRef = doc(db, 'users', `${id}`);
  const userSnap = await getDoc(userRef);
  return userSnap.data().favorites || [];
}
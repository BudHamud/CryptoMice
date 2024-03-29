import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useUserContext } from "../context/UserContext";

const GetUser = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const { user, actu } = useUserContext();

  useEffect(() => {
    if (user.length != 0) {
      const db = getFirestore();
      const queryCollection = collection(db, "user");

      const queryCollectionFilter = query(
        queryCollection,
        where("userId", "==", user.uid)
      );

      getDocs(queryCollectionFilter)
        .then((resp) => {
          setUserData(resp.docs.map((e) => ({ id: e.id, ...e.data() })));
          //   setSaldo( resp.docs.map(e => (e.data().saldo) ) )
          //   setFecha( resp.docs.map(e => (e.data().fecha) ) )
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      setUserData([{chez: 0, chezGet: 0, fleets: []}])
    }
  }, [user, actu]);

  return [userData[0], loading, setUserData];
};

export default GetUser;

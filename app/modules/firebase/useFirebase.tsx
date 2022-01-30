import { Analytics, getAnalytics } from "@firebase/analytics";
import { FirebaseApp, initializeApp } from "@firebase/app";
import { collection, DocumentData, Firestore, getDocs, getFirestore, QuerySnapshot } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useLoaderData } from "remix"

const useFirebase = () => {
  const {firebaseConfig} = useLoaderData();

  const [app, setApp] = useState<FirebaseApp | null>(null);
  const [database, setDatabase] = useState<Firestore | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);
    const analytics = getAnalytics(app);

    setApp(app);
    setDatabase(database);
    setAnalytics(analytics);
  }, [])

  const getCollection = async (path: string) => {
    let result: QuerySnapshot<DocumentData> | null = null;
    
    if (database != null) {
      result = await getDocs(collection(database, path));
    }

    return result;
  }

  return {
    app,
    database,
    analytics,
    getCollection
  };
}

export default useFirebase;
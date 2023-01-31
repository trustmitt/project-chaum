import { useState, useEffect } from "react";

import { db } from "../firebase-config";
import { getDocs, query, collection, where } from "firebase/firestore";

import Initial from "../components/Initial";
import Main from "../components/Main";

function Home() {
    const [users, setUsers] = useState([]);

    const uid = localStorage.getItem("uid");
    const q = query(collection(db, "user"), where("id", "==", uid));

    useEffect(() => {
        const querySnapshot = async () => {
            const data = await getDocs(q);
            setUsers(
                data.docs.map((doc) => ({
                    ...doc.data(),
                    docId: doc.id,
                }))
            );
        };
        querySnapshot();
    }, [q]);

    return <>{users.length ? <Main /> : <Initial />}</>;
}

export default Home;

import HeaderBar from "../components/HeaderBar";
import TabMenu from "../components/TabMenu";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: any) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(uid);
            console.log(user);
            // ...
        } else {
            // User is signed out
            // ...
        }
    });
    return (
        <>
            <HeaderBar />
            <TabMenu />
        </>
    );
}

export default Home;

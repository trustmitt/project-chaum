import { useCallback, useState } from "react";

import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import "../styles/style.css";

function ModalWrite(props: any) {
    let [showModal, setShowModal] = [props.showModal, props.setShowModal];

    const [feedDesc, setFeedDesc] = useState("");
    const feedCollectionRef = collection(db, "feed");

    const openScroll = useCallback(() => {}, []);

    const closeModal = () => {
        openScroll();
        setShowModal(false);
    };

    const createAt = new Date().toLocaleString();
    const uid = localStorage.getItem("uid");

    const createFeeds = async () => {
        await addDoc(feedCollectionRef, { desc: feedDesc, createAt: createAt, id: uid, name: "주경" });
        window.location.reload();
        openScroll();
        setShowModal(false);
    };

    // const realUpload = document.querySelector(".upload-btn") as HTMLInputElement;
    // const upload = document.querySelector("#choose-file") as HTMLInputElement;
    // upload?.addEventListener("click", () => realUpload?.click());

    return (
        <div className="Modal" onClick={closeModal}>
            <div className="write-modalBody" onClick={(e) => e.stopPropagation()}>
                <button id="write-modalCloseBtn" onClick={closeModal}>
                    ✖
                </button>
                <div className="write-area">
                    {/* <input
                        type="file"
                        accept="image/*"
                        id="choose-file"
                        onChange={(e) => {
                            setImageUpload(e.target.value);
                        }}
                    /> */}
                    <textarea defaultValue="오늘 있었던 일을 기록해 보세요" onChange={(e) => setFeedDesc(e.target.value)} />
                    <button className="write-result-btn" onClick={createFeeds}>
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalWrite;

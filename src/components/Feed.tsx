import { useState, useEffect, useCallback } from "react";

import { collection, query, getDocs, doc, orderBy, deleteDoc, where } from "firebase/firestore";
import { db } from "../firebase-config";

import { FeedTypeInfo } from "../type/types";

import ModalWrite from "./ModalWrite";

import logoImg from "../assets/img/main-img.png";
import "../styles/style.css";

const Feed = () => {
    let [showModal, setShowModal] = useState(false);
    const [timeline, setTimeline] = useState<FeedTypeInfo[]>([]);

    // 모달
    const lockScroll: any = useCallback(() => {
        document.body.style.overflow = "hidden";
    }, []);

    const openModal = () => {
        lockScroll();
        setShowModal(true);
    };

    useEffect(() => {
        const feedCollectionRef = collection(db, "feed");

        const getFeeds = async () => {
            const feedQ = await query(feedCollectionRef, orderBy("createAt", "desc"));
            const feedData = await getDocs(feedQ);
            setTimeline(
                feedData.docs.map((doc) => ({
                    ...doc.data(),
                    docId: doc.id,
                }))
            );
        };
        getFeeds();
    }, []);

    // 피드 컴포넌트
    const deleteFeeds = async (id: any) => {
        alert("삭제하시겠습니까?");
        await deleteDoc(doc(db, "feed", id));
        window.location.reload();
    };

    const showFeeds = timeline.map((value) => {
        return (
            <div className="feed-container" key={value.docId}>
                <div className="feed-header">
                    <div className="feed-header-left">
                        <img className="feed-header-img" src={logoImg} alt="profile" />
                        <p>{value.name}</p>
                    </div>
                    <div className="feed-header-right">
                        {localStorage.getItem("uid") === value.id ? (
                            <div className="feed-right-menu">
                                <button
                                    className="feed-remove"
                                    onClick={() => {
                                        deleteFeeds(value.docId);
                                    }}
                                >
                                    ✖
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="feed-writer-area">
                    <span className="feed-writer-comment">{value.desc}</span>
                    <span className="feed-create-at">{value.createAt}</span>
                </div>
                <div className="feed-footer">
                    <div></div>
                </div>
            </div>
        );
    });

    // 검색 기능
    const searchWriter = async () => {
        const feedCollectionRef = collection(db, "feed");
        const searchInputValue = (document.querySelector(".search-container input") as HTMLInputElement).value;
        const searchQ = query(feedCollectionRef, where("desc", ">=", searchInputValue));
        const data = await getDocs(searchQ);
        setTimeline(
            data.docs.map((doc) => ({
                ...doc.data(),
                docId: doc.id,
            }))
        );
    };

    return (
        <>
            <div className="feed-wrap">
                <div className="feed-sticky-area">
                    <div className="search-container">
                        <input type="text" placeholder="검색어를 입력하세요" />
                        <button onClick={searchWriter}>검색</button>
                    </div>
                    <div className="write-container">
                        <button className="write-btn" onClick={openModal}>
                            Write
                        </button>
                    </div>
                </div>
                {showFeeds}
            </div>
            {showModal && <ModalWrite setShowModal={setShowModal} />}
        </>
    );
};

export default Feed;

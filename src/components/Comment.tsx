import { useState, useEffect } from "react";

import { collection, getDocs, addDoc, doc, deleteDoc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase-config";

import { CommentTypeInfo } from "../type/types";

import "../styles/style.css";

const Comment = () => {
    const [commentValue, setCommentValue] = useState("");
    const [comments, setComment] = useState<CommentTypeInfo[]>([]);

    const commentCollectionRef = collection(db, "comment");

    useEffect(() => {
        const getComments = async () => {
            const q = await query(commentCollectionRef, orderBy("createAt", "desc"));
            const data = await getDocs(q);
            setComment(
                data.docs.map((doc) => ({
                    ...doc.data(),
                    commentId: doc.id,
                }))
            );
        };
        getComments();
    }, []);

    const createAt = new Date().toLocaleString();
    const uid = localStorage.getItem("uid");

    const createComments = async () => {
        if (commentValue !== "") {
            await addDoc(commentCollectionRef, { text: commentValue, createAt: createAt, name: "주경", id: uid });
            window.location.reload();
        } else {
            alert("내용을 입력해 주세요.");
        }
    };

    const deleteComments = async (id: any) => {
        alert("댓글을 삭제하시겠습니까?");
        await deleteDoc(doc(db, "comment", id));
        window.location.reload();
    };

    const showComments = comments.map((value) => (
        <div className="comment-container" key={value.commentId}>
            <div className="comment-area">
                <span className="comment-name">{value.name}</span>
                <span className="comment-text">{value.text}</span>
            </div>
            {uid === value.id ? (
                <div className="comment-set">
                    <button
                        className="comment-remove"
                        onClick={() => {
                            deleteComments(value.commentId);
                        }}
                    >
                        ✖
                    </button>
                </div>
            ) : null}
        </div>
    ));

    return (
        <>
            {showComments}
            <div className="comment-form">
                <input type="text" placeholder="댓글을 입력하세요" onChange={(e) => setCommentValue(e.target.value)} />
                <button onClick={createComments}>확인</button>
            </div>
        </>
    );
};

export default Comment;

import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";

function Post({ postId, user, username, caption, ImageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([""]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => ({ PostComments: doc.data() }))
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      user: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="posts">
      <div class="posts__header">
        <Avatar className="posts__avatar" alt={username} src="" />

        <h3>{username}</h3>
      </div>
      {/*header =username+location */}

      <img className="posts__image" src={ImageUrl} alt="RecatImage" />
      {/*image*/}
      <h4 className="posts__text">
        <strong>{username}</strong>: {caption}
      </h4>
      {/*captoin*/}
      <div className="post-comments">
        {comments.map((comment, i = 0) => (
          <p key={i++}>
            <strong>{comment.PostComments?.user}</strong>
            {comment.PostComments?.text}
          </p>
        ))}
      </div>
      <form class="post__commentbox">
        <input
          className="post-input"
          type="texrt"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post-button"
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;

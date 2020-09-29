import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";

function Post({ username, caption, ImageUrl, postId }) {
  const [commnets, setComments] = useState([]);
  const [comment, setComment] = useState([""]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(
            snapshot.docs.map((doc) => {
              doc.data();
            })
          );
        });
    }

    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postCopmment = (event) => {
    event.preventDefault();
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
      <form class="post__commentbox">
        <input
          className="post-input"
          type="texrt"
          placeholder="Add a comment..."
          onChnage={(e) => setComment(e.target.value)}
        />
        <button
          className="post-button"
          disabled={!comment}
          type="submit"
          onClick={postCopmment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;

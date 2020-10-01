import React, { useState } from "react";
import { Button, Paper, makeStyles } from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from "firebase";
import "./imageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        //error Function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            //post image in Db
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginLeft: theme.spacing(5),
        margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(16),
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className="">
      <div className={classes.root}>
        <Paper elevation={3}>
          <progress
            className="imageupload-progress"
            value={progress}
            max="100"
          />
          <input
            type="text"
            placeholder="Enter Caption..."
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          ></input>
          <input type="file" onChange={handleChange}></input>
          <Button className="image-upload-button" onClick={handleUpload}>
            Upload
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default ImageUpload;

import React, { useState, useEffect, Fragment } from "react";
import logo from "./logo.svg";
import "./App.css";
import Post from "./Post.js";
import { db, auth } from "./firebase";
import { Modal, makeStyles, Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";
import UserprofileAvatarHeader from "./UserprofileAvatarHeader";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [openImageUpload, setOpenImageUpload] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser);
      } else {
        //userlogged out
        setUser(null);
      }
    });

    return () => {
      //perfrom  clean up actions
      unsubscribe();
    };
  }, [user, username]);
  // UseEffect --> Runs a piece of code on a specific condition
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //every time a new post is added ,this code fires
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({ displayName: username });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <div class="app__header">
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app-signup">
              <center>
                <img
                  alt="Instagram"
                  className=""
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                />
              </center>
              <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signUp}>Sign Up</Button>
            </form>
          </div>
        </Modal>

        <Modal
          open={openSignIn}
          onClose={() => setOpenSignIn(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <form className="app-signup">
              <center>
                <img
                  alt="Instagram"
                  className=""
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                />
              </center>

              <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={signIn}>Sign In</Button>
            </form>
          </div>
        </Modal>

        <Modal
          open={openImageUpload}
          onClose={() => setOpenImageUpload(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            {user ? (
              user.displayName ? (
                <ImageUpload username={user?.displayName} />
              ) : (
                <ImageUpload username={username} />
              )
            ) : (
              <h2>Sorry You need to log in to Upload</h2>
            )}
          </div>
        </Modal>

        <img
          alt="Instagram"
          className="app__headerimage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />

        {user ? (
          <div className="app-loggedincontainer">
            {user && user.displayName ? (
              <UserprofileAvatarHeader Currentuser={user.displayName} />
            ) : (
              user && <UserprofileAvatarHeader Currentuser={username} />
            )}
            <Button onClick={() => setOpenImageUpload(true)}>Upload</Button>
            <Button onClick={() => auth.signOut()}>Log out</Button>
          </div>
        ) : (
          <div className="app-logincontainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>

            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}
      </div>
      <div className="app-posts">
        <div className="app-posts-left">
          {posts.map(({ id, post }) => (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post?.username}
              caption={post?.caption}
              ImageUrl={post?.imageUrl}
            />
          ))}
        </div>
        <div className="app-posts-right">
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
      {user ? (
        user.displayName ? (
          <ImageUpload username={user?.displayName} />
        ) : (
          <ImageUpload username={username} />
        )
      ) : (
        <h2 className="app-impageupload-msg">
          Sorry , You need to log in to Upload
        </h2>
      )}
    </div>
  );
}

export default App;

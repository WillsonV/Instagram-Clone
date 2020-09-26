import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './Post.js'

function App() {

  const [posts,setPosts]=useState([
  {username:"CleverSvenin",
   caption:"We won !Yayay",
   ImageUrl:"https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
  },
   {
    username:"Sterlin",
    caption:"Keep hitting",
    ImageUrl:"https://images.unsplash.com/photo-1474553655868-3a63d59db452?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60"
    
   },
   {
    username :"Chelsi",
    caption : "Set your goals High and focus on that",
    ImageUrl:"https://images.unsplash.com/photo-1508264165352-258db2ebd59b?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
    
   }

  ]);

  return (

    <div className="app"> 
        
      <div class="app__header">
        <img 
          alt="Instagram" 
          className="app__headerimage" 
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
        />

      </div>

    { posts.map(post => (
       <Post username={post.username} caption={post.caption} ImageUrl={post.ImageUrl} />
     ))
    }

    </div>
  );
}

export default App;

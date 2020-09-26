import React from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"


function Post({username,caption,ImageUrl})
{
return (
<div className="posts" >
<div class="posts__header">
    <Avatar
     className="posts__avatar"
     alt='willson'
     src="dhgf/gjhg"

    />
 
<h3>{username}</h3>

 </div>  
  {/*header =username+location */}
   
   <img 
   className="posts__image"
   src={ImageUrl}
   alt="RecatImage"
   />
   {/*image*/}
<h4  className="posts__text"><strong>{username}</strong>: {caption}</h4>
   {/*captoin*/ }

  </div>

    




);

}

export default Post;
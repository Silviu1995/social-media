import './post.css'
import {MoreVert} from '@material-ui/icons'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
export default function Post({post}) {

  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const {user: currentUser} = useContext(AuthContext)
  const PF = 'http://localhost:8800/images/'
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])
  const likeHandler = () => {
    try {
      axios.put(`http://localhost:8800/posts/${post._id}/like`,{userId: currentUser._id})
    } catch (err) {}
    setLike(isLiked? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  useEffect(  () => {
    const fetchUser = async () =>{
      const res = await axios.get(`http://localhost:8800/users?userId=${post.userId}`)
      setUser(res.data)
    }
    fetchUser()
  },[post])
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
              <img 
                src={user.profilePicture ? PF+user.profilePicture : PF+'person/noAvatar.png'} 
                alt="" className="postProfileImg"  />
              </Link>
              <span className="postUsername">
                  {user.username}
                  </span>
                <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
                <MoreVert/>
            </div>
        </div>
        <div className="postCenter">
            <span className="postText">{post?.description}</span>
            <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
            <div className="postBottomLeft">
                <img src="/assets/like.png" alt="" className="likeIcon" onClick={likeHandler}/>
                <img src="/assets/heart.png" alt="" className="likeIcon" onClick={likeHandler}/>
                <span className="postLikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
            </div>
        </div>
      </div>
    </div>
    
  )
}

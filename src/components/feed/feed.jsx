import './feed.css'
import Share from '../share/share'
import Post from '../post/post'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


export default function Feed({username}) {

  const [posts,setPosts] = useState([])
  const {user} = useContext(AuthContext)
  useEffect(  () => {
    const fetchPosts = async () =>{
      const res = username 
        ? await axios.get(`http://localhost:8800/posts/profile/${username}`)
        : await axios.get("http://localhost:8800/posts/timeline/" + user._id)
      setPosts(res.data.sort((post1,post2) => {
        return new Date(post2.createdAt) - new Date(post1.createdAt)
      }))
    }
    fetchPosts()
  },[username, user._id])

  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share/>}
        {posts.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}

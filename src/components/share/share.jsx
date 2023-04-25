import './share.css'
import {Cancel, EmojiEmotions, Label, PermMedia, Room} from '@material-ui/icons'
import { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {
  const{user} = useContext(AuthContext)
  const PF = 'http://localhost:8800/images/'
  const description = useRef()
  const [file,setFile] = useState(null)
  const submitHandler = async (event) => {
    event.preventDefault()
    const newPost = {
      userId: user._id,
      description: description.current.value
    }
    if(file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append("name", fileName)
      data.append("file", file)
      newPost.img = fileName
      try {
        await axios.post('http://localhost:8800/upload', data)
      } catch(err) { console.log(err) }
    }
    try {
      await axios.post('http://localhost:8800/posts', newPost)
      window.location.reload()

    } catch(err) {console.log(err)}
  }
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img src={user.profilePicture ? PF+user.profilePicture : PF+'person/noAvatar.png'} alt="" className="shareProfileImg" />
            <input 
            placeholder={"What's in your mind "+ user.username + " ?" }
            type="text" className="shareInput" 
            ref={description}
            />
        </div>
        <hr className="shareHr" /> 
        {
          file && (
            <div className="shareImgContainer">
              <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
              <Cancel className='shareCancel' onClick={()=>setFile(null)}/>
            </div>
          )}
        <form className="shareBottom" onSubmit={submitHandler}>
        <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
                <PermMedia htmlColor='tomato' className='shareIcon'/>
                <span className="shareOptionText">Photo or Video</span>
                <input style={{display:'none'}} type="file" id='file' 
                accept='.png, .jpg, .jpeg' onChange={(e)=> setFile(e.target.files[0 ])}/>
            </label>
            <div className="shareOption">
                <Label htmlColor='blue' className='shareIcon'/>
                <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
                <Room htmlColor='green' className='shareIcon'/>
                <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
                <EmojiEmotions htmlColor='pink' className='shareIcon'/>
                <span className="shareOptionText">Feelings</span>
            </div>
            
         </div>
         <button className="shareButton" type='submit'>Share</button>
        </form>
      </div>
    </div>
  )
}

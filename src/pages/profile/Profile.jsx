import './Profile.css'
import Topbar from '../../components/topbar/topbar'
import Sidebar from '../../components/sidebar/sidebar'
import Feed from '../../components/feed/feed'
import Rightbar from '../../components/rightbar/rightbar'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
const Profile = () => {
    const [user,setUser] = useState({})
    const username = useParams().username
    const PF = 'http://localhost:8800/images/'
    useEffect(  () => {
        const fetchUser = async () =>{
          const res = await axios.get(`http://localhost:8800/users?username=${username}`)
          setUser(res.data)
         
        }
        fetchUser()
      },[username])
  return (
    <>
    <Topbar/>
    <div className="profile">
        <Sidebar/>
        <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={user.coverPicture || "/assets/person/noCover.jpg"} alt="" className="profileCoverImg" />
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+'person/noAvatar.png'} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.description}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Profile

import './messenger.css'
import Topbar from '../../components/topbar/topbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import {TextareaAutosize, TextField} from '@material-ui/core'
import ChatOnline from '../../components/chatOnline/ChatOnline'

const Messenger = () => {
  return (
    <>
    <Topbar/>
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder='Search for friends' type="text" className="chatMenuInput" />
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message/>
                    <Message own/>
                    <Message/>
                    <Message own/>
                    <Message own/>
                    <Message />
                    <Message own/>
                    <Message />
                    <Message own/>
                    <Message />
                    <Message own/>
                    <Message />
                    <Message own/>
                    <Message />
                    <Message own/>
                </div>
                <div className="chatBoxBottom">
                <textarea className="chatMessageInput" placeholder="write something ..."></textarea>
                {/* <TextField placeholder="write something ..." className="chatMessageInput" id="outlined-basic"  variant="outlined"  /> */}
                    {/* <texarea rows="4" cols="50" placeholder="write something ..." className="chatMessageInput"></texarea> */}
                    <button className="chatSubmitButton">Send</button>
                </div>
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                 <ChatOnline/>
            </div>
        </div>
    </div>  
    </>
    
  )
}

export default Messenger

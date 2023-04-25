import './message.css'

const Message = ({own}) => {
    return(
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
            <img src="https://variety.com/wp-content/uploads/2022/06/Screen-Shot-2022-06-22-at-10.08.26-AM.png?w=1024" alt="" className="messageImg" />
            <p className='messageText'> Hello now</p>
            </div>
            <div className="messageBottom">1 hour ago </div>
        </div>
    )
}
export default Message
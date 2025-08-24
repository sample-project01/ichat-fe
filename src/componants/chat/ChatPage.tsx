
import { useState, useEffect, useRef } from "react"
import {useNavigate, useParams, useSearchParams } from "react-router-dom"

type Message = {
  text: String,
  type: "server" | "user",
  userName:string
}
const ChatPage = () => {
  const [userMessage, setUserMessage] = useState("")
  const [membersName,setMembersName]=useState<string[]|null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<Message[]>([])
  const socketref = useRef<WebSocket | null>(null)


  const [params] = useSearchParams()
  const navigate = useNavigate()


  const paramUserName = params.get("userName")
  const paramType = params.get("type")
  
  
  
  
  const url=import.meta.env.VITE_BACKEND_URL

  const slug= useParams()

  // console.log("mein aaya kya"+params1.slug) 
  
  /// CHECK WHY ALERT IS NOT WORKING
  
  
  // useEffect(() => {

  //   // setRoomId(Number(paramRoomId!))
  //   // setRoomId(Number(params.get("roomId")!))

  //   socketref.current= new WebSocket(`ws://localhost:${PORT}`)
    
  //   socketref.current.onopen=()=>{
  //     setLoading(false)
      
  //       socketref.current?.send(JSON.stringify({
  //         type:paramType,
  //         roomId:roomId
  //       }))
  //     }

  //     socketref.current.onmessage=(e)=>{
  //       const data = JSON.parse(e.data)
  //       showAlert(e.data)
  //       setMessages((p)=>[...p,{
  //         text:data.payload,
  //         type:"server"
  //       }])
  //     }

  //     socketref.current.onclose=()=>{
  //       alert("Disconnected")
  //       // setLoading(false)

  //     }

  //   return () => {
  //    leaveRoom()
  //   }
  // },[])

  useEffect(()=>{
    setLoading(true)
      socketref.current= new WebSocket(`${url}`)


      socketref.current.onopen=()=>{
        setLoading(false)
        sendMessage({type:`${paramType}`,
          payload:{
            roomId:Number(slug.slug),
            userName:paramUserName!
          }})
      }

      socketref.current.onmessage=(msg:any)=>{
        console.log(msg)
        let data = JSON.parse(msg.data)

        switch (data.type) {
          case "success":
            successHandler(data.payload)
            break;

          case "message":
            messageHandler(data.payload)
            break;

          case "error":
            errorHandler(data.payload)
            break;

          case "memberList":
            memberListHandler(data.payload)
            break;

        
          default:
            break;
        }

      function successHandler(data:any){
        alert(data.msg)

      }
      function errorHandler(data:any){
        alert(data.msg)

      }

      function messageHandler(data:any){
        setMessages((prev)=>[...prev,{text:data.text,type:"server",userName:data.senderName}])

      }

      function memberListHandler(data:any){
        // console.log("memebbr lsit   ..................."+data.payload)
        setMembersName(data.allMembers)
      }
        


      }


  },[])



  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);





  function sendMessage(msg: {
    type:string
    payload: {
      roomId:number,
      userName?:string,
      text?:string
    }

  }) {
    if (socketref.current && socketref.current.readyState === WebSocket.OPEN) {

      socketref.current?.send(JSON.stringify(msg))
    }
  } 


  async function handleClick() {
      setMessages((prev)=>[...prev,{text:userMessage,type:"user",userName:paramUserName!}])
      sendMessage({type:"message",payload:{roomId:Number(slug.slug),text:userMessage}})
      setUserMessage("")
  }


  const messageBoxRef = useRef<HTMLDivElement>(null);


  
  function leaveRoom(){
    socketref.current?.close()
    navigate("/")
  }


  if (loading) {
    return <div className="flex  flex-1 items-center justify-center text-4xl text-blue-900 font-semibolds ">Loading..</div>
  }

  return (
    <div className="bg-gray-200 shadow-2xl flex-1 relative rounded-xl ">
      {/* <div>hello</div> */}
      <div className="h-[75vh] overflow-y-auto hide-scrollbar border-b border-gray-300" ref={messageBoxRef}>
        <div className=" flex flex-col mt-1 ">

          {
            messages.map((msg, index) => (

              <div key={index} className={`max-w-[70%]  mt-1 mx-2 text-sm whitespace-pre-wrap break-words flex gap-0.5
                       ${msg.type === "user"
                  ? " self-start text-left flex-row-reverse"
                  : " self-end text-left"
                }`}>
                <p className="bg-gradient-to-r from-green-400 to-green-300  rounded-full  px-2 ">{msg.text}</p>
                <p className="text-red-400 text-xs font-medium">{msg.type === "server" ? `${msg.userName}` : `${paramUserName}~`}</p>
              </div>

            ))
          }
        </div>
      </div>


      <div className="flex absolute flex-col bottom-2">

        <div className="relative left-9  flex gap-15 justify-between items-center ">
          <div className="flex gap-3">
            <button className="px-6 py-1 rounded-md bg-red-600 cursor-pointer hover:bg-red-700 text-white" onClick={leaveRoom}>Leave</button>

            <input className="w-full py-2 px-4 outline outline-green-500 rounded-full" type="text" name="userMessage" id="" value={userMessage} onChange={(e) => setUserMessage(e.target.value)} placeholder="Enter message" />
            <button className="px-6 py-1 rounded-md bg-green-600 cursor-pointer hover:bg-green-700 text-white" onClick={handleClick}>Send</button>
          </div>
          <div className="text-sm font-semibold text-red-700 flex gap-2">
            <div>Room ID:{slug.slug}</div>
            <div>Total Members:{membersName?.length}</div>

          </div>
        </div>

        <div className=" ml-3 text-sm font-semibold  text-blue-900 flex gap-2 items-center ">
          Member`s Name:{membersName && membersName.map((user,idx)=>(
            <div key={idx} className="text-xs font-normal">
             {idx+1}.{user}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default ChatPage
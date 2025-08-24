
import { useState } from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Body = () => {
  const [roomId,setRoomId]= useState("")
  const [userName,setUserName]= useState("")
  const navigate= useNavigate()



  function joinRoomHandler(){
    if(!userName || !roomId){
      return alert("pls enter User Name and Room Id both")
    }
    navigate(`/chat/${roomId}?userName=${userName}&&type=join`)


  }
  function createRoomHandler(){
    if(!userName || !roomId){
      return alert("pls enter User Name and Room Id both")
    }
     navigate(`/chat/${roomId}?userName=${userName}&&type=create`)


  }
  return (
    <div className='flex-1 flex flex-col items-center justify-center shadow-2xl  bg-gray-200 rounded-md'>
        <div className='text-4xl font-medium drop-shadow-2xl absolute top-24 '>
          <div>
            Welcome to iChat
          </div>
          <p className='text-xs text-gray-400 font-normal'>A place where you can connect to your loved once</p>
          </div>

        <div>
            <input type="text" name="userName" id="" placeholder='Enter Your User Name' value={userName} onChange={(e)=>setUserName(e.target.value)} className='border border-blue-500 px-2.5 py-1.5 rounded-md outline-none w-full mb-1.5' />
          <div className='flex gap-2.5'>
            <input type="text" name="roomId" id="" placeholder='Enter Room Id' value={roomId} onChange={(e)=>setRoomId(e.target.value)} className='border border-blue-500 px-2.5 py-1.5 rounded-md outline-none' />
            <Button onClick={joinRoomHandler}>Join a room</Button>
          </div>
          <div className='mt-7'>

            <Button onClick={createRoomHandler}  customClasses={"w-full"}>Create a room</Button>
          </div>
        </div>
    </div>
  )
}

export default Body
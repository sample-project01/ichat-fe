import  { useState } from 'react'


const Navbar = () => {
    const[links]=useState([
        {
        name:"Home",
        href:"/"
        },
        {
        name:"About me",
        href:"/about"
        },
        {
        name:"Contact me",
        href:"/contact"
        },

])
  return (
    <div className='flex justify-between pb-3 items-center h-16  shadow-2xl rounded-xl border-b-gray-400'>
        <div className='text-2xl cursor-pointer font-medium ml-2 rounded-md'>iChat</div>
        <div className='flex justify-between gap-5'>
            {
                links.map((link,index)=>(
                    <button key={index} className='hover:text-gray-700 cursor-pointer'>{link.name}</button>
                ))
            }
            <div className='flex gap-2'>
{/* 
            <Button>Signin</Button>
            <Button>Signup</Button> */}
            </div>
        </div>
    </div>
  )
}

export default Navbar   
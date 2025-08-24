
import './App.css'
import Template from './componants/Template'
import Navbar from './componants/Navbar'
import Body from './componants/Body'
import ChatPage from './componants/chat/ChatPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  


  return (
    <>
    <div className='flex flex-col bg-gradient-to-t from-blue-500 via-blue-200 to-gray-300'>
      <BrowserRouter>
      <Template>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Body/>}></Route>
          <Route path='/chat/:slug' element={<ChatPage/>}></Route>
        </Routes>
      </Template>
      </BrowserRouter>

    </div>

    </>
  )
}

export default App

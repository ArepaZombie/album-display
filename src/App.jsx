import { useState, useEffect } from 'react'
import './App.css'

//Modulos
import Login from './modules/Login'
import Display from './modules/Display'

function App() {
  const [token,setToken]=useState('')

  useEffect(()=>{
    const hash = window.location.hash
    let token = window.localStorage.getItem('token');

    if(!token && hash){
      token = hash.substring(1).split('&').find(e=>e.startsWith("access_token")).split('=')[1]
      window.location.hash=""
      window.localStorage.setItem('token',token)
    }
    setToken(token)
  },[])


  return(
  <div id='app'>
    {!token?
      <Login/>:
      <Display setToken={()=>setToken()} token={token}/>
    }
  </div>
  )
}

export default App;

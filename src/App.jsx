import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


//Modulos
import Login from './modules/Login'
import Display from './modules/Display'

function App() {
  const [token,setToken]=useState(window.localStorage.getItem('token'))

  useEffect(()=>{
    const hash = window.location.hash
    let token = window.localStorage.getItem('token');

    if(!token && hash){
      token = hash.substring(1).split('&').find(e=>e.startsWith("access_token")).split('=')[1]
      window.location.hash=""
      window.localStorage.setItem('token',token)
      const hora = new Date
      window.localStorage.setItem('hora',hora.getHours()+':'+hora.getMinutes())
    }
    setToken(token)
  },[])

    //Para refrescar el token
    useEffect(()=>{
      try{
      const hora_vencimiento = window.localStorage.getItem('hora').split(':')
      const date = new Date;
      const hora_actual = date.getHours()
      const minuto_actual = date.getMinutes()
      console.log(hora_vencimiento+'---'+hora_actual+':'+minuto_actual)
      if(hora_vencimiento[0]<hora_actual&&hora_vencimiento[1]<minuto_actual){
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('hora')
        setToken('')
      }}
      catch{
        console.log('Re-log')
      }
    },[])



  return(
  <div id='app'>
    {!token?
      <Login/>:
      <Display setToken={()=>setToken()} token={token}/>
    }
    <footer>
      <p>Made by <a 
      href='https://github.com/ArepaZombie'
      rel='noopener noreferer'
      target='_blank'>ArepaZombie</a></p>
    </footer>
  </div>
  )
}

export default App;

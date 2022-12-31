import { useEffect, useState } from "react";

import AlbumDisplay from "./AlbumDisplay";
import Ventana from "./search/Ventana";

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

function Display({setToken,token}){
  const [showWindow, setShowWindow] = useState(false)
  const [displayAlbums, setDisplayAlbums] = useState([])
  
  useEffect(()=>{
    const albums = window.localStorage.getObj('albums')
    if(albums.length>0) setDisplayAlbums(albums)
  },[])

  const logOut = () =>{
    window.localStorage.removeItem('token')
    setToken('')
  }

  const renderAlbums = () =>{
    return displayAlbums.map(a=><AlbumDisplay 
      eliminarAlbum={()=>eliminarAlbum(a.id)}
      key={a.id}
      id={a.id} 
      nombre={a.name} 
      artista={a.artista}
      año={a.año}
      imagen={a.imagen}
      tipo={a.tipo}
      uri={'https://open.spotify.com/album/'+a.id}/>
      )
  }

  const addAlbum = (a) =>{
    console.log(a)
    let temp = displayAlbums.slice()
    temp.push(a)
    setDisplayAlbums(temp)
    window.localStorage.setObj('albums',temp)
  }

  const eliminarAlbum = (id)=>{
    const temp = displayAlbums.filter(a=>a.id!==id)
    setDisplayAlbums(temp)
    window.localStorage.setObj('albums',temp)
  }

  const cleanAlbums = () =>{
    setDisplayAlbums([])
    window.localStorage.removeItem('album')
  }

  return(
    <div id="display">
      <p onClick={logOut}>Logueado!</p>
      <p onClick={cleanAlbums}>Limpiar biblioteca</p>
      <p onClick={()=>setShowWindow(true)}>Agregar album</p>
      {displayAlbums.length>0 ? renderAlbums():<p>No hay albumes guardados :(</p>}
      {showWindow && <Ventana 
      token={token}
      close={()=>setShowWindow(false)}
      addAlbum={(a)=>addAlbum(a)}/>
      }
    </div>
  )
}

export default Display;
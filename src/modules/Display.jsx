import { useEffect, useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {motion} from 'framer-motion'

import AllDisplay from "./all_displays/AllDisplays";
import OneDisplay from "./one_displays/OneDisplay";
import Ventana from "./search/Ventana";

import './Display.css'


Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

function Display({setToken,token}){
  const [showWindow, setShowWindow] = useState(false)
  const [displayAlbums, setDisplayAlbums] = useState([])
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const [showOne, setShowOne] = useState(true)

  useEffect(()=>{
    const albums = window.localStorage.getObj('albums')
    if(albums.length>0) setDisplayAlbums(albums)
  },[])

  const logOut = () =>{
    window.localStorage.removeItem('token')
    setShowOffCanvas(false)
    setToken('')
  }

  const addAlbum = (a) =>{
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
    setShowOffCanvas(false)
    window.localStorage.setObj('albums',[])
  }

  return(
    <div id="display">
      <nav>
        <p id='sub-menu' onClick={()=>setShowOffCanvas(true)}>
          <FontAwesomeIcon icon={faBars}/>
        </p>
        <p>Album Display</p>
        <motion.p 
        whileHover={{
          rotate:360,
          scale:1.5,
          transition:{duration:0.3}}}>
          <FontAwesomeIcon icon={faCirclePlus} id="agregar" onClick={()=>setShowWindow(true)}/>
        </motion.p>
      </nav>

      <Offcanvas show={showOffCanvas} placement='start' onHide={()=>setShowOffCanvas(false)}>
        <Offcanvas.Header closeButton closeLabel='X'>
          <Offcanvas.Title>Opciones</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p className="off-canvas" id="logout" onClick={logOut}>Log out</p>
          <p className="off-canvas" id="limpiar" onClick={cleanAlbums}>Limpiar biblioteca</p>
        </Offcanvas.Body>
      </Offcanvas>

      {displayAlbums.length>0? showOne?
      <OneDisplay 
        albums={Array.from(displayAlbums)}
        eliminarAlbum={eliminarAlbum}
        changeView={()=>setShowOne(false)}
        token={token}
        closeWindow={()=>setShowWindow(false)}
        addAlbum={(a)=>addAlbum(a)}
        />
      :
      <AllDisplay 
        albums={Array.from(displayAlbums)} 
        eliminarAlbum={eliminarAlbum}
        changeView={()=>setShowOne(true)}
        token={token}
        closeWindow={()=>setShowWindow(false)}
        addAlbum={(a)=>addAlbum(a)}
        />
        :
        <p id="sin-album">No hay albumes guardados :(</p>
      }

      {showWindow && <Ventana 
      token={token}
      close={()=>setShowWindow(false)}
      addAlbum={(a)=>addAlbum(a)}
      searchid={false}/>
    }

    
    </div>
  )
}

export default Display;
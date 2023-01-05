import { useState, useEffect } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

import AlbumSearch from "./AlbumSearch";
import './Ventana.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function camelCase(a){
  return a.slice(0,1).toUpperCase()+a.slice(1)
}

function Ventana({token,close,addAlbum,searchid}){
  const [albums,setAlbums] = useState([])
  const [nextLinks, setNextLinks] = useState([])
  const [search,setSearch] = useState('')

  //Funcion de efecto visual
  const closeInfo = ()=>{
    const content = document.getElementById('producto-content')
    content.style.transform = 'translateY(20px)'
    content.style.opacity = '0'
    content.style.transition = 'all 0.4s'
    setTimeout(close,500);
  }

  //para que halla un delay en la funcion de busqueda
  useEffect(()=>{
    const timeOutId = setTimeout(() => searchAlbum(), 500);
    return () => clearTimeout(timeOutId);
  },[search])

  //Para buscar albums
  const searchAlbum = async ()=>{
      if(searchid) {
        let {data} = await axios.get('https://api.spotify.com/v1/artists/'+searchid+'/albums',{
          headers:{
            Authorization:`Bearer ${token}`
          },
          params:{
            limit: 5,
            include_groups:'album'
          }
      })
      actualizarDatos(data)
    }
    else if(search){ 
      let {data} = await axios.get('https://api.spotify.com/v1/search',{
        headers:{
          Authorization:`Bearer ${token}`
        }, 
        params:{
          q: search,
          type:'album',
          limit: 5
        }
      })
      actualizarDatos(data)
    }
    else setAlbums([])
  }

  const nextHandler = async (a) => {
    if(a!=null){
      const {data} = await axios.get(a,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    )
    actualizarDatos(data)
  }
  }

  const actualizarDatos = (data) =>{
    setAlbums(searchid?data.items:data.albums.items)
    setNextLinks(searchid?[data.previous,data.next]:[data.albums.previous,data.albums.next])
  }

  //Funcion para renderizar albums
  const renderAlbums = () =>{
    let renderizeAlbums = albums.map((a)=><AlbumSearch 
    addAlbum={addAlbum}
    close={closeInfo}
      key={a.id} 
      id={a.id}
      nombre={a.name} 
      artistas={a.artists.map(a=>{return {name:a.name,id:a.id}})}
      año={a.release_date.split('-')[0]}
      imagen={a.images.length>=0?a.images[0].url:'#'}
      tipo={camelCase(a.album_type)}
    />
    )
    return renderizeAlbums
  }

  return(
    <section id="sub-win">
    <div id='producto-content'>
      <div id="search-bar">
        {!searchid&&<input id='input' key={'a'} type="text" onChange={e=>setSearch(e.target.value)}/>}
        <FontAwesomeIcon icon={faCircleXmark} className="boton" onClick={closeInfo}/>
      </div>
        <div id="resultado-busqueda"> {renderAlbums()} </div>
        {albums.length>0 &&
        <div id='controls'>
          <FontAwesomeIcon onClick={()=>nextHandler(nextLinks[0])} className="boton" icon={faCaretLeft}/>
          <FontAwesomeIcon onClick={()=>nextHandler(nextLinks[1])} className="boton" icon={faCaretRight}/>
        </div>}
    </div>
  </section>
  )
}

export default Ventana;
import { useState, useEffect } from "react";
import axios from "axios";

import AlbumSearch from "./AlbumSearch";
import './Ventana.css'

function camelCase(a){
  return a.slice(0,1).toUpperCase()+a.slice(1)
}

function Ventana({token,close,addAlbum}){
  const [albums,setAlbums] = useState([])
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
    if(search){
      const {data} = await axios.get('https://api.spotify.com/v1/search',{
      headers:{
        Authorization:`Bearer ${token}`
      }, 
      params:{
        q: search,
        type:'album',
        limit: 5
      }
    })

    console.log(data)

    setAlbums(data.albums.items)
  }else setAlbums([])
  }

  //Funcion para renderizar albums
  const renderAlbums = () =>{
    let renderizeAlbums = albums.map((a)=><AlbumSearch 
    addAlbum={addAlbum}
    close={closeInfo}
      key={a.id} 
      id={a.id}
      nombre={a.name} 
      artista={a.artists.map(a=>a.name).join(" - ")}
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
      <span id='close' onClick={closeInfo}>X</span>
      <input key={'a'} type="text" onChange={e=>setSearch(e.target.value)}/>
      {renderAlbums()}
    </div>
  </section>
  )
}

export default Ventana;
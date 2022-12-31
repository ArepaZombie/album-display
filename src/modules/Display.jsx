import { useState } from "react";
import axios from "axios";

import AlbumSearch from "./AlbumSearch";

function Display({setToken,token}){
  const [albums,setAlbums] = useState([])
  const [search, setSearch] = useState('')

  const logOut = () =>{
    window.localStorage.removeItem('token')
    setToken('')
  }

  const searchAlbum = async (e)=>{
    e.preventDefault()
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
  }

  const renderAlbums = () =>{
    return albums.map((a)=><AlbumSearch 
      key={a.id} 
      nombre={a.name} 
      artista={a.artists.map(a=>a.name).join(" - ")}
      año={a.release_date.split('-')[0]}
      imagen={a.images.length>=0?a.images[0].url:'#'}
      tipo={a.album_type}
      uri={'https://open.spotify.com/album/'+a.id}
    />
    )
  }

  return(
    <div id="display">
      <p onClick={logOut}>Logueado!</p>
      <form onSubmit={(e)=>searchAlbum(e)}>
        <p>Hola</p>
        <input type="text" onChange={e=>setSearch(e.target.value)}/>
        <button type='submit'>Search</button>
      </form> 

      {renderAlbums()}
    </div>
  )
}

export default Display;
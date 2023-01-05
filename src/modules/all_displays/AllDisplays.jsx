import { useEffect, useState } from "react";
import axios from "axios";


import AlbumBigDisplay from "./AlbumBigDisplay";
import AlbumLittleDisplay from "./AlbumLittleDisplay"; 
import Ventana from '../search/Ventana';


function AllDisplay({albums,eliminarAlbum,changeView,token},props){
  const [albumSelected,setAlbumSelected]=useState()
  const [searchId,setSearchId] = useState('')

  useEffect(()=>{
    setAlbumSelected(albums[0])
  },[])

  const changeSelected = (e) => setAlbumSelected(albums.find(album=>album.id==e.target.id))
  
  const renderAlbums = () =>{
    return albums.map(a=><AlbumLittleDisplay 
      key={a.id}
      id={a.id}
      imagen={a.imagen}
      changeSelected={(e)=>changeSelected(e)}/> 
    )
  }

  const eliminarHandler=()=>{
    eliminarAlbum(albumSelected.id)
    setAlbumSelected(albums[albums.length-1])
  }

/*   const makePlaylist = () =>{ 
    axios.get('https://api.spotify.com/v1/me',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    .then(response=>response.data)
    .then(data=>data.id)
    .then(id=>createPlaylist(id))
  }
  
  const createPlaylist = (id)=>{
    console.log(token)
    axios.post('https://api.spotify.com/v1/users/'+id+'/playlists',
    {
      Authorization: `Bearer ${token}`,
      "name": "Playlist automatica",
      "description": "Lista automatica hecha el "+ Date.now(),
      "public": false
    },
    {headers:{Authorization: `Bearer ${token}`,},}
  )
    .then(response=>response.data)
    .then(data=>console.log(data))
  } */

  return(
      <div id="all-display">
      <p className="boton a change-view"
        onClick={changeView}>see one by one</p>
      {albumSelected && <AlbumBigDisplay
        eliminarAlbum={eliminarHandler}
        key={albumSelected.id}
        id={albumSelected.id} 
        nombre={albumSelected.name} 
        artistas={albumSelected.artistas}
        año={albumSelected.año}
        imagen={albumSelected.imagen}
        tipo={albumSelected.tipo}
        uri={'https://open.spotify.com/album/'+albumSelected.id}
        setSearchId={(a)=>setSearchId(a)}/>}
      
      <div id="little-display">
        {renderAlbums()}
        {/* <p onClick={makePlaylist} className="boton v">make a playlist with all</p> */}
      </div>

      {searchId.length>0 && <Ventana
          token={token}
          close={()=>{props.closeWindow;setSearchId('')}}
          addAlbum={props.addAlbum}
          searchid={searchId}
        />}

    </div>
  )
}

export default AllDisplay;
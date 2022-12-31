import { useEffect, useState } from 'react'
import axios from 'axios'

function HolaMundo(){
  const [token, setToken] = useState('')
  const [search, setSearch] = useState('')
  const [albums, setAlbums] = useState([])

  const client = '4f254b2a1f574a64bd53789db6bd5490'
  const uri = 'http://localhost:5173'
  const url_log = 'https://accounts.spotify.com/authorize'
  const tipo= 'token'

  useEffect(()=>{
    const hash = window.location.hash
    let token = window.localStorage.getItem('token');

    if(!token && hash){
      token = hash.substring(1).split('&').find(e=>e.startsWith("access_token")).split('=')[1]
      console.log(token)
      window.location.hash=""
      window.localStorage.setItem('token',token)
    }
    setToken(token)
  },[])

/*   useEffect(()=>{
    fetch('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy')
    .then(i=>console.log(i))
  }) */

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
    return albums.map((a)=><div key={a.id}>
      {a.images.length>=0?<img width={'500px'} src={a.images[0].url}/>:<p>no image</p>}
      <p>{a.name}</p>
      <p>{a.artists.map(a=>a.name).join(" - ")}</p>
    </div>)
  }

  return(
    <div>
      <p>Intento logguear Spoty</p>
      {!token ?
      <a href={`${url_log}?client_id=${client}&redirect_uri=${uri}&response_type=${tipo}`}>Log in</a>:
      <p onClick={logOut}>Logout</p>}

      {token ? 
      <form onSubmit={(e)=>searchAlbum(e)}>
        <p>Hola</p>
        <input type="text" onChange={e=>setSearch(e.target.value)}/>
        <button type='submit'>Search</button>
      </form>:
      <p>Loguee marica</p>
      }
      
      {renderAlbums()}

    </div>
  )
}

export default HolaMundo;
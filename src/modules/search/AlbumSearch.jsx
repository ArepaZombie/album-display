import { motion } from 'framer-motion'
import './AlbumSearch.css'


function AlbumSearch({nombre,artistas,año,id,imagen,tipo,addAlbum,close}){
  const agregarAlbum = () =>{
    const album_info = {
      id:id,
      name:nombre,
      artistas:artistas,
      imagen:imagen,
      año:año,
      tipo:tipo
    }
    addAlbum(album_info)
    close()
  }

  return(
    <motion.div 
    initial={{ y: '-50%', opacity: 0 }}
    animate={{ y: '0', opacity: 1 }}
    transition={{delay:0.3}}
    className="album-search">
      <img className="imagen" src={imagen}/>
      <div className='album-info'>
        <p className="nombre">{nombre}</p>
        <p className="artista">{artistas.map(a=>a.name).join(' - ')}</p>
        <p className="año">{año} - {tipo}</p>
        <p onClick={agregarAlbum} className='boton add'>Agregar album</p>
      </div>
    </motion.div>
  )
}

export default AlbumSearch;
import './search/AlbumSearch.css'

function AlbumDisplay({nombre,artista,año,uri,imagen,tipo,eliminarAlbum}){
  return(
    <div className="album-search">
      <img className="imagen" src={imagen}/>
      <div className='album-info'>
        <p className="nombre">{nombre}</p>
        <p className="artista">{artista}</p>
        <p className="año">{año} - {tipo}</p>
        <a href={uri} target='_blank'
        rel="noopener noreferer" 
        className="sp">URI
        </a>
        <p onClick={eliminarAlbum}>Eliminar album</p>
      </div>
    </div>
  )
}

export default AlbumDisplay;
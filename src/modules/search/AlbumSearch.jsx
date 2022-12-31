import './AlbumSearch.css'

function AlbumSearch({nombre,artista,año,id,imagen,tipo,addAlbum,close}){
  const agregarAlbum = () =>{
    const album_info = {
      id:id,
      name:nombre,
      artista:artista,
      imagen:imagen,
      año:año,
      tipo:tipo
    }
    addAlbum(album_info)
    close()
  }

  return(
    <div className="album-search">
      <img className="imagen" src={imagen}/>
      <div className='album-info'>
        <p className="nombre">{nombre}</p>
        <p className="artista">{artista}</p>
        <p className="año">{año} - {tipo}</p>
        <p onClick={agregarAlbum} className='btn btn-add'>Agregar album</p>
      </div>
    </div>
  )
}

export default AlbumSearch;
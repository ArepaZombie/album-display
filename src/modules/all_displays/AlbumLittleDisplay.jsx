import './AllDisplays.css'

function AlbumLittleDisplay({imagen,id,changeSelected}){
  return(
    <img className='album-little-display' 
      onClick={changeSelected} 
      src={imagen} 
      id={id} 
    />
  )
}

export default AlbumLittleDisplay;
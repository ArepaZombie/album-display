import { useState } from "react"
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight, faCaretLeft, faShuffle } from "@fortawesome/free-solid-svg-icons";

import './OneDisplay.css'

function OneDisplay({albums,changeView,eliminarAlbum}){
  const [index,setIndex] = useState(0)

  const eliminarHandler = (id) =>{
    eliminarAlbum(id)
  }

  const selectRandom = () => {
    let i = setIndex(Math.floor(Math.random()*(albums.length-1)))
    while(i==index){
    i = setIndex(Math.floor(Math.random()*(albums.length-1)))
  }
  }

  const albumsItems = albums.map(a=><Carousel.Item>
        <div className='album-show'>
        <img
          className="album-cover"
          src={a.imagen}
          alt="album cover"
        />
        <FontAwesomeIcon icon={faTrashCan} className='boton r' onClick={()=>eliminarHandler(a.id)} />
        <h3 className='album-name'>{a.name}</h3>
        <p className='album-artists'>by {a.artista}</p>
        <a href={'https://open.spotify.com/album/'+a.id} target='_blank'
          rel="noopener noreferer" 
          className="boton spotify-link">LISTEN IN SPOTIFY
        </a>
        </div>
      </Carousel.Item>
    )

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
  <div>
    
    <p className="boton a"
    onClick={changeView}>see all albums</p>
    
    <Carousel 
      activeIndex={index} 
      onSelect={handleSelect}
      indicators={false}
      interval={null}
      nextIcon={<FontAwesomeIcon icon={faCaretRight} className='next'/>}
      prevIcon={<FontAwesomeIcon icon={faCaretLeft} className='next'/>}
      >
      {albumsItems}
    </Carousel>

    <p className="boton v"
    onClick={selectRandom}>
      <FontAwesomeIcon icon={faShuffle}/>
    </p>

  </div>
  )
}

export default OneDisplay
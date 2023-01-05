import { useState } from "react"
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCaretRight, faCaretLeft, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimationControls } from "framer-motion";

import './OneDisplay.css'
import Ventana from "../search/Ventana";

function OneDisplay({albums,changeView,eliminarAlbum,token},props){
  const [index,setIndex] = useState(0)
  const [round,setRound] = useState(false)
  const [searchId, setSearchId] = useState('')

  const eliminarHandler = (id) =>{
    eliminarAlbum(id)
  }

  const a = useAnimationControls()
  const selectRandom = () => {
    let i = setIndex(Math.floor(Math.random()*(albums.length-1)))
    setRound(!round)
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
        <div>
        <h3 className='album-name'>{a.name}</h3>
        <p className='album-artists'>by {a.artistas.map((a,i)=><span 
          onClick={()=>setSearchId(a.id)}
          key={a.id} id={a.id}>{i>0&&'-'} {a.name} </span>)}
        </p>
        <a href={'https://open.spotify.com/album/'+a.id} target='_blank'
          rel="noopener noreferer" 
          className="boton spotify-link">LISTEN IN SPOTIFY
        </a>
        </div>
        </div>
      </Carousel.Item>
    )

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return(
  <div id='one-display'>
    
    <p className="boton a change-view"
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

    <motion.p 
    className="boton v" 
    id="random"
    onClick={selectRandom}
    animate={{rotate:round?360:0}}
    transition={{ duration: 0.2 ,ease:'easeInOut'}}>
      <FontAwesomeIcon icon={faShuffle}/>
    </motion.p>
    
    {searchId.length>0 && <Ventana
    token={token}
    close={()=>{props.closeWindow;setSearchId('')}}
    addAlbum={props.addAlbum}
    searchid={searchId}
    />}
  </div>
  )
}

export default OneDisplay
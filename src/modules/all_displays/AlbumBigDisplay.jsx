import './AllDisplays.css'

import { motion} from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

function AlbumBigDisplay({nombre,artista,año,uri,imagen,tipo,eliminarAlbum}){
  return(
      <motion.div layout id="album-big-display"
      initial={{ y: '-100%', opacity: 0 }}
      animate={{ y: '0', opacity: 1 }}>
        <img className="imagen" src={imagen}/>
        <div id='album-info'>
          <FontAwesomeIcon icon={faTrashCan} className='boton r' onClick={eliminarAlbum} />
          <p className="nombre">{nombre}</p>
          <p className="artista">{artista}</p>
          <p className="año">{año} - {tipo}</p>
          <a href={uri} target='_blank'
          rel="noopener noreferer" 
          className="boton spotify-link">LISTEN IN SPOTIFY
          </a>
        </div>
      </motion.div>
  )
}

export default AlbumBigDisplay;
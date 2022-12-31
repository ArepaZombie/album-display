
function Album({nombre,artista,año,sp,yt}){
  return(
    <div className="album">
      <p className="nombre">{nombre}</p>
      <p className="artista">{artista}</p>
      <p className="año">{año}</p>
      <a href={sp} target='_blank'
      rel="noopener noreferer" 
      className="sp">sp
      </a>
      <a href={yt} target='_blank'
      rel="noopener noreferer" 
      className="yt">yt
      </a>
    </div>
  )
}
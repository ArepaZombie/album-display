import './Login.css'

function Login(){
  
  const client = '4f254b2a1f574a64bd53789db6bd5490'
  const uri = 'http://localhost:5173'
  const url_log = 'https://accounts.spotify.com/authorize'
  const tipo= 'token'
  const scope='playlist-modify-private'

  return(
  <div id="login">
    <p>Bienvenido a mi album display</p>
    <p>Por favor inicie sesion</p>
    <a className='btn' href={`${url_log}?client_id=${client}&scope=${scope}&redirect_uri=${uri}&response_type=${tipo}`}>Log in</a>
  </div>
  )
}

export default Login;
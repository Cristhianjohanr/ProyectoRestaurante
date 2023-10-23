import { useState, useEffect } from 'react'
import HeadeRest from './HeadeRest'
import FooteRest from './FooteRest'
import './App.css'

function App() {

  const [reservations, setReservations] = useState([])
  const [newReservations, setnewReservations] = useState({
    plate:"",
    price:"",
    description:""
  })
  const serverUrl = import.meta.env.VITE_SERVER_URL
  

useEffect(() => {

  const fecthReservations = async () => {

    const response = await fetch(serverUrl)
    const allReservations = await response.json()
    
    setReservations(allReservations.data)
    return
  }

  fecthReservations()

}, [])

const handleSubmit = (e, data) => {
  e.preventDefault()
  console.log ("data", data)

  const sendData = async () => {
    const response = await fetch(serverUrl, {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(data),
    })
  console.log("Response",response)

  const success = await response.json()
  console.log("Success Data",success)

  setReservations(success.data)

 }
  sendData()
}

const handleChange = (e) => {
  console.log("Evento",e)
  console.log("nombre", e.target.name)

  setnewReservations({
    ...newReservations,
    [e.target.name]: e.target.value
  })
}


  return (
    <>
    
    <HeadeRest />
    <FooteRest />


    <div style={{ display: 'flex', flexDirection: 'row' }}>  
        <img src="/images/Bienvenida.jpg" alt="Comida Colombiana internacional" width="50%" height="auto" />
        <article style={{ width: '50%', marginLeft: '20px' }}>
          <h1 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '30px' }} >Restaurante Colombia Internacional</h1>
          <h2 style={{ textAlign: 'center' }} >Conoce los mejores platos de comida latinoamericana y en especial la colombiana, rica en diversidad y sabores.</h2>
          <p>En un rincón acogedor de nuestra tierra colombiana, te invitamos a un viaje culinario inolvidable. 
            En nuestro restaurante, la riqueza y la diversidad de la comida internacional colombiana se despliegan ante tus 
            sentidos en cada plato. Desde el primer bocado, te sumergirás en un mundo de sabores auténticos que han sido transmitidos
            de generación en generación. Desde los suculentos ajiacos hasta los exquisitos platos de mariscos y las deliciosas arepas 
            rellenas, cada receta es un tesoro que celebra nuestra herencia gastronómica. Ven y descubre por ti mismo cómo la pasión 
            de nuestra cocina se fusiona con la hospitalidad colombiana, creando una experiencia que te hará sentir como en casa.</p>
        </article>
    </div><br></br><br></br><br></br><br></br><br></br><br></br>



      <div>
        <form style={{display:"flex", justifyContent: "space-between"}} onSubmit={(e) => handleSubmit(e, newReservations)}>
         <div>
          <label>Plato</label>
          <input name="plate" onChange={(e) => handleChange (e)} value={newReservations.plate} />
         </div>
          <div> 
          <label>Precio</label>
          <input name="price" onChange={(e) => handleChange (e)} value={newReservations.price} />
         </div>
         <div>
          <label>Descripción</label>
          <textarea style={{width: '300px', height: '20px'}} name="description" onChange={(e) => handleChange (e)} value={newReservations.description} />
         </div>
         <button>Reservar</button>
         <button>Cancelar</button>
        </form>
      </div>


      {
        reservations.length === 0 ? <p>No hay Reservaciones</p> : reservations.map (e => {
          return (
            <div key={e.id}>
              <div style={{marginTop: '10px'}}><h1>Plato: {e.plate}</h1></div>
              <div style={{marginTop: '10px'}}><h1>Precio: {e.price}</h1></div>
              <div style={{marginTop: '10px'}}><h1>Descripción: {e.description}</h1></div>
            </div>
          )
        })
      }<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
       <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

    </>
  )
}

export default App
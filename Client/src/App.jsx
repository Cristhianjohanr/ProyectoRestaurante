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
    return;
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

      <div>
        <form style={{display:"flex"}} onSubmit={(e) => handleSubmit(e, newReservations)}>
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
          <textarea name="description" onChange={(e) => handleChange (e)} value={newReservations.description} />
         </div>
         <button>Reservar</button>
         <button>Cancelar</button>
        </form>
      </div>


      {
        reservations.length === 0 ? <p>No hay Reservaciones</p> : reservations.map (e => {
          return (
            <div key={e.id}>
              <h1>Plato: {e.plate}</h1>
              <h1>Precio: {e.price}</h1>
              <h1>Descripción: {e.description}</h1>
            </div>
          )
        })
      }




    </>
  )
}

export default App
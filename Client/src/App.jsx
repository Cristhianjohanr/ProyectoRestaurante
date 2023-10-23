import { useState, useEffect } from 'react'
import HeadeRest from './HeadeRest'
import FooteRest from './FooteRest'
import './App.css'

function App() {

  const [reservations, setReservations] = useState([])
  const serverUrl = import.meta.env.VITE_SERVER_URL
  console.log("IP",serverUrl)

useEffect(() => {

  const fecthReservations = async () => {

    const response = await fetch(serverUrl)
    const allReservations = await response.json()
    
    setReservations(allReservations.data)
    return;
  }

  fecthReservations()

}, [])


  return (
    <>
      <HeadeRest />
      <FooteRest />


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
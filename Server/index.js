import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())

app.use (express.json())

let data = [
    {id: 0, plate: "Sancocho trifasico Santanderiano", price: 25000, description: "Reserva cumpleaños"},
    {id: 1, plate: "Chuleta Valluna", price: 35000, description: "Reserva empresarial"},
    {id: 2, plate: "Ajiaco Santafereño", price: 35000, description: "Reserva aniversario"},
    {id: 3, plate: "Cazuela de Mariscos", price: 60000, description: "Reserva laboral"},
]

app.get("/", (req, res) => {
    res.json({
        msg: "Reservaciones",
        data: data
    })
})

app.post("/", (req, res) => {
    console.log("request", req.body)

    const {plate, price, description} = req.body
    
    data.push({
        plate, 
        price, 
        description
    })

    res.json({
        msg: "Reservación agregada",
        data: data
    })
})


app.listen(3005, () => console.log("Servidor on"))
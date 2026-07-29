import express from 'express'
import dotenv from 'dotenv'
import router from './src/routes/index.js'
import corsMiddleware from './src/middlewares/corsMiddleware.js'
import { initDataFiles } from './src/lib/fileHelper.js'
import {constants} from "node:http2"

const app = express()
const PORT = process.env.PORT || 8080

// Inisialisasi folder data dan file JSON
await initDataFiles()

app.use(express.json())
app.use(express.urlencoded())

app.use(corsMiddleware)
app.use(router)

// Route default
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is running' 
  })
})

app.all("{*all}", function (req, res) {
    res.status(constants.HTTP_STATUS_NOT_FOUND).json({
        success: false,
        message: "Resources Not Found",
    })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
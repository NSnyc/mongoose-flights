import mongoose, { Schema } from "mongoose"
// import { ticketSchema } from "./ticket.js"

const ticketSchema = new Schema({
  seat: { type: String, match: /[A-Fa-f][1-9]\d?/ },
  price: { type: Number, min: 0 }
})

const flightSchema = new mongoose.Schema({
  airline: {
    type: String, 
    enum: ['American', 'SouthWest', 'United']
  },
  airport: {
    type: String, 
    enum: ['DEN', 'AUS', 'DFW', 'LAX', 'SAN'],
    default: "DEN"
  },
  flightNo: {
    type: Number, 
    min: 10, 
    max: 9999
  },
  departs: {
    type: Date,
    default: () => {
      const currentDate = new Date()
      currentDate.setFullYear(currentDate.getFullYear() + 1)
      return currentDate
    }
  },
  tickets: [ticketSchema]
}, {
  timestamps: true
})


const Flight = mongoose.model("Flight", flightSchema)

export { Flight }

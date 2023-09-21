import mongoose, { Schema } from "mongoose"
// import { Meal } from "./meal.js"

const ticketSchema = new Schema({
  seat: { type: String, match: /[A-Fa-f][1-9]\d?/ },
  price: { type: Number, min: 0 }
})

const mealSchema = new Schema({
  name: {type: String, required: true}
}, {
  timestamps: true
})

const flightSchema = new Schema({
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
  tickets: [ticketSchema],
  meals: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
}, {
  timestamps: true
})


const Flight = mongoose.model("Flight", flightSchema)

export { Flight }

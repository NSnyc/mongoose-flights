import mongoose from "mongoose"

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
<<<<<<< HEAD
    type: String,
=======
    type: Date,
>>>>>>> a4590e98decf896c6ba54ffa68f513365d185f2a
    default: () => {
      const currentDate = new Date()
      currentDate.setFullYear(currentDate.getFullYear() + 1)
      return currentDate
    }
  }
}, {
  timestamps: true
})

const Flight = mongoose.model("Flight", flightSchema)

export { Flight }

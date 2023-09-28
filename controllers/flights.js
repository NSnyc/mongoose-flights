import { Flight } from "../models/flight.js";
import { Meal } from "../models/meal.js";

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights', {
      flights,
      title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function create(req, res) {
  if (req.body.departs === "") {
    delete req.body.departs
  }
  Flight.create(req.body)
    .then(flight => {
      console.log("Create successful")
      res.redirect("/flights/new")
    })
    .catch(err => {
      console.log(err)
      res.redirect("/flights/new")
    })
  }
  
  function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.flightId)
    .then(flight => {
      res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('meals')
  .then(flight => {
    Meal.find({_id: {$nin: flight.meals}})
    .then(meals => {
      res.render('flights/show', {
        flight, 
        meals: meals,
        title: 'Flight Details',
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    res.render('flights/edit', {
      flight,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function update(req, res) {
  Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true })
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights')
  })
}

function addTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect('/flights')
  })
}

function deleteTicket(req, res) {
  Flight.findById(req.params.flightId)
    .then(flight => {
      flight.tickets.id(req.params.ticketId).deleteOne()
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
          console.log(err);
          res.redirect('/flights')
        })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

function addMealToFlight(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.meals.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function removeMealFromFlight(req, res) {
  Flight.findById(req.params.flightId)
    .then(flight => {
      flight.tickets.id(req.params.mealId).deleteOne()
      flight.save()
        .then(() => {
          res.redirect(`/flights/${flight._id}`)
        })
        .catch(err => {
          console.log(err);
          res.redirect('/flights')
        })
    })
    .catch(err => {
      console.log(err);
      res.redirect('/flights')
    })
}

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
  show,
  edit,
  update,
  addTicket,
  addMealToFlight,
  deleteTicket,
  removeMealFromFlight,
}
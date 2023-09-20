import { Flight } from "../Models/flight.js";

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
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
  if (req.body.depart === "") req.body.depart = addOneYear()
  Flight.create(req.body)
    .then(flight => {
      console.log("Create successful");
      res.redirect("/flights/new")
    })
    .catch(err => {
      console.log(err);
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

export {
  index,
  newFlight as new,
  create,
  deleteFlight as delete,
}
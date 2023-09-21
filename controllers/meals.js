import { Meal } from "../models/meal.js"



function create(req, res) {
  Meal.create(req.body)
  .then(meal => {
    res.redirect('/meals/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/meals/new')
  })
}

function addMeal(req, res) {
  Meal.find({})
  .then(meal => {
    res.render('meals/new', {
      meal,
      title: 'Add Meal'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

export {
  addMeal,
  create,
}
import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:flightId', flightsCtrl.show)
router.get('/:flightId/edit', flightsCtrl.edit)
router.get('/:flightId/meals', flightsCtrl.addMealToFlight)
router.post('/', flightsCtrl.create)
router.post('/:flightId/tickets', flightsCtrl.addTicket)
router.post('/:flightId/meal', flightsCtrl.addMealToFlight)
router.put('/:flightId', flightsCtrl.update)
router.delete('/:flightId', flightsCtrl.delete)
router.delete('/:flightId/tickets/:ticketId', flightsCtrl.deleteTicket)

export { router }

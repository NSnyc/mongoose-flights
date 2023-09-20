import { Router } from 'express'
import * as flightsCtrl from '../controllers/flights.js'

const router = Router()

router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/:flightId', flightsCtrl.show)
<<<<<<< HEAD
router.get('/:flightId/edit', flightsCtrl.edit)
=======
>>>>>>> a4590e98decf896c6ba54ffa68f513365d185f2a
router.post('/', flightsCtrl.create)
router.put('/:flightId', flightsCtrl.update)
router.delete('/:flightId', flightsCtrl.delete)

export { router }

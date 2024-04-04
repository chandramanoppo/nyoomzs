
const UserController= require('../controllers/UserController')

const RoomController = require('../controllers/RoomController')

const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.post('/register', UserController.Register)
router.post('/login', UserController.Login)

router.use(authentication)
router.get('/profile', UserController.ShowProfile)
router.put('/profile', UserController.EdiProfile)



router.post('/create-room', RoomController.CreateRoom)
router.post('/join-room/:roomId', RoomController.JoinRoomById)
router.get('/browse-room', RoomController.ListRoom)
router.delete('/browse-room/:roomId', RoomController.DeleteRoom)
router.put('/browse-room/:roomId', RoomController.EditRoom)



module.exports = router

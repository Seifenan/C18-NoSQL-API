const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/userController');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/Users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;

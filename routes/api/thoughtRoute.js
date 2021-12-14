const router = require('express').Router();

const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

  // /api/thoughts/:id/reactions/
router
  .route('/:thoughtId/reactions')
  .post(addReaction)
  // .delete(removeReaction);

  // /api/thoughts/:id/reactions/:id

router
  .route('/:thoughtId/:reactionId')
  .delete(removeReaction);

module.exports = router;

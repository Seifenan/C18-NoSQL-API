const { Thought, User } = require('../models');

const thoughtController = {
  // get all Users
  getAllUser(req, res) {
    Thought.find({})
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one Thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // update Thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thoughts found with this ID!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete Thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;




// const { Friend, User } = require('../models');

// const friendController = {
  
//   addFriend({ params, body }, res) {
//     console.log(params);
//     Friend.create(body)
//       .then(({ _id }) => {
//         return User.findOneAndUpdate(
//           { _id: params.userId },
//           { $push: { friends: _id } },
//           { new: true }
//         );
//       })
//       .then(dbUserData => {
//         console.log(dbUserData);
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No users found with this ID!' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.json(err));
//   },

//   removeFriend({ params }, res) {
//     Friend.findOneAndDelete({ _id: params.friendId })
//       .then(deletedFriend => {
//         if (!deletedFriend) {
//           return res.status(404).json({ message: 'No friends found with this ID!' });
//         }
//         return User.findOneAndUpdate(
//           { _id: params.userId },
//           { $pull: { friends: params.friendId } },
//           { new: true }
//         );
//       })
//       .then(dbUserData => {
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No users found with this ID!' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.json(err));
//   },
// };

// module.exports = friendController;

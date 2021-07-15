//imports
const router = require('express').Router();
const Workout = require('../models/Exercise.js');

//get all workouts using aggrate set the new field totalDuration
//with the exercises aggragated value of the duration and sort by id
router.get('/api/workouts', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: '$exercises.duration'},
      },
    },
  ]).sort({_id: -1}).then(
    data => {res.json(workoutData);
  }).catch(
    err => {res.status(400).json(err);
  });
});

// sort workouts by id and limt query to 7 workouts
router.get('/api/workouts/range', (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {$sum: '$exercises.duration'},
      },
    },
  ]).sort({_id: -1}).limit(7).then(data => {
      res.json(data);
    }).catch(err => {
      res.status(400).json(err);
    });
});

//create a workout
router.post('/api/workouts', ({body}, res) => {
  Workout.create(body).then(data => {
      res.json(data);
    }).catch(err => {
      res.status(400).json(err);
    });
});

// update workouts and set the exercises body element
router.put('/api/workouts/:id', ({body, params}, res) => {
  Workout.findByIdAndUpdate(
    {_id: params.id},
    {$push: {exercises: body}},
    {new: true}).then(data => {
      res.json(data);
    }).catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'c29858b1795c44f6846b4c1a9f4a62b9'
 });

const handleApiCall = (req, res) => {
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input) //I moved this to the back end to protect it/Security
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with Api'))
}
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'))
};

module.exports = {
    handleImage,
    handleApiCall
}
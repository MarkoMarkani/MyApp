var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const Student = require('../models/student');
const functions = require('../utils/functions')

console.log("SAD CE STASH");


/* GET home page. */
router.get('/all', functions.getAll );
router.get('/allGames', functions.getAllGames );
router.get('/students', functions.getAllStudents );
router.get('/students/:name', functions.getStudentByName);
router.delete('/students/:name', functions.deleteStudentByID);
router.post('/students', functions.createStudent);
// router.put('/students', functions.updateStudent);
router.put('/students', functions.updateOrCreateStudent2);
/* GET home page. */
router.get('/country/:name', function(req, res, next) {
  //console.log(req.params.id);
  var options2 = {
    uri: 'https://restcountries.eu/rest/v2/name/',
   
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };
  let name = req.params.name;
  let restOfUrl = '?fullText=true';
  let url = name.concat('', restOfUrl);
 
  options2.uri += url;

  console.log(options2.uri);
  rp(options2)
  .then(function (repos) {
      //console.log(repos);
      res.send(repos);
  })
  .catch(function (err) {
    console.log("Not working");
    res.status(404).send("Country not found");
  });
  
});

module.exports = router;

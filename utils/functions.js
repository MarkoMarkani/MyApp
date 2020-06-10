
const rp = require('request-promise');
const Student = require('../models/student');
const axios = require('axios');
var options = {
    uri: 'https://restcountries.eu/rest/v2/all',

    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

var options2 = {
  uri: "https://stats.nba.com/stats/allstarballotpredictor",
  
  headers: {
    'User-Agent': 'Request-Promise'
},
json:true

};

module.exports.getAll = (req, res, next) => {
    rp(options)
        .then(function (repos) {
            console.log(repos);
            res.send(repos);
        })
        .catch(function (err) {
            console.log("Not working");
        })
};

module.exports.getAllGames = (req, res, next) => {
  rp(options2)
      .then(function (repos) {
          console.log(repos);
          res.send(repos);
      })
      .catch(function (err) {
          console.log(err);
      })
};




module.exports.getAllStudents = (req, res, next) => {
  
    Student.find().then(function(students){
      console.log(students);
  
      res.send(students);
     }).catch(function (err) {
      
      res.status(404).send("Cannot find students");
    })
};
module.exports.getStudentByName = (req, res, next) => {
  
    
        let nameStudent = req.params.name;
        Student.find({name: nameStudent}).then(function(student){
          console.log(student);
          if(student.length<1){
            res.status(404).send("Cannot find student");
          }else{
      
            res.send(student);
          }
        }).catch(function (err) {
          console.log(err);
          res.status(404).send("Cannot find student");
        });
};

module.exports.deleteStudentByID = (req, res, next) =>{
    let nameStudent = req.params.name;
    Student.remove({name: nameStudent}).then(function(student){
      console.log(student);
      if(student.deletedCount<1){
        res.status(404).send("Cannot find student");
      }else{
  
        res.send(student);
      }
    }).catch(function (err) {
      console.log(err);
      res.status(404).send("Cannot find student");
    });
    
  };

  module.exports.createStudent = (req, res) => {
    console.log('You made a POST request: ', req.body);
    Student.create(req.body)
    .then(function(student){
        res.send(student);
    }).catch(function (err) {
      
      res.status(404).send("Cannot add student");
    })
    ;
    
  };

  module.exports.updateStudent = (req, res) => {
    console.log('You made a UPDATE request: ', req.body);
    Student.updateOne({_id: req.body._id} ,req.body)
    .then(function(student){
      if(student.nModified<1){
        res.status(404).send("Student is not modified");
      }else{
  
        res.send(student);
      }
    }).catch(function (err) {
      
      res.status(404).send("Cannot update student => " + err);
    })
    ;
    
  };

  module.exports.updateOrCreateStudent = (req, res) => {
    console.log('You made a UPDATE request: ', req.body);
    Student.updateOne({_id: req.body._id} ,req.body, {upsert:true})
    .then(function(student){
      if(student.nModified<1){
        res.status(404).send("Student is not modified");
      }else{
  
        res.send(student);
      }
    }).catch(function (err) {
      
      res.status(404).send("Cannot update student => " + err);
    })
    ;
    
  };

  module.exports.updateOrCreateStudent2 = (req, res) => {
    console.log('You made a UPDATE request: ', req.body);
    Student.findOneAndUpdate({name: req.body.name} ,{name: req.body.newName})
    .then(function(student){
      if(student){
        console.log("Student is updated: " + student);
        res.send(student);
        
      }else{
        Student.create({
          name: req.body.name,
          university: req.body.university
        }).then(
          (student) => {
            console.log("Student is created: " + student);
            res.send(student);
          }
        ).catch((err)=>{
          console.log("Student is not created: " + student);
          res.status(404).send(student);
        });
       
      }
    }).catch(function (err) {
      
      res.status(404).send("Cannot update student => " + err);
    })
    ;
    
  };

  const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
const response=await axios.get('http://data.fixer.io/api/latest?access_key=b3a08b8cb00c42f8871f34e415245675&format=1' );
const res=response;
console.log(res);
const rate = response.data.rates;
const euro = 1 / rate[fromCurrency];
const exchangeRate = euro * rate[toCurrency];
return exchangeRate;
    }catch(error){
      throw new Error(`Unable to get currency ${fromCurrency} and  ${toCurrency}`);
    }
  }


  const getCountries = async(currencyCode) => {
    try{
      const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map(country => country.name);
    }catch(error){throw new Error(`Unable to get countries that use ${currencyCode}`);}
  }

  // const convert = async (fromCurrency, toCurrency, amount) => {
  
  //   const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  //   const countries = await getCountries(toCurrency);
  //   const convertedAmount = (amount * exchangeRate).toFixed(2);
  //   return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
  // }

  // convert('USD', 'HRK', 20)
  // .then((message) => {
  //   console.log(message);
  // }).catch((error) => {
  //   console.log(error.message);
  // });
  const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    let exchangeRate;
    let countries;
  
    await Promise.all([getExchangeRate(fromCurrency, toCurrency), getCountries(toCurrency)])
      .then(([exchangeRateValue, countriesValue]) => {
        exchangeRate = exchangeRateValue;
        countries = countriesValue;
      });
  
    const convertedAmount = (amount * exchangeRate).toFixed(2);
  
    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend these in the following countries: ${countries}`;
  };
  
  // convertCurrency('USD', 'CAD', 20)
  //   .then((message) => {
  //     console.log(message);
  //   }).catch((error) => {
  //     console.log(error.message);
  //   });
  //getExchangeRate();
var express = require('express');
var app = express();
var cors = require('cors');

var customers = 
[
  {
    "Name": "EnergiMidt",
    "Projects": [
      {
        "Name": "Mit EnergiMidt v3",
        "Tasks": [
          {
            "Name": "Udvikling"
          }
        ]
      },
      {
        "Name": "IPS Venture",
        "Tasks": [
          {
            "Name": "Design"
          }
        ]
      }
    ]
  },
  {
    "Name": "Mj\u00f8lner",
    "Projects": [
      {
        "Name": "Internt",
        "Tasks": [
          {
            "Name": "Morgenm\u00f8de"
          },
          {
            "Name": "Testm\u00f8de"
          }
        ]
      }
    ]
  }
];

app.use(cors()); 
app.get('/customer', function(req, res) {
	res.status(200).json(customers);
});
 
app.listen(process.env.PORT || 9001);

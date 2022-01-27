const router = require('express').Router();
const fetch = require('node-fetch');
require('dotenv').config()

router.get('/', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null,
    country: null,
  });
});

router.get('/index', (req, res) => {
  res.render('index', {
    city: null,
    des: null,
    icon: null,
    temp: null,
    country: null,
  });
});



router.post('/', async (req, res) => {
  const city = req.body.city;
  const url_api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=548b0f455429d2c45768ae1dbc3b5e88`;

  try {
    await fetch(url_api)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'city not found') {
          res.render('index', {
            city: "found",
            des: null,
            icon: null,
            temp: data.message,
            country: null,
          })
          
        } else {
          const country = data.sys.country;
          const city = data.name;
          const des = data.weather[0].description;
          const icon = data.weather[0].icon;
          const temp = data.main.temp;

          res.render('index', {
            country, city, des, icon, temp
          });
        }
      });

  } catch (err) {
    res.render('index', {
      city: 'something went wrong',
      des: null,
      icon: null,
      temp: null,
      country: null
    })
  }

})

router.use((req, res) => {
  res.status(404).sendFile('./views/404.html', {root: __dirname});
});


module.exports = router;
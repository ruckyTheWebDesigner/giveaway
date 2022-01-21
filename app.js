const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const mongoose = require('mongoose')

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// const date = require('./public/config/date')

async function main() {
  await mongoose.connect(
    'mongodb+srv://admin:daniel080@cluster0.p9zcb.mongodb.net/userDB?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  console.log('connected successfully')
}

main().catch((err) => console.log(err))

const usersSchema = {
  username: String,
  password: String,
}

const User = mongoose.model('User', usersSchema)

app.get('/', (req, res) => {
  res.render('index', {})
})

app.get('/verify', (req, res) => {
  res.render('verify')
})

app.post('/verify', (req, res) => {
  if (req.body.username && req.body.password != null) {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    })
    newUser.save(function (err) {
      if (!err) {
        console.log('Successfully added')
      } else {
        console.log(err)
      }
    })

    res.redirect('/congratulation')
  } else {
    res.redirect('/verify')
  }
})

app.get('/congratulation', function (req, res) {
  res.render('congratulation')
})

app.listen(port, function () {
  console.log('Server started on port 3000')
})

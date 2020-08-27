require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
const path = require('path')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors())

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize()) //initialize passport package
app.use(passport.session()) //use passport to deal with the session

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const baseURL = "mongodb+srv://" + username + ":" + password + "@cluster0.2z2lx.mongodb.net"
const dbName = "noteDB"
const databaseURI = baseURL + "/" + dbName

mongoose.connect(databaseURI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useCreateIndex: true 
})

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  notes: [blogSchema]
})

userSchema.plugin(passportLocalMongoose)

const Blog = new mongoose.model("Blog", blogSchema)
const User = new mongoose.model("User", userSchema)

passport.use(User.createStrategy())

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


const defaultBlog = new Blog({
  title: "Welcome!",
  content: "This is your first note!"
})


app.post("/posts", (req, res) => {
    User.findById(req.body.userID, async (err, foundUser) => {
    if (err) {
      console.log(err)
    } else {
      if (foundUser.notes.length === 0) {
        foundUser.notes.push(defaultBlog)
        await foundUser.save()
      }
      res.send(foundUser.notes)
    }
  })
})

app.get("/logout", (req, res) => {
  req.logout()
  res.send(false)
})

app.post("/post", async (req, res) => {
    const blogPost = new Blog({
    title: req.body.noteToAdd.title,
    content: req.body.noteToAdd.content
  })

  User.findById(req.body.userID, async (err, foundUser) => {
    if (err) {
      console.log(err)
    } else {
      foundUser.notes.push(blogPost)
      await foundUser.save()
      res.send(foundUser.notes)
    }
  })
})

app.post("/deleteNote", async (req, res) => {
  const noteId = req.body.Id
  const userID = req.body.userID
  let message = ""

  User.findOneAndUpdate( { _id: userID }, { $pull: {notes: {_id: noteId} } }, (err, foundNote) => {
    if (!err) {
      message = "Successfully removed note from DB"
    } else {
      message = "Error removing note from DB"
    }
    res.send(message)
  })
})

app.post("/register", (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.send({requestStatus: false})
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log(req.user);
        res.send({ requestStatus: true })
      })
    }
  })
})

app.post("/login", (req, res, next) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  })

  req.login(newUser, (err) => {
    if (err) {
      console.log(err);
      res.send({requestStatus: false})
    } else {
      passport.authenticate("local")(req, res, () => {
        res.send({ requestStatus: true, userID: req.user._id })
      })
    }
  })
})

//serve static assets if in production!
if(process.env.NODE_ENV === 'production') {
  //Set the static folder after react build
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, function () {
  console.log("Server started successfully on port 5000!");
});
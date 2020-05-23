// cross browser
const cors = require("cors")
// logs
const logger = require("morgan")
//parses body of an http post or put
const bodyParser = require("body-parser")

// routes used in the application. Sub routes are specified in the .js files that these routes point to

const posts = require("../routes/api/posts")
const users = require("../routes/api/users")
const login = require("../routes/api/login")
const signUp = require("../routes/api/sign-up")
const search = require("../routes/api/search")
const groups = require("../routes/api/groups")
const notifications = require("../routes/api/notifications")
const messages = require("../routes/api/messages")

const error = require("../middleware/error")
const auth = require("../middleware/auth")
const admin = require("../middleware/admin")

module.exports = function(app) {
  // setup the logger
  app.use(logger("common"))

  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )
  app.use(cors())
  app.disable("etag")
  app.use("/api/login", login)
  app.use("/api/sign-up", signUp)
  app.use("/api/posts/", auth, posts)
  app.use("/api/users/", auth, users)
  app.use("/api/search/", auth, search)
  app.use("/api/groups/", auth, groups)
  app.use("/api/notifications/", auth, notifications)
  app.use("/api/messages/", auth, messages)
  app.use(error)
}

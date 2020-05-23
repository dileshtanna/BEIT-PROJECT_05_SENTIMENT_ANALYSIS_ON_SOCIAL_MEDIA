const Posts = require("../models/Posts")
const Groups = require("../models/Groups")
const Messages = require("../models/Messages")

module.exports.getNotifications = async (req, res, next) => {
  let result = await Posts.find({}).sort({ date: -1 })
  const { username } = req.user

  result = result.filter(async r => {
    let group
    if (r.group) {
      group = await Groups.findById(r.group)
    }
    if (
      (!r.selected_participants && !r.group) ||
      r.selected_participants.length === 0 ||
      r.selected_participants.includes(req.user.username) ||
      r.username === req.user.username ||
      (group && group.selected_participants.includes(req.user.username)) ||
      (group && group.admin === req.user.username)
    ) {
      return r
    }
  })
  let messages = await Messages.find()

  console.log(result)
  let ids = []
  for (let i in result) {
    if (result[i].username !== username && result[i].compulsory_action && !result[i].likes.includes(username)) {
      ids.push(result[i]._id)
    }
  }
  for (let m in messages) {
    if (messages[m].created_by !== username) {
      if (messages[m].broadcast) ids.push(messages[m])
      else if (
        messages[m].selected_participants.length > 0 &&
        messages[m].selected_participants.includes(username)
      )
        ids.push(messages[m])
      else if (messages[m].group) {
        let group = await Groups.findById(messages[m].group)
        if (group.selected_participants.includes(req.user.username))
          ids.push(messages[m])
      }
    }
  }
  res.status(200).json({
    status: 200,
    message: "Retrieved Notifications",
    data: ids
  })
}

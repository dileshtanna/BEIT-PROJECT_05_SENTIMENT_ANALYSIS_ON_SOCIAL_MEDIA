const Messages = require("../models/Messages")

module.exports.createMessage = async (req, res, next) => {
  const { message, selectedParticipants, group, broadcast } = req.body
  let newMessage = new Messages({
    message,
    selected_participants: selectedParticipants,
    group,
    broadcast,
    created_on: Date.now(),
    created_by: req.user.username
  })
  await newMessage.save()

  res.status(200).json({
    status: 200,
    message: "Created Notification"
  })
}

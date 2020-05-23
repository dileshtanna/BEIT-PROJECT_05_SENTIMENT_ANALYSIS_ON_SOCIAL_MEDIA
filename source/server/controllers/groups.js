const config = require("config")
const Groups = require("../models/Groups")

module.exports.createGroup = async (req, res, next) => {
  const username = req.user.username
  const { groupName, description, selectedParticipants } = req.body
  const date = new Date()

  const groups = Groups.find({ name: groupName })
  if (groups.length > 0)
    return res.status(400).send("Group name already exists.")

  const newGroup = new Groups({
    admin: username,
    name: groupName,
    description,
    created_on: date,
    selected_participants: selectedParticipants
  })
  let result = await newGroup.save()

  res.status(200).json({
    status: 200,
    result,
    message: "Created One Post"
  })
}

module.exports.getOwnGroups = async (req, res, next) => {
  const username = req.user.username

  const result = await Groups.find({ admin: username })
  console.log(result)

  res.status(200).json({
    status: 200,
    result,
    message: "Fetched Own Groups"
  })
}

const vader = require("vader-sentiment")
const Posts = require("../models/Posts")
const Users = require("../models/User")
const Groups = require("../models/Groups")

module.exports.getAllPosts = async (req, res, next) => {
  let result = await Posts.find({}).sort({ date: -1 })
  let posts = []
  result.map(async r => {
    let group
    if (r.selected_participants.length === 0 && !r.group) posts.push(r)
    else if (r.selected_participants.length > 0) {
      if (
        r.selected_participants.includes(req.user.username) ||
        r.username === req.user.username
      )
        posts.push(r)
    } else if (r.group) {
      group = await Groups.findById(r.group)
      if (
        (group && group.selected_participants.includes(req.user.username)) ||
        (group && group.admin === req.user.username)
      )
        posts.push(r)
    }
  })
  let resultantPosts = []
  for (let i in posts) {
    let group
    if (posts[i].group) {
      group = await Groups.findById(posts[i].group)
      posts[i].group = group
      let modPost = posts[i]
      modPost.group = group
      resultantPosts.push(modPost)
    } else resultantPosts.push(posts[i])
  }

  // console.log(result)
  res.status(200).json({
    status: 200,
    data: resultantPosts,
    message: "Retrieved Every Post"
  })
}

module.exports.likeAction = async (req, res, next) => {
  const { id } = req.params
  const { username } = req.user

  try {
    const results = await Posts.findById(id)
    if (results.likes.includes(username)) {
      results.likes = results.likes.filter(like => like !== username)
      await results.save()
      res.status(200).json({
        status: 200,
        message: "liked post successfully"
      })
    } else {
      results.likes.push(username)
      await results.save()
      res.status(200).json({
        status: 200,
        message: "liked post successfully"
      })
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
}

module.exports.getAllPostsFromUser = async (req, res, next) => {
  const username = req.user.username
  const result = await Posts.find({ username })

  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all posts"
  })
}

module.exports.getSinglePost = async (req, res, next) => {
  const { id } = req.params
  const result = await Posts.findById(id)
  if (result.group) {
    let group = await Groups.findById(result.group)
    result.group = group
  }

  res.status(200).json({
    status: 200,
    data: result,
    message: "Retrieved all posts"
  })
}

module.exports.createPost = async (req, res, next) => {
  const username = req.user.username
  const {
    post,
    postTitle,
    selectedParticipants,
    compulsoryAction,
    group
  } = req.body
  const date = new Date()

  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(post)

  const newPost = new Posts({
    username,
    post,
    postTitle,
    date,
    group,
    intensity: intensity.compound,
    selected_participants: selectedParticipants,
    compulsory_action: compulsoryAction
  })
  let result = await newPost.save()

  const user = await Users.findOne({ username })
  console.log(user)
  let score = user.score
  score = +score + +intensity.compound
  await Users.findOneAndUpdate({ username }, { $set: { score } })

  res.status(200).json({
    status: 200,
    data: result,
    score,
    message: "Created One Post"
  })
}

const express = require("express")
const route = express.Router()
const { Account, validateAccount } = require("../Schema/accountSchema")
const validateMiddleware = require("../Middlewares/validateMiddlewares")
const bcrypt = require("bcrypt")

route.post("/signup", validateMiddleware(validateAccount), async (req, res) => {
  console.log(req.body)
  try {
    const existAccount = await Account.findOne({ username: req.body.username })
    console.log(existAccount)
    if (!existAccount) {
      const account = new Account({
        username: req.body.username,
        password: req.body.password,
      })
      await account.save()
    } else res.status(200).json({ path: "username", error: "Tài khoản đã tồn tại" })
  } catch (err) {
    console.log(err)
  }
})

module.exports = route

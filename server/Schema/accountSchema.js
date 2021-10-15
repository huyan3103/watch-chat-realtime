const mongoose = require("mongoose")
const { Schema } = mongoose
const Joi = require("joi")

const accountSchema = new Schema({
  username: String,
  password: String,
})

const validateAccount = (account) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(30).required().messages({
      "string.min": "Độ dài phải từ 6-30 kí tự",
      "string.empty": "Không được để trống",
      "any.required": "Không được để trống",
    }),
    password: Joi.string()
      .min(8)
      .max(30)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required()
      .messages({
        "string.min": "Độ dài phải từ 8-30 kí tự",
        "string.empty": "Không được để trống",
        "any.required": "Không được để trống",
      }),
    repassword: Joi.equal(Joi.ref("password"))
      .required()
      .messages({ "any.only": "Mật khẩu không giống nhau" }),
  })
  return schema.validate(account)
}

const Account = mongoose.model("Account", accountSchema)

module.exports = { Account, validateAccount }

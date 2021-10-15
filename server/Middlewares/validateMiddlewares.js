module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body)
    if (error) {
      return res
        .status(200)
        .json({ path: error.details[0].path[0], error: error.details[0].message })
    }
    next()
  }
}

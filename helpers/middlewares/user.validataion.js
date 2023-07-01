const Joi = require("joi");
function validateUser(req, res, next) {
  const user = req.body;

  const schema = Joi.object({
    "name.first": Joi.string().min(3).max(45),
    "name.last": Joi.string().min(3).max(45),
    // name: Joi.string(),
    name: {
      first: Joi.string().min(3).max(45),
      last: Joi.string().min(3).max(45),
    },
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "in"] },
      })
      .error(() => new Error("Invalid email")),
    password: Joi.string()
      .allow("")
      .optional()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });

  const result = schema.validate(user);
  console.log("Result: ", result);
  if (result?.error)
    res.status(500).send({ message: result.error.message, error: null });
  else next();
}

module.exports = { validateUser };

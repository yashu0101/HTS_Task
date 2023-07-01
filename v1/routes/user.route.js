const router = require("express").Router(); //Router is middleware of express
const { validateUser } = require("../../helpers/middlewares/user.validataion");

const { createUser } = require("../controllers/user.controller");
router.post("/", validateUser, createUser); //!createuser

module.exports = router;

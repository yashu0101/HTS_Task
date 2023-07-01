const _ = require("lodash");
const { encrypt } = require("../../helpers/encryption");
const UserModel = require("../models/user.model");
const fs = require("fs");
const { send } = require("process");

class UserCtrl {
  static pickUser(user) {
    return _.pick(user, [
      "_id",
      "name",
      "mobile",
      "email",
      "file",
      "status",
      "gender",
      "address",
      "createdAt",
      "userId",
      "role",
    ]);
  }

  static createUser(req, res) {
    const user = req.body;

    //encript the password if available
    if (user.password) user.password = encrypt(user.password);

    new UserModel(user)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User Created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "User not Created", error: err });
      });
  } //createUser
}

module.exports = UserCtrl;

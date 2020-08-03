const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  UserModel.findByPk(req.params.id).then((userProfile) => {
    res.render("users/profile.ejs", {
      user: userProfile,
    });
  });
});

router.put('/profile/:id', (req, res) => {
  //res.send(req.body);
  UserModel.update(req.body, {
      where: { id: req.params.id },
      returning: true,
  }).then((user) => {
      res.redirect(`/users/profile/${req.params.id}`);
  });
});

router.delete('/:id', (req, res) => {
  UserModel.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect('/');
  });
});

module.exports = router;

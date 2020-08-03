const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const Recipe = require("../models").Recipe;

router.use(express.urlencoded({ extended: true }));

// router.use((req, res, next) => {
//     console.log('I run for all routes');
//     next();
// });

router.get("/:id", (req, res) => {
     UserModel.findByPk(req.params.id).then((userProfile) => {
         res.render("main.ejs", {
            user: userProfile,
         });
     });
});

module.exports = router;
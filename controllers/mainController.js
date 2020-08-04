const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const Recipe = require("../models").Recipe;
const Ingredient = require("../models").Ingredient;
const Step = require("../models").Step;

router.use(express.urlencoded({ extended: true }));

// router.use((req, res, next) => {
//     console.log('I run for all routes');
//     next();
// });

router.get("/:user", (req, res) => {
     UserModel.findByPk(req.params.user).then((userProfile) => {
         res.render("main.ejs", {
            user: userProfile,
         });
     });
});

router.get("/:user/recipeMenu", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.findAll().then((allRecipes) => {
            res.render("showrecipe.ejs", {
                user: userProfile,
                recipe: allRecipes,
            });
        });
    });
});

router.get("/:user/recipeEditAdd/:recipe", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.findByPk(req.params.recipe, {
            include: [
                        { model: Ingredient }, 
                        { model: Step }
                    ],
       }).then((foundRecipe) => {
            res.render("recipeEditAdd.ejs", {
                user: userProfile,
                recipe: foundRecipe,
            });
        });
    });
});

router.get("/:user/detalle/:id", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.findByPk(req.params.id, {
         include: [
                     { model: Ingredient }, 
                     { model: Step }
                 ],
    }).then((recipe) => {
             res.render("recipedet.ejs", {
                 user: userProfile,
                 recipe: recipe,
             });
        });
    });
});

module.exports = router;
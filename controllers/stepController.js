const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const Recipe = require("../models").Recipe;
const Ingredient = require("../models").Ingredient;
const Step = require("../models").Step;

router.use(express.urlencoded({ extended: true }));

//  router.use((req, res, next) => {
//       console.log('I run for all routes');
//       next();
//  });


 router.get("/:recipe/new", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        res.send(foundRecipe);
        // res.render("newStep.ejs", {
        //      recipe: foundRecipe
        // }); 
    });
});

router.post("/:recipe/new", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Step.create(req.body).then((newStep) => {
            res.redirect(`/step/${foundRecipe.id}/${newStep.id}`);
        });
    });
});

router.get("/:recipe/:id", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Step.findByPk(req.params.id).then((foundStep) => {
            res.send(foundStep);
            // res.render("editStep.ejs", {
            //     recipe: foundRecipe,
            //     step: foundStep,
            // });
        });
    });
});

router.put("/:recipe/:id", (req, res) => {
    req.body.description = req.body.description.trim();
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Step.update(req.body, {
            where: { id: req.params.id ,
                     recipeId: foundRecipe.id,
                    },
            returning: true,
        }).then((step) => {
            res.redirect(`/step/${foundRecipe.id}/${req.params.id}`);
        });
    });
});

router.delete('/:recipe/:id', (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Step.destroy({ where: { id: req.params.id } }).then(() => {
            // res.redirect(`/recipe/${userProfile.id}`);
            res.send('Deleted Step');
        });
    });
 });


 module.exports = router;
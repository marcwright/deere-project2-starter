const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const Recipe = require("../models").Recipe;
const Ingredient = require("../models").Ingredient;
const Step = require("../models").Step;

router.use(express.urlencoded({ extended: true }));

// router.use((req, res, next) => {
//      console.log('I run for all routes');
//      next();
// });

router.get("/:recipe/:id", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Ingredient.findByPk(req.params.id).then((foundIngredient) => {
            res.render("editIngre.ejs", {
                recipe: foundRecipe,
                ingredient: foundIngredient,
            });
        });
    });
});

router.put("/:recipe/:id", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Ingredient.update(req.body, {
            where: { id: req.params.id ,
                     recipeId: foundRecipe.id,
                    },
            returning: true,
        }).then((ingre) => {
            res.redirect(`/ingre/${foundRecipe.id}/edit/${ingre.id}`);
        });
    });
});


router.get("/:recipe/new", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        res.render("newIngre.ejs", {
            recipe: foundRecipe
        });
    });
});


router.post("/:recipe/new", (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Ingredient.create(req.body).then((newIngre) => {
            res.redirect(`/recipe/${foundRecipe.id}/${newIngre.id}`);
        });
    });
});

router.delete('/:recipe/:id', (req, res) => {
    Recipe.findByPk(req.params.recipe).then((foundRecipe) => {
        Ingredient.destroy({ where: { id: req.params.id } }).then(() => {
            // res.redirect(`/recipe/${userProfile.id}`);
            res.send('Deleted Ingredient');
        });
    });
 });


module.exports = router;
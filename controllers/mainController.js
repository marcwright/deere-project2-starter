const express = require("express");
const router = express.Router();

const UserModel = require("../models").User;
const Recipe = require("../models").Recipe;
const Ingredient = require("../models").Ingredient;
const Step = require("../models").Step;
const Preparation = require("../models").Preparation;
const prepIngredient = require("../models").prepIngredient;
const prepStep = require("../models").prepStep;

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
           //console.log(foundRecipe);
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

router.get("/:user/prep/:recipe/", (req, res) => {
    let isFine = true;
    Recipe.findByPk(req.params.recipe, {
        include: [
                    { model: Ingredient }, 
                    { model: Step }
                ],
    }).then((myCompleteRecipe) => {
        Preparation.create({ userId: req.params.user,
            recipeId: myCompleteRecipe.id,
            status: null,
            comments: null}).then((myCompletePrep) => {
                myCompleteRecipe.Ingredients.forEach((ingre) => {
                    prepIngredient.create({
                        prepId: myCompletePrep.id,
                        ingredientId: ingre.id,
                        checked: null 
                    }).then((prepIngre) => {console.log(prepIngre.id);}).catch((err) => {isFine = false;});
                });
                myCompleteRecipe.Steps.forEach((step) => {
                            prepStep.create({
                                    prepId: myCompletePrep.id,
                                    stepId: step.id,
                                    checked: null 
                            }).then((prepStep) => {        
                                console.log(prepStep.id);
                            }).catch((err) => {isFine = false;  console.log('Toy aca');}); 
                }); 
                console.log(myCompletePrep.id);
                res.send('Preparation Created.');
                // res.render("showPreparation.ejs", {
                //               prep: myCompletePrep,
                //               prepIngre: wholePrepModel.prepIngredients,
                //               prepStep: wholePrepModel.prepSteps,
                //           });

        });
    });
});

module.exports = router;
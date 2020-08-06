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

router.get("/:user/edit/:recipe", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.findByPk(req.params.recipe).then((recipe) => {
            res.render("editRecipe.ejs", {
                user: userProfile,
                recipe: recipe,
            });
        });
    });
});

router.put("/:user/edit/:recipe", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.update(req.body, {
            where: { id: req.params.recipe },
            returning: true,
        }).then((recipe) => {
            //res.redirect(`/recipe/${userProfile.id}/edit/${recipe.id}`);
            res.redirect(`/recipe/${userProfile.id}/edit/${req.params.recipe}`);
        });
    });
});

router.delete('/:user/edit/:recipe', (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.destroy({ where: { id: req.params.recipe } }).then(() => {
            res.redirect(`/main/${userProfile.id}/recipeMenu`);
        });
    });
});

router.get("/:user/new", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        res.render("newRecipe.ejs", {
              user: userProfile
        });
    });
});

router.post("/:user/new", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Recipe.create(req.body).then((newRecipe) => {
            //res.redirect(`/recipe/${userProfile.id}/edit/${newRecipe.id}`);
            //res.redirect(`/recipe/edit/${userProfile.id}/${newRecipe.id}`);
            res.redirect(`/main/${userProfile.id}/recipeEditAdd/${newRecipe.id}`);
        });
    });
});

// router.get("/edit/:user/:id", (req, res) => {
//     UserModel.findByPk(req.params.user).then((userProfile) => {
//         Recipe.findByPk(req.body).then((newRecipe) => {
//             //res.redirect(`/recipe/${userProfile.id}/edit/${newRecipe.id}`);
//             res.render("newRecipe.ejs", {
//                 user: userProfile
//             });
//             res.redirect(`/recipe/edit/${userProfile.id}/${newRecipe.id}`);
//         });
//     });
// });


//  router.get("/:user/:id", (req, res) => {
//     UserModel.findByPk(req.params.user).then((userProfile) => {
//        Recipe.findByPk(req.params.id, {
//         include: [
//                     { model: Ingredient }, 
//                     { model: Step }
//                 ],
//       }).then((recipe) => {
//             res.render("recipedet.ejs", {
//                 user: userProfile,
//                 recipe: recipe,
//             });
//        });
//     });
// });

module.exports = router;
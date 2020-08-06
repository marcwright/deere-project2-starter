const express = require("express");
const prepingredient = require("../models/prepingredient");
const router = express.Router();

const UserModel = require("../models").User;
const Recipe = require("../models").Recipe;
const Ingredient = require("../models").Ingredient;
const Step = require("../models").Step;
const Preparation = require("../models").Preparation;
const prepIngredient = require("../models").prepIngredient;
const prepStep = require("../models").prepStep;

router.use(express.urlencoded({ extended: true }));


router.get("/history/:user", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Preparation.findAll({
            where: { userId: req.params.user },
            order: [
                ['id', 'DESC'],
            ],
        }).then((prepModel) => {
            res.render("prepHistory.ejs", {
                user: userProfile,
                prep: prepModel,
            });
        });
    });
});

// include: [
//     {
//         model: Invite,
//         include: [Group]
//     }
// ]

router.get("/showOne/:user/:prep/", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Preparation.findByPk(req.params.prep, {
            include: [
                        { model: prepIngredient,
                          //include: [Ingredient],
                         }, 
                        { model: prepStep,
                            as: 'pSteps',
                            //include: [Step],
                        },
                    ],
        }).then((prepModel) => {
            //res.send(prepModel);
            res.render("showOnePrep.ejs", {
                 user: userProfile,
                 prep: prepModel,
            });
        });
    });
});

router.get("/:user/edit/:prep", (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Preparation.findByPk(req.params.prep, {
            include: [{ model: Recipe } ],
        }).then((foundPrep) => {
            //res.send(foundPrep);
            res.render("editPreparation.ejs", {
                user: userProfile,
                prep: foundPrep,
            });
        });
    });
});

router.put("/:user/edit/:prep", (req, res) => {
    if(req.body.status == 'true' || req.body.status == true){ 
        req.body.status = true; 
    } else { 
        req.body.status = false;
    }
    req.body.comments = req.body.comments.trim();
    // console.log(req.body);
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Preparation.update(req.body, {
            where: { id: req.params.prep },
            returning: true,
        }).then((preparation) => {
            //res.redirect(`/recipe/${userProfile.id}/edit/${recipe.id}`);
            res.redirect(`/prep/${userProfile.id}/edit/${req.params.prep}`);
        });
    });
});

router.delete('/:user/edit/:prep', (req, res) => {
    UserModel.findByPk(req.params.user).then((userProfile) => {
        Preparation.destroy({ where: { id: req.params.prep } }).then(() => {
            res.redirect(`/main/${userProfile.id}/recipeMenu`);
        });
    });
});

module.exports = router;
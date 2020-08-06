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

router.get("/:prep/:id", (req, res) => {
    Preparation.findByPk(req.params.prep).then((foundPrep) => {
        prepStep.findByPk(req.params.id, {
            include: [{ model: Step }],
        }).then((foundPrepStep) => {
                res.render("editPrepStep.ejs", {
                    prep: foundPrep,
                    prepStep: foundPrepStep,
                });
        });
    });
});

router.put("/:prep/:id", (req, res) => {
    req.body.comments = req.body.comments.trim();
    if(req.body.checked == 'true' || req.body.checked == true){ 
        req.body.checked = true; 
    } else { 
        req.body.checked = false;
    }

    Preparation.findByPk(req.params.prep).then((foundPrep) => {
        prepStep.update(req.body, {
            where: { id: req.params.id ,
                     prepId: req.params.prep,
                    },
            returning: true,
        }).then((step) => {
            res.redirect(`/prepStep/${foundPrep.id}/${req.params.id}`);
        });
    });
});


module.exports = router;
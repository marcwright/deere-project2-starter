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
        prepIngredient.findByPk(req.params.id, {
            include: [{ model: Ingredient }],
        }).then((foundPrepIngre) => {
            //res.send(foundPrepIngre);
            res.render("editPrepIngre.ejs", {
                 prep: foundPrep,
                 prepIngre: foundPrepIngre
             });
        });
    });
});

router.put("/:prep/:id", (req, res) => {
    if(req.body.checked == 'true' || req.body.checked == true){ 
        req.body.checked = true; 
    } else { 
        req.body.checked = false;
    }

    Preparation.findByPk(req.params.prep).then((foundPrep) => {
        prepIngredient.update(req.body, {
            where: { id: req.params.id ,
                     prepId: foundPrep.id,
                    },
            returning: true,
        }).then((ingre) => {
            res.redirect(`/prepIngre/${foundPrep.id}/${req.params.id}`);
        });
    });
});

module.exports = router;
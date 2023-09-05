const express = require("express");
var router = express.Router();


router.get("/new-data", function (req, res) {
    res.json({message: "new-data"});
});

module.exports = router;

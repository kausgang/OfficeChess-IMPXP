var express = require("express");
const app = require("../app");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // console.log(req.app.locals.labels);
  // res.render("index", { title: "Express", labels: "", fens: "" });
  res.render("index", {
    title: "OfficeChess",
    labels: req.app.locals.labels,
    fens: req.app.locals.fens,
  });
});

module.exports = router;

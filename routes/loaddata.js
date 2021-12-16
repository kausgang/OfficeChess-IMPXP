var express = require("express");
const multer = require("multer");
const fs = require("fs");
var path = require("path");
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const upload = multer({ dest: "public/uploads/" });

router.post("/", upload.single("fenlist"), function (req, res, next) {
  // if no file selected
  if (req.file === undefined) {
    // res.send("<h1>Go Back and select file</h1>");
    // res.render("index", { labels: "", fens: "" });
    req.app.locals.labels = [];
    req.app.locals.fens = [];
    res.redirect("/");
    return null;
  }

  server_filename = path.join("public", "uploads", req.file.filename);
  data = fs.readFileSync(server_filename, { encoding: "utf8", flag: "r" });

  // delete server file
  fs.unlink(server_filename, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });

  var rows = data.trim().split(/\r?\n|\r/); // Regex to split/separate the CSV rows

  // labels = [];
  // fens = [];

  req.app.locals.labels = [];
  req.app.locals.fens = [];

  rows.forEach((element) => {
    row_data = element.split(",");
    label = row_data[0].split(/>(.*)</)[1];
    fen = row_data[1];
    // labels.push(label);
    // fens.push(fen);
    req.app.locals.labels.push(label);
    req.app.locals.fens.push(fen);
  });

  // res.render("index", { labels: labels, fens: fens });
  res.redirect("/");
  // next();
});
module.exports = router;

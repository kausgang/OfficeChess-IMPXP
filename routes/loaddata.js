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
  // console.log(req.file.filename);
  // if (req.file.filename == "undefined")
  //   res.send("go back and select file to import");

  server_filename = path.join("public", "uploads", req.file.filename);
  data = fs.readFileSync(server_filename, { encoding: "utf8", flag: "r" });
  // res.send(data);

  // delete server file
  fs.unlink(server_filename, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });

  var rows = data.trim().split(/\r?\n|\r/); // Regex to split/separate the CSV rows

  labels = [];
  fens = [];

  // res.locals.labels = [];
  // res.locals.fens = [];

  rows.forEach((element) => {
    row_data = element.split(",");
    label = row_data[0].split(/>(.*)</)[1];
    fen = row_data[1];
    labels.push(label);
    fens.push(fen);
    // res.locals.labels.push(label);
    // res.locals.fens.push(fen);
  });

  // res.redirect("/");
  res.render("index", { labels: labels, fens: fens });
  // next();
});
module.exports = router;

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
  if (req.file === undefined) res.send("<h1>Go Back and select file</h1>");

  server_filename = path.join("public", "uploads", req.file.filename);
  data = fs.readFileSync(server_filename, { encoding: "utf8", flag: "r" });
  console.log(data);

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

  // delete server file
  fs.unlink(server_filename, function (err) {
    if (err) return console.log(err);
    console.log("file deleted successfully");
  });

  console.log(labels, fens);
  res.render("index", { labels: labels, fens: fens });
  // next();
});
module.exports = router;

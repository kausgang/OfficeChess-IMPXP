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
  server_filename = path.join("public", "uploads", req.file.filename);
  data = fs.readFileSync(server_filename, { encoding: "utf8", flag: "r" });
  // res.send(data);

  // delete server file
  // fs.unlink(server_filename, function (err) {
  //   if (err) return console.log(err);
  //   console.log("file deleted successfully");
  // });

  var rows = data.trim().split(/\r?\n|\r/); // Regex to split/separate the CSV rows
  row0 = rows[0].split(",");
  // split(/>(.*)</)
  console.log(row0[0].split(/>(.*)</)[1]);

  res.render("index", { data: data });
  // console.log(data);
});
module.exports = router;

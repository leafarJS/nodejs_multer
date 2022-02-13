const express = require("express");
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

//initialization
const app = express();

//settings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middlewares
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/uploads"),
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif|jfif/;
      const mineType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));
      if (mineType && extname) {
        return cb(null, true);
      }
      cb("Error |=> El archivo debe ser de tipo image");
    },
  }).single("image")
);

//routes
app.use(require("./routes/indexRoutes"));

//static files
app.use(express.static(path.join(__dirname, "public")));
//star the server
app.listen(app.get("port"), () => {
  console.log(`Server on port: ${app.get("port")}`);
});

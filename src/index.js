const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");

const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const hbs = expressHandlebars.create({});
const app = express();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`Navigate to http://localhost:${PORT}`));

const SpacedRepCard = require("./models/spaced-rep-card");

require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors"),
  userRoutes = require("./routes/user"),
  todoRoutes = require("./routes/todo");
spacedRepRoutes = require("./routes/spaced-rep");
markdownRoutes = require("./routes/markdown");

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODBATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongodb atlas"))
  .catch((error) => handleError(error));

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

//using user route
app.use(userRoutes);
app.use(todoRoutes);
app.use(spacedRepRoutes);
app.use(markdownRoutes);
//setup server to listen on port 8080
app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});

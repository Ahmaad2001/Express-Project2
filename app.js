const connectDb = require("./database");
const PORT = 8000;
const errorHandler = require("./middleswares/errorHandler");
const notFoundHandler = require("./middleswares/notFoundHandler");
const express = require("express");
const userRoutes = require("./api/user/user.routes");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();

connectDb();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

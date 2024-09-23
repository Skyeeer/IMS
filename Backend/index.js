require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./db/graphql/graphqlSchema");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

//const productRouter = require("./db/routes/productRouter");
//const manufacturerRouter = require("./db/routes/manufacturerRouter");

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster01.8ffgk.mongodb.net/IMSdb?retryWrites=true&w=majority`
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use(
  "/graphql",
  cors(),
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

/*app.use("/products", productRouter);
app.use("/manufacturers", manufacturerRouter);*/

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

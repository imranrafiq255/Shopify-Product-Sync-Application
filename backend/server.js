const app = require("./app.js");
const { envVariables } = require("./config/env.config.js");
const port = envVariables.port || 4501;
//Testing api for shopify console
app.get("/", (req, res) => {
  return res.json({
    message: "I am ok",
  });
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

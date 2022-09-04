import app from "./src/server";

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening on ports   ${port}`);
});

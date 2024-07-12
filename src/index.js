import app from "./app.js";
import connectToDb from "./db/index.js";

connectToDb()
  .then(() => {
    app.listen(process.env.PORT | 8000, () => {
      console.log(`app is running on port:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while running the app", err);
  });
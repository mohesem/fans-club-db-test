import mongoose from "mongoose";
import Team from "./models/teamsModel";

mongoose.connect("mongodb://localhost:27017/fansclub", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", async () => {
  console.log("MongoDB connected");

  try {
    const count = await Team.countDocuments({}).exec();
    console.log(count);
    const nu = 1;
    
    (async function loop() {
      if (nu < count) {
        const team = await Team.find()
          .limit(1)
          .skip(count - 1)
          .exec();
        console.log(team);
        nu + 1;
        loop();
      } else {
        return;
      }
    })();
  } catch (error) {
    console.error(error);
  }
});

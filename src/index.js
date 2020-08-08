import mongoose from "mongoose";
import Team from './models/teamsModel'

mongoose.connect("mongodb://localhost:27017/fansclub", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  log("MongoDB connected");
    (async () => {

        const count = await Team.countDocuments({})
        console.log(count)

    })
});

import mongoose from "mongoose";
import Team from "./models/teamsModel";

mongoose.connect("mongodb://localhost:27017/fansclub", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
  async () => {
   Team.countDocuments({}, (err, count) => { 
       if (err) console.log('error on counting teams')
       console.log('total teams count is : ', count)
   });

  };
});

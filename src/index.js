import mongoose from "mongoose";
import Team from "./models/teamsModel";
import fs from "fs";

mongoose.connect("mongodb://localhost:27017/fansclub", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const findImg = (country, city, name) => {
  return new Promise((resolve) => {
    console.log(`${__dirname}/logo/${country + city + name}`);
    fs.readFile(
      `${__dirname}/logo/${country + city + name}.png`,
      (errRead, img) => {
        if (img) {
          // console.log('imaaaaaaaaaaage found');
          resolve(img);
        } else {
          fs.readFile(
            `${__dirname}/logo/${country + city + name}.jpg`,
            (errRead2, img2) => {
              if (img2) {
                //   console.log('imaaaaaaaaaaage found');
                resolve(img2);
              } else {
                resolve("");
              }
            }
          );
        }
      }
    );
  });
};

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
          .skip(nu - 1)
          .exec();
        console.log(team);
        const logo = await findImg(team.country, team.city, team.name);
        // console.log(logo)
        if (logo) console.log("found logo");
        // else console.log('wrong')
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

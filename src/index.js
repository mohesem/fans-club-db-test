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
    // console.log(`${__dirname}/logo/${country + city + name}`);
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

  let logs = "";

  try {
    const count = await Team.countDocuments({}).exec();
    console.log(count);
    let nu = 1;

    (async function loop() {
      if (nu <= count - 2) {
        console.log(nu);
        const team = await Team.find()
          .limit(1)
          .skip(nu + 1)
          .exec();
        // console.log(team);
        if (
          (team[0].group !== "CAF" ||
            team[0].group !== "OCF" ||
            team[0].group !== "NF" ||
            team[0].group !== "Non NF") &&
          (team[0]?.country, team[0]?.city, team[0]?.name)
        ) {
          const logo = await findImg(
            team[0].country,
            team[0].city,
            team[0].name
          );
          // console.log(logo)
          if (!logo) {
            logs += `${team[0]} \n`;
          }
        } else {
          logs += `${team[0]} \n`;
        }

        // else console.log('wrong')
        nu = nu + 1;
        loop();
      } else {
        fs.writeFile("./logs.txt", logs, (err) => {
          console.log(err);
        });
        return;
      }
    })();
  } catch (error) {
    console.error(error);
  }
});

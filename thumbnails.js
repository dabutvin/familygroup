const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const writeFile = util.promisify(fs.writeFile);
const imageThumbnail = require("image-thumbnail");

async function go() {
  try {
    const names = await readdir("./src/photos/");
    for (let name of names.filter(
      x => [".DS_Store", "thumbs"].indexOf(x) === -1
    )) {
      console.log(name);
      let thumbnail = await imageThumbnail(`src/photos/${name}`, {
        percentage: 40
      });
      await writeFile(`./src/photos/thumbs/${name}`, thumbnail);
    }
  } catch (err) {
    console.error(err);
  }
}
go();

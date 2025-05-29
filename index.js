import generateName from "sillyname";
import superheroes, { randomSuperhero } from "superheroes";
import fs from "fs";
import { input } from "@inquirer/prompts";

import qr from "qr-image";

var sillyName = generateName();

const answer = await input({
  message: "Enter your website url",
  required: true,
});

var qr_svg = qr.image(answer);
qr_svg.pipe(fs.createWriteStream("qr.png"));

console.log("Your name is:", answer);

console.log("Silly Name:", sillyName);
console.log("Random Superhero:", randomSuperhero());

fs.writeFile("output.txt", sillyName, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("File written successfully!");
  }
});

fs.writeFile("output2.txt", answer, (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("File written successfully!");
  }
});

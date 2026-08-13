"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./translator/core");
const core = new core_1.FluxerTranslatorCore();
const input = `
const embed = new EmbedBuilder()
  .setTitle("Hello")
  .setDescription("This is a test")
  .setColor(0x00FF00)
  .addFields({ name: "A", value: "B", inline: true })
  .setFooter({ text: "Footer text" })
  .setAuthor({ name: "Author name" });

msg.channel.send({ embeds: [embed] });
`;
console.log("INPUT:\n");
console.log(input);
console.log("\nOUTPUT:\n");
console.log(core.translate(input));

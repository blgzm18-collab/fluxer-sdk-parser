 
import { FluxerTranslatorCore } from "./translator/core";

const core = new FluxerTranslatorCore();

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

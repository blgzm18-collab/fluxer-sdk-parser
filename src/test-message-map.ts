import { FluxerTranslatorCore } from "./translator/core";

const core = new FluxerTranslatorCore();

const input = `
client.on("messageCreate", (msg) => {
  console.log(msg.author.id);
  msg.reply("Hello!");
  msg.channel.send("Ping!");
});
`;

console.log("INPUT:\n");
console.log(input);

console.log("\nOUTPUT:\n");
console.log(core.translate(input));

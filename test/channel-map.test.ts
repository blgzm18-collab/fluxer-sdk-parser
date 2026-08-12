import { FluxerTranslatorCore } from "../src/translator/core";

const core = new FluxerTranslatorCore();

const input = `
client.on("messageCreate", (msg) => {
  msg.channel.send("Hello!");
  msg.channel.bulkDelete(10);
  msg.channel.setTopic("New Topic");
  msg.channel.setName("general-chat");
  msg.channel.createInvite();
});
`;

console.log("INPUT:\n");
console.log(input);

console.log("\nOUTPUT:\n");
console.log(core.translate(input));

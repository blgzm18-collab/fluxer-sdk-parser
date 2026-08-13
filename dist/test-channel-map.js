"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./translator/core");
const core = new core_1.FluxerTranslatorCore();
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

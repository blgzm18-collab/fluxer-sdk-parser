"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./translator/core");
const core = new core_1.FluxerTranslatorCore();
const input = `
msg.channel.permissionOverwrites.edit(staffRole, {
  ViewChannel: false,
  SendMessages: true
});

msg.channel.permissionOverwrites.create(msg.author, {
  ViewChannel: true
});
`;
console.log("INPUT:\n");
console.log(input);
console.log("\nOUTPUT:\n");
console.log(core.translate(input));

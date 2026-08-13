import { FluxerTranslatorCore } from "../src/translator/core";

const core = new FluxerTranslatorCore();

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

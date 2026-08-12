import { FluxerTranslatorCore } from "./translator/core";

const core = new FluxerTranslatorCore();

const input = `
guild.roles.create({
  name: "Staff",
  permissions: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
});

staffRole.setPermissions([PermissionFlagsBits.ManageMessages]);

staffRole.edit({
  name: "Moderators",
  permissions: [PermissionFlagsBits.ViewChannel]
});
`;

console.log("INPUT:\n");
console.log(input);

console.log("\nOUTPUT:\n");
console.log(core.translate(input));

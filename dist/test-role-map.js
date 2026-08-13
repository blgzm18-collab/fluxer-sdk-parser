"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./translator/core");
const core = new core_1.FluxerTranslatorCore();
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

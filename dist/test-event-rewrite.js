"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./translator/core");
const core = new core_1.FluxerTranslatorCore();
const input = `
client.on("messageCreate", (msg) => {
  console.log(msg.content);
});

client.on("ready", () => {
  console.log("Bot online");
});
`;
console.log(core.translate(input));

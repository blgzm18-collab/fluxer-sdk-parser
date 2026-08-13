import { FluxerTranslatorCore } from "./translator/core";

const core = new FluxerTranslatorCore();

const input = `
client.on("messageCreate", (msg) => {
  console.log(msg.content);
});

client.on("ready", () => {
  console.log("Bot online");
});
`;

console.log(core.translate(input));

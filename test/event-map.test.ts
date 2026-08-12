import { FluxerTranslatorCore } from "../src/translator/core";

const core = new FluxerTranslatorCore();

const events = [
  "ready",
  "messageCreate",
  "interactionCreate",
  "guildMemberAdd"
];

for (const ev of events) {
  console.log(ev, "→", core.events.mapEvent(ev));
}

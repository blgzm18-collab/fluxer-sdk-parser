"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./translator/core");
const core = new core_1.FluxerTranslatorCore();
const events = [
    "ready",
    "messageCreate",
    "interactionCreate",
    "guildMemberAdd"
];
for (const ev of events) {
    console.log(ev, "→", core.events.mapEvent(ev));
}

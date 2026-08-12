"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerChannelMapper = void 0;
class FluxerChannelMapper {
    constructor(core) {
        this.core = core;
    }
    rewrite(code) {
        let out = code;
        // Allow dotted channel paths: msg.channel, interaction.channel, etc.
        const CH = "([A-Za-z0-9_.]+)";
        // 1. channel.send(x) → channel.createMessage(x)
        out = out.replace(new RegExp(`\\b${CH}\\.send\\s*\\(([^)]*)\\)`, "g"), "$1.createMessage($2)");
        // 2. channel.bulkDelete(n) → channel.purgeMessages(n)
        out = out.replace(new RegExp(`\\b${CH}\\.bulkDelete\\s*\\(([^)]*)\\)`, "g"), "$1.purgeMessages($2)");
        // 3. channel.setTopic(x) → channel.update({ topic: x })
        out = out.replace(new RegExp(`\\b${CH}\\.setTopic\\s*\\(([^)]*)\\)`, "g"), "$1.update({ topic: $2 })");
        // 4. channel.setName(x) → channel.update({ name: x })
        out = out.replace(new RegExp(`\\b${CH}\\.setName\\s*\\(([^)]*)\\)`, "g"), "$1.update({ name: $2 })");
        // 5. channel.createInvite() → channel.invites.create()
        out = out.replace(new RegExp(`\\b${CH}\\.createInvite\\s*\\(\\)`, "g"), "$1.invites.create()");
        return out;
    }
}
exports.FluxerChannelMapper = FluxerChannelMapper;

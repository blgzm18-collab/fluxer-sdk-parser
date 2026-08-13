"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerMessageMapper = void 0;
class FluxerMessageMapper {
    constructor(core) {
        this.core = core;
    }
    rewrite(code) {
        let out = code;
        // 1. msg.author.id → msg.user.id
        out = out.replace(/\bmsg\.author\.id\b/g, "msg.user.id");
        // 2. msg.author → msg.user
        out = out.replace(/\bmsg\.author\b/g, "msg.user");
        // 3. msg.member → msg.user
        out = out.replace(/\bmsg\.member\b/g, "msg.user");
        // 4. msg.reply(x) → msg.channel.createMessage(x)
        out = out.replace(/msg\.reply\s*\(([^)]*)\)/g, "msg.channel.createMessage($1)");
        // 5. msg.channel.send(x) → msg.channel.createMessage(x)
        out = out.replace(/msg\.channel\.send\s*\(([^)]*)\)/g, "msg.channel.createMessage($1)");
        return out;
    }
}
exports.FluxerMessageMapper = FluxerMessageMapper;

import { FluxerTranslatorCore } from "./core";

export class FluxerMessageMapper {
  core: FluxerTranslatorCore;

  constructor(core: FluxerTranslatorCore) {
    this.core = core;
  }

  rewrite(code: string): string {
    let out = code;

    // 1. msg.author.id → msg.user.id
    out = out.replace(/\bmsg\.author\.id\b/g, "msg.user.id");

    // 2. msg.author → msg.user
    out = out.replace(/\bmsg\.author\b/g, "msg.user");

    // 3. msg.member → msg.user
    out = out.replace(/\bmsg\.member\b/g, "msg.user");

    // 4. msg.reply(x) → msg.channel.createMessage(x)
    out = out.replace(
      /msg\.reply\s*\(([^)]*)\)/g,
      "msg.channel.createMessage($1)"
    );

    // 5. msg.channel.send(x) → msg.channel.createMessage(x)
    out = out.replace(
      /msg\.channel\.send\s*\(([^)]*)\)/g,
      "msg.channel.createMessage($1)"
    );

    return out;
  }
}

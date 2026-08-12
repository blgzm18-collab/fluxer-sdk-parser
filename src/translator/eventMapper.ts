 import { FluxerTranslatorCore } from "./core";

export class FluxerEventMapper {
  core: FluxerTranslatorCore;

  // Discord.js → Fluxer event name map
  private eventMap: Record<string, string> = {
    // Core client events
    ready: "ClientReady",
    messageCreate: "MessageCreate",
    messageUpdate: "MessageUpdate",
    messageDelete: "MessageDelete",
    interactionCreate: "InteractionCreate",
    guildCreate: "GuildCreate",
    guildDelete: "GuildDelete",
    guildMemberAdd: "GuildMemberAdd",
    guildMemberRemove: "GuildMemberRemove",
    channelCreate: "ChannelCreate",
    channelDelete: "ChannelDelete",
    channelUpdate: "ChannelUpdate",
    // Add more as you learn Fluxer’s naming
  };

  constructor(core: FluxerTranslatorCore) {
    this.core = core;
  }

  mapEvent(discordEvent: string): string | null {
    const fluxerEvent = this.eventMap[discordEvent];
    if (!fluxerEvent) return null;

    // Optional: verify it exists in Fluxer enums/classes
    const enumMatch = this.core.fluxer.enums.find(e =>
      e.values?.includes(fluxerEvent)
    );

    return fluxerEvent;
  }
}

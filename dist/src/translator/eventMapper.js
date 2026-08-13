"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerEventMapper = void 0;
class FluxerEventMapper {
    constructor(core) {
        // Discord.js → Fluxer event name map
        this.eventMap = {
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
        this.core = core;
    }
    mapEvent(discordEvent) {
        const fluxerEvent = this.eventMap[discordEvent];
        if (!fluxerEvent)
            return null;
        // Optional: verify it exists in Fluxer enums/classes
        const enumMatch = this.core.fluxer.enums.find(e => e.values?.includes(fluxerEvent));
        return fluxerEvent;
    }
}
exports.FluxerEventMapper = FluxerEventMapper;

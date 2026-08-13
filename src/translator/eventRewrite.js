"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerEventRewrite = void 0;
class FluxerEventRewrite {
    constructor(core) {
        this.core = core;
    }
    rewrite(code) {
        return code.replace(/client\.on\(\s*["'`](.*?)["'`]\s*,/gs, (match, eventName) => {
            const fluxerEvent = this.core.events.mapEvent(eventName);
            if (!fluxerEvent)
                return match;
            return `client.events.on("${fluxerEvent}",`;
        });
    }
}
exports.FluxerEventRewrite = FluxerEventRewrite;

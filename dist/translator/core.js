"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerTranslatorCore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const eventMapper_1 = require("./eventMapper");
const eventRewrite_1 = require("./eventRewrite");
const messageMapper_1 = require("./messageMapper");
const channelMapper_1 = require("./channelMapper");
class FluxerTranslatorCore {
    constructor() {
        this.fluxer = this.loadFluxerMeta();
        this.discord = this.loadDiscordMeta();
        this.events = new eventMapper_1.FluxerEventMapper(this);
        this.eventRewrite = new eventRewrite_1.FluxerEventRewrite(this);
        this.messageMapper = new messageMapper_1.FluxerMessageMapper(this);
        this.channelMapper = new channelMapper_1.FluxerChannelMapper(this);
    }
    loadFluxerMeta() {
        const file = path.join(__dirname, "..", "..", "fluxer-sdk-meta.json");
        return JSON.parse(fs.readFileSync(file, "utf8"));
    }
    loadDiscordMeta() {
        return {
            classes: [],
            interfaces: [],
            enums: [],
            typeAliases: []
        };
    }
    translate(code) {
        let out = code;
        out = this.eventRewrite.rewrite(out);
        out = this.messageMapper.rewrite(out);
        out = this.channelMapper.rewrite(out);
        return out;
    }
}
exports.FluxerTranslatorCore = FluxerTranslatorCore;

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerTranslatorCore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const eventMapper_1 = require("./eventMapper");
const eventRewrite_1 = require("./eventRewrite");
const messageMapper_1 = require("./messageMapper");
const channelMapper_1 = require("./channelMapper");
const embedMapper_1 = require("./embedMapper");
const permissionMapper_1 = require("./permissionMapper");
const roleMapper_1 = require("./roleMapper");
class FluxerTranslatorCore {
    constructor() {
        this.fluxer = this.loadFluxerMeta();
        this.discord = this.loadDiscordMeta();
        this.events = new eventMapper_1.FluxerEventMapper(this);
        this.eventRewrite = new eventRewrite_1.FluxerEventRewrite(this);
        this.messageMapper = new messageMapper_1.FluxerMessageMapper(this);
        this.channelMapper = new channelMapper_1.FluxerChannelMapper(this);
        this.embedMapper = new embedMapper_1.FluxerEmbedMapper(this);
        this.permissionMapper = new permissionMapper_1.FluxerPermissionMapper(this);
        this.roleMapper = new roleMapper_1.FluxerRoleMapper(this);
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
        out = this.embedMapper.rewrite(out);
        out = this.permissionMapper.rewrite(out);
        out = this.roleMapper.rewrite(out);
        return out;
    }
}
exports.FluxerTranslatorCore = FluxerTranslatorCore;

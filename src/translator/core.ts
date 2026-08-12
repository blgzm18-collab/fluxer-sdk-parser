import * as fs from "fs";
import * as path from "path";
import { FluxerEventMapper } from "./eventMapper";
import { FluxerEventRewrite } from "./eventRewrite";
import { FluxerMessageMapper } from "./messageMapper";
import { FluxerChannelMapper } from "./channelMapper";
import { FluxerEmbedMapper } from "./embedMapper";
import { FluxerPermissionMapper } from "./permissionMapper";

export interface SDKMeta {
  classes: any[];
  interfaces: any[];
  enums: any[];
  typeAliases: any[];
}

export class FluxerTranslatorCore {
  fluxer: SDKMeta;
  discord: SDKMeta;

  events: FluxerEventMapper;
  eventRewrite: FluxerEventRewrite;
  messageMapper: FluxerMessageMapper;
  channelMapper: FluxerChannelMapper;
  embedMapper: FluxerEmbedMapper;
  permissionMapper: FluxerPermissionMapper;

  constructor() {
    this.fluxer = this.loadFluxerMeta();
    this.discord = this.loadDiscordMeta();

    this.events = new FluxerEventMapper(this);
    this.eventRewrite = new FluxerEventRewrite(this);
    this.messageMapper = new FluxerMessageMapper(this);
    this.channelMapper = new FluxerChannelMapper(this);
    this.embedMapper = new FluxerEmbedMapper(this);
    this.permissionMapper = new FluxerPermissionMapper(this);

  }

  private loadFluxerMeta(): SDKMeta {
    const file = path.join(__dirname, "..", "..", "fluxer-sdk-meta.json");
    return JSON.parse(fs.readFileSync(file, "utf8"));
  }

  private loadDiscordMeta(): SDKMeta {
    return {
      classes: [],
      interfaces: [],
      enums: [],
      typeAliases: []
    };
  }

	translate(code: string): string {
	  let out = code;

	out = this.eventRewrite.rewrite(out);
	out = this.messageMapper.rewrite(out);
	out = this.channelMapper.rewrite(out);
	out = this.embedMapper.rewrite(out);
	out = this.permissionMapper.rewrite(out);

	  return out;
	}
}

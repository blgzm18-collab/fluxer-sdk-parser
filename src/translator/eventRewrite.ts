import { FluxerTranslatorCore } from "./core";

export class FluxerEventRewrite {
  core: FluxerTranslatorCore;

  constructor(core: FluxerTranslatorCore) {
    this.core = core;
  }

	rewrite(code: string): string {
	  return code.replace(
	    /client\.on\(\s*["'`](.*?)["'`]\s*,/gs,
	    (match, eventName) => {
	      const fluxerEvent = this.core.events.mapEvent(eventName);
	      if (!fluxerEvent) return match;

	      return `client.events.on("${fluxerEvent}",`;
	    }
	  );
	}
}

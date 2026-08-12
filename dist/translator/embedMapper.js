"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerEmbedMapper = void 0;
class FluxerEmbedMapper {
    constructor(core) {
        this.core = core;
    }
    rewrite(code) {
        let out = code;
        // 1. Replace new EmbedBuilder() with a plain object
        out = out.replace(/\bnew\s+EmbedBuilder\s*\(\s*\)/g, "{}");
        // 2. setTitle("x") → title: "x"
        out = out.replace(/\.setTitle\s*\(\s*([^)]*)\)/g, `.title = $1`);
        // 3. setDescription("x") → description: "x"
        out = out.replace(/\.setDescription\s*\(\s*([^)]*)\)/g, `.description = $1`);
        // 4. setColor(123) → color: 123
        out = out.replace(/\.setColor\s*\(\s*([^)]*)\)/g, `.color = $1`);
        // 5. addFields([...]) → fields: [...]
        out = out.replace(/\.addFields\s*\(\s*([^)]*)\)/g, `.fields = $1`);
        // 6. setFooter({ text: "x" }) → footer: { text: "x" }
        out = out.replace(/\.setFooter\s*\(\s*([^)]*)\)/g, `.footer = $1`);
        // 7. setAuthor({ name: "x" }) → author: { name: "x" }
        out = out.replace(/\.setAuthor\s*\(\s*([^)]*)\)/g, `.author = $1`);
        return out;
    }
}
exports.FluxerEmbedMapper = FluxerEmbedMapper;

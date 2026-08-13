"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FluxerPermissionMapper = void 0;
class FluxerPermissionMapper {
    constructor(core) {
        this.core = core;
    }
    rewrite(code) {
        let out = code;
        // 1. Convert PermissionFlagsBits.X → PermissionFlags.X
        out = out.replace(/\bPermissionFlagsBits\.([A-Za-z0-9_]+)\b/g, "PermissionFlags.$1");
        // 2. Convert permissionOverwrites.edit(role, { ... }) → channel.editPermission(role, { ... })
        out = out.replace(/([A-Za-z0-9_.]+)\.permissionOverwrites\.edit\s*\(\s*([^,]+)\s*,\s*({[^}]+})\s*\)/g, (match, channel, target, obj) => {
            const converted = this.convertPermissionObject(obj);
            return `${channel}.editPermission(${target}, ${converted})`;
        });
        // 3. Convert permissionOverwrites.create(user, { ... }) → channel.editPermission(user, { ... })
        out = out.replace(/([A-Za-z0-9_.]+)\.permissionOverwrites\.create\s*\(\s*([^,]+)\s*,\s*({[^}]+})\s*\)/g, (match, channel, target, obj) => {
            const converted = this.convertPermissionObject(obj);
            return `${channel}.editPermission(${target}, ${converted})`;
        });
        return out;
    }
    // Convert Discord-style permission objects into Fluxer-style allow/deny bitfields
    convertPermissionObject(obj) {
        // Extract keys like: { ViewChannel: false, SendMessages: true }
        const entries = [...obj.matchAll(/([A-Za-z0-9_]+)\s*:\s*(true|false)/g)];
        const allow = [];
        const deny = [];
        for (const [, perm, value] of entries) {
            const fluxerPerm = `PermissionFlags.${perm}`;
            if (value === "true")
                allow.push(fluxerPerm);
            else
                deny.push(fluxerPerm);
        }
        const allowStr = allow.length
            ? `allow: resolvePermissionsToBitfield([${allow.join(", ")}])`
            : "";
        const denyStr = deny.length
            ? `deny: resolvePermissionsToBitfield([${deny.join(", ")}])`
            : "";
        const typeStr = `type: 0`;
        const parts = [allowStr, denyStr, typeStr].filter(Boolean).join(", ");
        return `{ ${parts} }`;
    }
}
exports.FluxerPermissionMapper = FluxerPermissionMapper;

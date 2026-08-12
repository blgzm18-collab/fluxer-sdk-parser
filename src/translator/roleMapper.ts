export class FluxerRoleMapper {
  private core: any;

  constructor(core: any) {
    this.core = core;
  }

  rewrite(code: string): string {
    let out = code;

    out = out.split("PermissionFlagsBits.").join("PermissionFlags.");

    out = this.replaceRoleCreate(out);
    out = this.replaceSetPermissions(out);
    out = this.replaceRoleEdit(out);

    return out;
  }

  private findObjectBefore(code: string, idx: number): string {
    let end = idx;

    // Stop at dots so we don't capture "staffRole." twice
    while (end > 0 && /[A-Za-z0-9_]/.test(code[end - 1])) {
      end--;
    }

    return code.substring(end, idx);
  }

  private findMatchingBrace(code: string, start: number): number {
    let depth = 0;
    for (let i = start; i < code.length; i++) {
      if (code[i] === "{") depth++;
      if (code[i] === "}") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  private findMatchingParen(code: string, start: number): number {
    let depth = 0;
    for (let i = start; i < code.length; i++) {
      if (code[i] === "(") depth++;
      if (code[i] === ")") {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  private convertPermissionArray(perms: string): string {
    const list = perms
      .split(",")
      .map((p: string) => p.trim())
      .filter(Boolean)
      .map((p: string) => {
        p = p.replace("PermissionFlags.", "");
        return `PermissionFlags.${p}`;
      });

    return `resolvePermissionsToBitfield([${list.join(", ")}])`;
  }

  private convertRoleObject(obj: string): string {
    const permStart = obj.indexOf("permissions:");
    if (permStart === -1) return obj;

    const bracketStart = obj.indexOf("[", permStart);
    const bracketEnd = obj.indexOf("]", bracketStart);
    if (bracketStart === -1 || bracketEnd === -1) return obj;

    const perms = obj.substring(bracketStart + 1, bracketEnd);
    const bitfield = this.convertPermissionArray(perms);

    return (
      obj.substring(0, permStart) +
      `permissions: ${bitfield}` +
      obj.substring(bracketEnd + 1)
    );
  }

  private replaceRoleCreate(code: string): string {
    const marker = ".roles.create(";
    let idx = code.indexOf(marker);

    while (idx !== -1) {
      const start = idx + marker.length;
      const end = this.findMatchingBrace(code, start);

      if (end !== -1) {
        const obj = code.substring(start, end + 1); // include closing brace
        const converted = this.convertRoleObject(obj);
        // keep the original trailing characters after the brace
        code = code.substring(0, start) + converted + code.substring(end + 1);
      }

      idx = code.indexOf(marker, idx + 1);
    }

    return code;
  }

  private replaceSetPermissions(code: string): string {
    // Match a role expression (identifier or dotted chain) followed by .setPermissions([...])
    // Use a single-line RegExp string to avoid unterminated-literal issues.
    // The role capture allows letters, numbers, underscore, dollar, dots, and simple bracket calls.
    const re = new RegExp("([A-Za-z0-9_$.]+)\\.setPermissions\\(\\s*\\[([\\s\\S]*?)\\]\\s*\\)\\s*;?", "g");


    return code.replace(re, (_match: string, role: string, perms: string) => {
      const cleaned = perms
        .split(",")
        .map((p: string) => p.trim())
        .filter(Boolean)
        .map((p: string) => {
          p = p.replace("PermissionFlags.", "");
          return `PermissionFlags.${p}`;
        })
        .join(", ");

      const bitfield = `resolvePermissionsToBitfield([${cleaned}])`;

      return `${role}.update({ permissions: ${bitfield} });`;
    });
  }

  private replaceRoleEdit(code: string): string {
    // Match: <role>.edit({ ... });
    // Capture role name in $1 and the full object (including braces) in $2
    const re = new RegExp("([A-Za-z0-9_$.]+)\\.edit\\(\\s*({[\\s\\S]*?})\\s*\\)\\s*;?", "g");

    return code.replace(re, (_match: string, role: string, objWithBraces: string) => {
      // convertRoleObject expects the object string (braces included)
      const converted = this.convertRoleObject(objWithBraces);
      return `${role}.update(${converted});`;
    });
  }
}

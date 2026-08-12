import { glob } from "glob";
import * as fs from "fs";
import * as path from "path";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";

// Storage
const classes: any[] = [];
const interfaces: any[] = [];
const enums: any[] = [];
const typeAliases: any[] = [];

// Discover files
async function getSourceFiles(root: string): Promise<string[]> {
  return glob("**/*.{ts,js,d.ts}", {
    cwd: root,
    absolute: true,
    ignore: ["**/node_modules/**", "**/dist/**"]
  });
}

// Parse a file
function parseFile(filePath: string) {
  const code = fs.readFileSync(filePath, "utf8");

  const ast = parse(code, {
    sourceType: "module",
    plugins: ["typescript"]
  });

  traverse(ast, {
    TSInterfaceDeclaration(path) {
      interfaces.push({
        kind: "interface",
        name: path.node.id.name,
        file: filePath
      });
    },

    TSEnumDeclaration(path) {
      enums.push({
        kind: "enum",
        name: path.node.id.name,
        file: filePath,
        values: (path.node as any).members.map((m: any) =>
		  m.id?.name ?? m.id?.value ?? "Unknown"
		)

      });
    },

    TSTypeAliasDeclaration(path) {
      typeAliases.push({
        kind: "typeAlias",
        name: path.node.id.name,
        file: filePath
      });
    },

    ClassDeclaration(path) {
      const name = path.node.id?.name ?? "AnonymousClass";

      classes.push({
        kind: "class",
        name,
        file: filePath
      });
    }
  });
}

// MAIN
async function main() {
  const sdkRoot = path.join(__dirname, "..", "node_modules", "@fluxerjs", "core", "dist");

  console.log("Scanning:", sdkRoot);

  const files = await getSourceFiles(sdkRoot);
  console.log("Found files:", files.length);

  for (const file of files) {
    parseFile(file);
  }

  const result = {
    version: "2.2.8",
    classes,
    interfaces,
    enums,
    typeAliases
  };

  fs.writeFileSync("fluxer-sdk-meta.json", JSON.stringify(result, null, 2));
  console.log("Done!");
}

main();

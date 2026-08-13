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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
// Storage
const classes = [];
const interfaces = [];
const enums = [];
const typeAliases = [];
// Discover files
async function getSourceFiles(root) {
    return (0, glob_1.glob)("**/*.{ts,js,d.ts}", {
        cwd: root,
        absolute: true,
        ignore: ["**/node_modules/**", "**/dist/**"]
    });
}
// Parse a file
function parseFile(filePath) {
    const code = fs.readFileSync(filePath, "utf8");
    const ast = (0, parser_1.parse)(code, {
        sourceType: "module",
        plugins: ["typescript"]
    });
    (0, traverse_1.default)(ast, {
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
                values: path.node.members.map((m) => m.id?.name ?? m.id?.value ?? "Unknown")
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

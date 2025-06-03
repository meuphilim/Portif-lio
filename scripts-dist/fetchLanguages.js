"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // importante para evitar limites
const OWNER = "meuphilim"; // ajuste aqui
async function fetchRepos() {
    const res = await (0, node_fetch_1.default)(`https://api.github.com/users/${OWNER}/repos?per_page=100`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
        },
    });
    return await res.json();
}
async function fetchLanguages(owner, repo) {
    const res = await (0, node_fetch_1.default)(`https://api.github.com/repos/${owner}/${repo}/languages`, {
        headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
        },
    });
    return await res.json();
}
async function main() {
    const repos = await fetchRepos();
    const languagesAccum = {};
    for (const repo of repos) {
        const langs = await fetchLanguages(repo.owner.login, repo.name);
        for (const [lang, bytes] of Object.entries(langs)) {
            languagesAccum[lang] = (languagesAccum[lang] || 0) + bytes;
        }
    }
    // salvar arquivo JSON
    const dataPath = path_1.default.resolve(process.cwd(), "data", "languages.json");
    fs_1.default.mkdirSync(path_1.default.dirname(dataPath), { recursive: true });
    fs_1.default.writeFileSync(dataPath, JSON.stringify(languagesAccum, null, 2), "utf-8");
    console.log("Dados de linguagens salvos em", dataPath);
}
main().catch(console.error);

/**
 * Static registry index (Phase A of the marketplace rework).
 *
 * The community DSH-Plugins-Marketplace project publishes a CI-built index
 * of every topic:dsh-plugin repository (registry.json, ~2.2MB / .gz ~700KB)
 * every 2 hours. Consuming it gives the marketplace ~3000 entries with zero
 * GitHub API calls and no rate-limit exposure; the existing curated catalog
 * (awesome-dsh-plugins) overlays quality metadata on top of it.
 *
 * Fallback chain (in order):
 *   1. api.github.com contents (token-aware when GH_TOKEN/GITHUB_TOKEN set)
 *   2. jsDelivr CDN (freshness-checked via `generated_at`, ≤6h)
 *   3. raw.githubusercontent.com
 *   4. local disk cache (last successful full index, any age)
 *   5. GitHub search API topic:dsh-plugin (partial by design; never persisted)
 */
import { gunzipSync } from 'node:zlib';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { marketplaceFetch } from "./net.js";
/** The community index project (consumed read-only, never a hard dependency). */
export const REGISTRY_OWNER = 'bradeGithub';
export const REGISTRY_REPO = 'DSH-Plugins-Marketplace';
const REGISTRY_FILE = 'registry.json';
/** DSH's own repository is not a plugin — never listed. */
const EXCLUDED_REPO_NAMES = new Set(['deepseek-harness']);
/**
 * Eco-generic topics stripped before a repo's topics reach the UI: they are
 * ecosystem labels (ai/llm/deepseek/dsh/plugin/web/tool/…) rather than
 * functional signals, and would otherwise dominate every card's topic row.
 * Mirrors the registry builder's TOPIC_STOP_WORDS.
 */
export const TOPIC_STOP_WORDS = new Set([
    'agent', 'agents', 'ai-agent', 'ai-agents', 'ai', 'llm', 'deepseek', 'deepseek-harness',
    'dsh', 'dsh-plugin', 'dsh-plugins', 'dshtopic', 'dsh-ecosystem', 'cordis', 'cordis-plugin',
    'claude', 'claude-code', 'claude-skills', 'codex', 'opencode', 'openclaw', 'hermes-agent',
    'harness', 'harness-engineering', 'typescript', 'javascript', 'python', 'react', 'nodejs',
    'open-source', 'self-hosted', 'local-first', 'privacy-first', 'api', 'sdk', 'plugin',
    'plugins', 'extension', 'openai', 'gemini', 'kimi', 'glm', 'minimax', 'free',
    'web', 'web-ui', 'ui', 'gui', 'tool', 'tools', 'skill', 'skills', 'agent-skills',
    'automation', 'workflow', 'multi-agent', 'ai-tools', 'ai-assistant', 'assistant',
    'chatgpt', 'coding-agent', 'coding-agents', 'coding-assistant', 'agentic-coding',
    'vibe-coding', 'vibecoding', 'ai-coding', 'developer-tools', 'pdf-parser',
    'debugging', 'prompt-engineering', 'system-design',
    'terminal', 'tui', 'cli',
]);
/** Filter a repo's topics down to functional signals (eco-generic tags removed). */
export function functionalTopics(topics) {
    return (topics ?? [])
        .filter(topic => !TOPIC_STOP_WORDS.has(String(topic).toLowerCase()))
        .slice(0, 8);
}
/** jsDelivr CDN caches can lag hours: older indexes are discarded. */
const REGISTRY_MAX_AGE_MS = 6 * 60 * 60 * 1000;
/** Search-API fallback cap: the unauthenticated quota is 10/min, keep it small. */
const SEARCH_MAX_PAGES = 10;
const SEARCH_PAGE_SIZE = 100;
/** Registry index disk cache (inside the plugin-manager cache dir). */
export function registryCacheFile() {
    const home = process.env.DSH_HOME ?? join(homedir(), '.dsh');
    return join(home, 'plugin-manager-cache', 'registry-index.json');
}
/** Candidate index sources, tried in order. */
function registrySources() {
    const base = `${REGISTRY_OWNER}/${REGISTRY_REPO}`;
    return [
        { url: `https://api.github.com/repos/${base}/contents/${REGISTRY_FILE}.gz`, gz: true, token: true },
        { url: `https://cdn.jsdelivr.net/gh/${base}@main/${REGISTRY_FILE}.gz`, gz: true, checkFresh: true },
        { url: `https://raw.githubusercontent.com/${base}/main/${REGISTRY_FILE}.gz`, gz: true },
        { url: `https://cdn.jsdelivr.net/gh/${base}@main/${REGISTRY_FILE}`, gz: false, checkFresh: true },
        { url: `https://raw.githubusercontent.com/${base}/main/${REGISTRY_FILE}`, gz: false },
    ];
}
/** Normalize one raw repo record (registry.json or search-API shapes). */
export function normalizeRegistryRepo(raw) {
    if (raw === null || typeof raw !== 'object')
        return null;
    const r = raw;
    const fullName = typeof r.full_name === 'string' ? r.full_name : '';
    if (fullName.length === 0)
        return null;
    const name = typeof r.name === 'string' ? r.name : fullName.split('/').pop() ?? fullName;
    if (EXCLUDED_REPO_NAMES.has(name))
        return null;
    let htmlUrl = '';
    try {
        const u = new URL(String(r.html_url ?? ''));
        if (u.protocol === 'https:' && u.host === 'github.com')
            htmlUrl = u.href;
    }
    catch { /* keep empty */ }
    const pkgName = typeof r.pkg_name === 'string' && r.pkg_name.length > 0 ? r.pkg_name : undefined;
    const version = typeof r.version === 'string' && r.version.length > 0 ? r.version : undefined;
    const category = typeof r.category === 'string' && r.category.length > 0 ? r.category : undefined;
    return {
        full_name: fullName,
        name,
        description: typeof r.description === 'string' ? r.description : null,
        html_url: htmlUrl,
        stargazers_count: typeof r.stargazers_count === 'number' ? r.stargazers_count : 0,
        updated_at: typeof r.updated_at === 'string' ? r.updated_at : '',
        default_branch: typeof r.default_branch === 'string' ? r.default_branch : 'main',
        topics: Array.isArray(r.topics) ? r.topics.filter((t) => typeof t === 'string') : [],
        license: typeof r.license === 'string'
            ? r.license
            : (r.license !== null && typeof r.license === 'object'
                ? String(r.license.spdx_id ?? '') || null
                : null),
        ...(pkgName !== undefined ? { pkg_name: pkgName } : {}),
        ...(version !== undefined ? { version } : {}),
        ...(category !== undefined ? { category } : {}),
    };
}
/** Normalize + deduplicate a parsed index payload; null when unusable. */
function collectRepos(raw) {
    if (raw === null || typeof raw !== 'object')
        return null;
    const list = raw.repos;
    if (!Array.isArray(list) || list.length === 0)
        return null;
    const seen = new Set();
    const out = [];
    for (const entry of list) {
        const repo = normalizeRegistryRepo(entry);
        if (repo === null || seen.has(repo.full_name))
            continue;
        seen.add(repo.full_name);
        out.push(repo);
    }
    return out.length > 0 ? out : null;
}
/**
 * Fetch the index through every network source. The result carries whether
 * the winning source passed a freshness check: only freshness-verified
 * sources (jsDelivr, generated_at within REGISTRY_MAX_AGE_MS) may persist to
 * disk — the GitHub api/raw responses carry no generated_at and an old one
 * must not overwrite a good cache (audit M14). null when all fail.
 */
export async function fetchRegistryRepos() {
    // Overall budget: five serial sources × 15s can hang a refresh for ~75s
    // (audit M15) — bail out to the disk cache after 60s.
    let timer;
    const deadline = new Promise(resolve => { timer = setTimeout(() => resolve(null), 60_000); });
    try {
        const chain = (async () => {
            for (const source of registrySources()) {
                try {
                    const headers = { 'user-agent': 'dsh-web-plugin-manager' };
                    if (source.token) {
                        headers['accept'] = 'application/vnd.github.raw';
                        const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
                        if (token !== undefined && token.length > 0)
                            headers['authorization'] = `Bearer ${token}`;
                    }
                    const response = await marketplaceFetch(source.url, { headers, redirect: 'follow' });
                    if (!response.ok)
                        continue;
                    const buffer = Buffer.from(await response.arrayBuffer());
                    let text;
                    if (source.gz) {
                        try {
                            text = gunzipSync(buffer).toString('utf8');
                        }
                        catch {
                            continue;
                        }
                    }
                    else {
                        text = buffer.toString('utf8');
                    }
                    const data = JSON.parse(text);
                    if (source.checkFresh === true) {
                        const age = Date.now() - Date.parse(typeof data.generated_at === 'string' ? data.generated_at : '');
                        if (Number.isNaN(age) || age > REGISTRY_MAX_AGE_MS)
                            continue;
                    }
                    const repos = collectRepos(data);
                    if (repos !== null)
                        return { repos, cacheable: source.checkFresh === true };
                }
                catch { /* try the next source */ }
            }
            return null;
        })();
        return await Promise.race([chain, deadline]);
    }
    finally {
        clearTimeout(timer);
    }
}
/** Search-API fallback (topic:dsh-plugin). Partial by design — never cached. */
export async function fetchSearchFallback() {
    const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
    const collected = [];
    const seen = new Set();
    const query = encodeURIComponent('topic:dsh-plugin');
    for (let page = 1; page <= SEARCH_MAX_PAGES; page++) {
        try {
            const headers = { 'user-agent': 'dsh-web-plugin-manager', accept: 'application/vnd.github+json' };
            if (token !== undefined && token.length > 0)
                headers['authorization'] = `Bearer ${token}`;
            const url = `https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=${SEARCH_PAGE_SIZE}&page=${page}`;
            const response = await marketplaceFetch(url, { headers });
            if (!response.ok)
                break;
            const data = await response.json();
            if (!Array.isArray(data.items))
                break;
            let any = false;
            for (const entry of data.items) {
                const repo = normalizeRegistryRepo(entry);
                if (repo === null || seen.has(repo.full_name))
                    continue;
                seen.add(repo.full_name);
                collected.push(repo);
                any = true;
            }
            if (!any || data.items.length < SEARCH_PAGE_SIZE)
                break;
        }
        catch {
            break;
        }
    }
    return collected.length > 0 ? collected : null;
}
/** Last successful full index from disk (any age — better than nothing). */
export function readRegistryCache() {
    try {
        const raw = JSON.parse(readFileSync(registryCacheFile(), 'utf8'));
        return collectRepos(raw);
    }
    catch { /* no/broken cache */ }
    return null;
}
/** Persist a successful full index (never the search fallback). */
export function writeRegistryCache(repos) {
    try {
        mkdirSync(dirname(registryCacheFile()), { recursive: true });
        writeFileSync(registryCacheFile(), JSON.stringify({
            savedAt: new Date().toISOString(),
            count: repos.length,
            repos,
        }, undefined, 2) + '\n');
    }
    catch { /* cache write is best-effort */ }
}
const DSH_SO_INDEX_URL = 'https://www.dsh.so/plugins-index.json';
/** Reuse the fetched dsh.so index for this long (the index is rebuilt on their side). */
const DSH_SO_TTL_MS = 24 * 60 * 60 * 1000;
/** dsh.so index disk cache. */
export function dshSoCacheFile() {
    const home = process.env.DSH_HOME ?? join(homedir(), '.dsh');
    return join(home, 'plugin-manager-cache', 'dshso-index.json');
}
/** Normalize one raw dsh.so entry (keeps only the overlay fields). */
function normalizeDshSoEntry(raw) {
    if (raw === null || typeof raw !== 'object')
        return null;
    const entry = raw;
    const name = typeof entry.name === 'string' && entry.name.length > 0 ? entry.name : '';
    if (name.length === 0)
        return null;
    const verification = entry.verification;
    const security = entry.security;
    return {
        name,
        ...(verification !== null && typeof verification === 'object'
            && typeof verification.level === 'number'
            ? {
                verification: {
                    level: verification.level,
                    label: typeof verification.label === 'string' ? verification.label : 'L' + verification.level,
                },
            }
            : {}),
        ...(security !== null && typeof security === 'object'
            && typeof security.riskLevel === 'string'
            ? {
                security: {
                    status: String(security.status ?? ''),
                    riskLevel: String(security.riskLevel ?? ''),
                },
            }
            : {}),
    };
}
/** Fetch the dsh.so index (network, then disk cache); null when unusable. */
export async function fetchDshSoIndex() {
    try {
        const response = await marketplaceFetch(DSH_SO_INDEX_URL, { headers: { 'user-agent': 'dsh-web-plugin-manager' } });
        if (!response.ok)
            throw new Error('dsh.so index HTTP ' + response.status);
        const data = await response.json();
        const list = Array.isArray(data.plugins) ? data.plugins : [];
        const entries = [];
        const seen = new Set();
        for (const raw of list) {
            const entry = normalizeDshSoEntry(raw);
            if (entry === null || seen.has(entry.name.toLowerCase()))
                continue;
            seen.add(entry.name.toLowerCase());
            entries.push(entry);
        }
        if (entries.length > 0) {
            try {
                mkdirSync(dirname(dshSoCacheFile()), { recursive: true });
                writeFileSync(dshSoCacheFile(), JSON.stringify({ savedAt: new Date().toISOString(), entries }, undefined, 2) + '\n');
            }
            catch { /* cache write is best-effort */ }
            return entries;
        }
    }
    catch { /* fall through to the disk cache */ }
    try {
        const data = JSON.parse(readFileSync(dshSoCacheFile(), 'utf8'));
        const age = Date.now() - Date.parse(typeof data.savedAt === 'string' ? data.savedAt : '');
        if (Number.isNaN(age) || age > DSH_SO_TTL_MS)
            return null;
        const list = Array.isArray(data.entries) ? data.entries : [];
        return list.map(normalizeDshSoEntry).filter((entry) => entry !== null);
    }
    catch {
        return null;
    }
}

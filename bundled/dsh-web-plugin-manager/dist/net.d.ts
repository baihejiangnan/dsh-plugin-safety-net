/**
 * Marketplace network helpers: per-request timeout and proxy support.
 *
 * Node's global fetch ignores undici's `dispatcher` option, so a
 * proxy-aware fetch must come from the undici package itself: marketplace
 * requests run through undici's fetch with a ProxyAgent dispatcher when
 * HTTP_PROXY / HTTPS_PROXY is set. Without this, users whose only path to
 * GitHub is a system/rule-mode accelerator (browser works, Node does not)
 * would see an empty marketplace with no way to fix it.
 */
import { ProxyAgent } from 'undici';
import type { RequestInit as UndiciRequestInit, Response as UndiciResponse } from 'undici';
/** Per-request cap: a silently hung connection must not pin the page. */
export declare const MARKETPLACE_FETCH_TIMEOUT_MS = 15000;
/** Proxy agent for the URL's scheme, or null when no proxy applies. */
export declare function proxyAgentFor(url: string): ProxyAgent | null;
/**
 * Fetch one marketplace URL with a bounded timeout through the configured
 * proxy. The caller's init (headers etc.) is preserved. Returns undici's
 * Response (its fetch, not the global one — the global fetch drops the
 * dispatcher option).
 */
export declare function marketplaceFetch(url: string, init?: UndiciRequestInit): Promise<UndiciResponse>;

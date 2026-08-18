/**
 * Free-text marketplace matching for the plugin_search tool: tokenize a
 * natural-language query and rank marketplace entries by weighted hits
 * (name 3 / topics 2 / description 1, stars as tiebreaker). Pure functions —
 * no framework imports, unit-testable.
 */
import type { MarketplaceItem } from './types.ts';
/** Split a query into lowercase tokens (alphanumeric + CJK runs). */
export declare function tokenize(query: string): string[];
/** Weighted score of one entry against query tokens. */
export declare function scoreItem(item: MarketplaceItem, tokens: readonly string[]): number;
/**
 * Rank marketplace entries against a free-text query. An empty query returns
 * the top entries by stars. Ties break by star count.
 */
export declare function findPluginMatches(items: readonly MarketplaceItem[], query: string, limit: number): MarketplaceItem[];
/** Whether a dependency value is a git source spec (github:/git+/URL). */
export declare function isGitSourceSpec(source: string): boolean;
/**
 * 构造 update 的安装 spec。
 * - git 源：原样返回（git-cache 拉取后按目录重装）。
 * - npm 源：显式钉住 latest 版本号。@latest 依赖 pnpm 对 dist-tag 的解析：
 *   pnpm 11 默认 minimumReleaseAge（发布不足 24h 的版本被扣留）或镜像源
 *   dist-tag 同步滞后时，@latest 会解析到旧版或停在现有范围，更新升不上去；
 *   显式 <name>@<version> 重写 specifier，不受这些因素影响。取不到版本号时
 *   退回 @latest（与旧行为一致）。
 */
export declare function updateSpec(source: string, name: string, latest: string | undefined): string;

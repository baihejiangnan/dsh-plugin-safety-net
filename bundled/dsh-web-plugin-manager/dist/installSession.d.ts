/**
 * C2：安装会话状态机（awaiting-input）。
 *
 * git 源 cordis 插件安装暂停等待环境变量时，记录扫描白名单与克隆目录；
 * 用户提交 answers 后按白名单校验注入（防 PATH/HOME 等任意键注入劫持）。
 *
 * 会话以 spec 为键（同一 spec 同时只有一个进行中的暂停安装），15 分钟
 * TTL 惰性清理；克隆目录本身在 <dshHome>/plugin-manager-src/ 持久缓存，
 * 会话只记引用，重启进程丢失会话也无害（用户重新发起安装即可，克隆可复用）。
 */
export interface InstallSession {
    /** 原始安装源 spec（npm 名 / git URL / 本地路径）。 */
    readonly spec: string;
    /** 扫描过的仓库目录（克隆缓存或本地路径）。 */
    readonly cacheDir: string;
    /** 扫描白名单：只允许这些键被注入。 */
    readonly scanned: readonly string[];
    readonly createdAt: number;
}
/** 创建会话（同 spec 已存在则覆盖），返回 spec 键。 */
export declare function createInstallSession(spec: string, cacheDir: string, scanned: readonly string[]): string;
export declare function getInstallSession(spec: string): InstallSession | undefined;
/** 丢弃会话（用户取消 / 安装继续后不再需要）。 */
export declare function dropInstallSession(spec: string): void;
/**
 * 校验并过滤 answers（白名单来自会话或本次扫描，两者等价）：
 *  - 键必须 ∈ 扫描白名单（防 PATH/HOME/__proto__ 等任意键注入）；
 *  - 空字符串 = 跳过（键出现即视为已提供，不注入）；
 *  - __ 前缀内部键一律拒绝（目前没有内部确认问题，纯防御）。
 */
export declare function filterAnswers(scanned: readonly string[], answers: Record<string, string> | undefined): Record<string, string>;
/** 惰性清理过期会话（每次访问时顺带执行，无需定时器）。 */
export declare function pruneExpiredSessions(): void;
/** 当前会话数（诊断用）。 */
export declare function sessionCount(): number;

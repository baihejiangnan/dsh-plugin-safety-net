/**
 * C2：环境变量需求扫描 + env 卫生（纯函数，可单测）。
 *
 * 面向 git 源 cordis 插件安装：克隆/本地目录就绪后，扫描仓库里安装/构建
 * 阶段可能需要的环境变量（README/.env/package.json/yaml/install 脚本中的
 * 敏感形态变量名），由安装流程暂停询问用户提供；提供的值只按扫描白名单
 * 注入子进程 env（防 PATH/HOME 等任意键注入劫持），其余宿主环境变量不再
 * 透传给第三方包的生命周期脚本（prepare/postinstall 等会继承子进程 env，
 * 全量透传等于把宿主各类 token/key 直接交给未审核的第三方代码）。
 *
 * 参考实现：reference/dsh-plugins-marketplace/lib/index.js
 * （isSensitiveEnvKey / SCRIPT_ENV_KEYS / buildMinimalEnv / buildFilteredEnv / scanRequirements）。
 */
/**
 * 敏感环境变量名判定：TOKEN / KEY / SECRET / PASSWORD / PASS / CREDENTIAL，
 * 大小写不敏感。不能用 \b 词边界（下划线是 \w 单词字符，GITHUB_TOKEN 中
 * TOKEN 前无边界）——用 (?!...)/(?<!...) 字母数字感知边界：GITHUB_TOKEN /
 * OPENAI_API_KEY / DB_PASSWORD 都命中，而 KEYBOARD_LAYOUT（KEY 后是 B）
 * 不误伤。
 */
export declare function isSensitiveEnvKey(name: string): boolean;
/**
 * 扫描仓库目录，返回安装/构建阶段可能需要的环境变量名（去重、上限 8 个）。
 * 递归两层（跳过点目录 / node_modules / dist / build），只读候选文件
 * （readme / install / .env / package.json / yaml / markdown），成本可控。
 */
export declare function scanRequirements(dir: string): Promise<string[]>;
/**
 * 过滤 env：剔除敏感键（npm/pnpm 子进程用）。pnpm 自身不需要凭据类变量
 * （私有 registry 走 .npmrc / 凭据助手），生命周期脚本也不该拿到它们——
 * 防止 GITHUB_TOKEN、各类 API Key 被第三方 prepare 脚本静默读取上传。
 */
export declare function buildFilteredEnv(base?: NodeJS.ProcessEnv): NodeJS.ProcessEnv;

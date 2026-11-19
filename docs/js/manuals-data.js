/**
 * ============================================================
 * 产品说明书（Instruction Manual）配置与取用 (manuals-data.js)
 * ============================================================
 * 说明书统一存放目录：docs/files/instruction_manual/
 *
 * 【如何配置说明书（三种方式，优先级从高到低）】
 *   1. 在产品数据（products-data.js）中给产品加 manual 字段：
 *        manual: 'files/instruction_manual/QK-980.pdf'
 *   2. 在下方 ManualConfig.files 中按产品 id 配置文件名：
 *        'qk-980': 'QK-980.pdf'
 *   3. 不做任何配置时，按「型号 + .pdf」自动推断（如 QK-530A.pdf）
 *
 * 【新增一份说明书的标准流程】
 *   1. 把 PDF 放到 docs/files/instruction_manual/ 目录
 *   2. （可选）在 ManualConfig.files 里登记 产品id -> 文件名
 *   3. 提交并推送到 GitHub，Pages 自动生效；
 *      产品详情页会出现「下载产品说明书」按钮，未找到文件则显示「暂无说明书」
 * ============================================================
 */

const ManualConfig = {
    baseDir: 'files/instruction_manual/',   // 说明书目录（相对站点根目录，末尾需带 /）
    files: {                                // 显式映射：产品 id -> 文件名
        'qk-980': 'QK-980.pdf',
        'qk-810': 'QK-810.pdf'
    },
    useModelRule: true,     // 未显式配置时，按「型号.pdf」推断文件名
    probe: true,            // 渲染后联网探测文件是否真实存在（GitHub Pages 有效）
    openInNewTab: true,     // 新标签页打开
    showFileSize: true      // 探测到文件体积时，按钮上显示 PDF 大小
};

const ManualStore = {
    /** 取文件名（未配置返回空字符串） */
    fileName(product) {
        if (!product) return '';
        if (product.manual) return product.manual;                    // 产品数据里显式指定
        if (ManualConfig.files[product.id]) return ManualConfig.files[product.id];
        if (ManualConfig.useModelRule && product.model) {
            return String(product.model).toUpperCase() + '.pdf';      // 按型号推断
        }
        return '';
    },

    /** 取完整访问路径 */
    url(product) {
        const name = this.fileName(product);
        return name ? ManualConfig.baseDir + name : '';
    },

    /**
     * 探测说明书是否真实存在
     * 仅在明确收到 404 时判定为「不存在」；
     * 网络异常 / 本地 file:// 打开等无法探测的场景按配置显示，避免误判为「暂无说明书」。
     */
    async exists(url) {
        if (!url) return { ok: false, size: null };
        if (!ManualConfig.probe) return { ok: true, size: null };
        try {
            const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
            if (res.status === 404 || res.status === 410) return { ok: false, size: null };
            const len = res.headers.get('content-length');
            return { ok: true, size: len ? Number(len) : null };
        } catch (e) {
            return { ok: true, size: null };
        }
    },

    /** 字节数格式化 */
    formatSize(bytes) {
        if (!bytes && bytes !== 0) return '';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }
};

window.ManualConfig = ManualConfig;
window.ManualStore = ManualStore;

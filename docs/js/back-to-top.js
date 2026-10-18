/**
 * ============================================================
 * 返回顶部按钮 (back-to-top.js)
 * ============================================================
 * 用法：在需要的页面引入本文件即可，按钮由 JS 动态创建，无需改 HTML。
 *
 * 显示时机：
 *   下拉越过「第一个产品分类」后出现，滚回页面上部自动隐藏。
 *   取不到分类标题时（如其它页面）回退为「滚动超过 1.5 屏」显示。
 *
 * 可调参数见下方 BackToTop.config。
 * ============================================================
 */

const BackToTop = {
    btn: null,
    threshold: 0,
    visible: false,

    config: {
        extraOffset: 0,     // 默认值 0；调大 = 更晚出现，调小(负数) = 更早出现
        smooth: true        // 平滑滚动（系统在「减少动效」时自动改为直接跳转）
    },

    /** 创建浮动按钮 */
    create() {
        const btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.type = 'button';
        btn.className = 'back-to-top';
        btn.setAttribute('aria-label', '返回顶部');
        btn.setAttribute('aria-hidden', 'true');
        btn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +
            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M12 19V6"/><path d="M5 13l7-7 7 7"/></svg>';
        document.body.appendChild(btn);
        btn.addEventListener('click', () => this.goTop());
        this.btn = btn;
    },

    /** 重新测量显示阈值（第一个分类标题距文档顶部的位置） */
    measure() {
        const anchor = document.querySelector('#product-list .series-title');
        if (anchor) {
            const top = anchor.getBoundingClientRect().top + (window.pageYOffset || 0);
            this.threshold = Math.max(200, top + this.config.extraOffset);
        } else {
            this.threshold = (window.innerHeight || 800) * 1.5 + this.config.extraOffset;
        }
    },

    update() {
        if (!this.btn) return;
        const y = window.pageYOffset || document.documentElement.scrollTop || 0;
        const show = y > this.threshold;
        if (show === this.visible) return;     // 状态没变就不碰 DOM
        this.visible = show;
        this.btn.classList.toggle('show', show);
        this.btn.setAttribute('aria-hidden', show ? 'false' : 'true');
    },

    goTop() {
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        try {
            window.scrollTo({ top: 0, behavior: (this.config.smooth && !reduce) ? 'smooth' : 'auto' });
        } catch (e) {
            window.scrollTo(0, 0);
        }
    },

    init() {
        if (!this.btn) this.create();
        this.measure();
        this.update();

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => { ticking = false; this.update(); });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', () => { this.measure(); this.update(); });
        window.addEventListener('orientationchange', () => setTimeout(() => { this.measure(); this.update(); }, 200));

        // 语言切换后内容高度变化，重算阈值
        document.addEventListener('langChanged', () => setTimeout(() => { this.measure(); this.update(); }, 300));
        // 列表重新渲染（切换分类等）后重算
        document.addEventListener('productsRendered', () => setTimeout(() => { this.measure(); this.update(); }, 60));
    }
};

window.BackToTop = BackToTop;
document.addEventListener('DOMContentLoaded', () => BackToTop.init());

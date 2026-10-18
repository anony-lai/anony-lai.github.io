/**
 * ============================================================
 * 设备识别工具 (device.js)
 * ============================================================
 * 用途：让页面能"知道"当前是手机、平板还是桌面浏览器，从而按设备形态渲染，
 *      并在窗口缩放 / 手机横竖屏切换时实时切换，不需要刷新页面。
 *
 * 判定依据（按优先级）：
 *   1. 视口宽度（主依据，随窗口与横竖屏实时变化）
 *   2. 是否触屏设备（pointer: coarse / maxTouchPoints）
 *   3. UA 兜底（仅在宽度取不到时使用）
 *
 * 断点：
 *   mobile  : ≤ 767.98px
 *   tablet  : 768px ~ 991.98px
 *   desktop : ≥ 992px
 *
 * API：
 *   Device.type()      -> 'mobile' | 'tablet' | 'desktop'
 *   Device.isMobile()  -> true / false
 *   Device.isDesktop() -> true / false
 *   Device.onChange(cb)-> 设备形态变化时回调（已做节流 + 去重）
 * ============================================================
 */

const Device = {
    MOBILE_MAX: 767.98,
    TABLET_MAX: 991.98,

    /** 当前视口宽度 */
    width() {
        if (typeof window === 'undefined') return 1024;
        return window.innerWidth || (document.documentElement && document.documentElement.clientWidth) || 1024;
    },

    /** 是否触屏设备 */
    isTouch() {
        if (typeof window === 'undefined') return false;
        return ('ontouchstart' in window) ||
               (navigator.maxTouchPoints || 0) > 0 ||
               !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
    },

    /** UA 兜底判断（移动端浏览器） */
    isMobileUA() {
        if (typeof navigator === 'undefined') return false;
        return /Android|iPhone|iPad|iPod|Windows Phone|HarmonyOS|Mobile|BlackBerry/i.test(navigator.userAgent || '');
    },

    /** 设备形态 */
    type() {
        const w = this.width();
        if (!w) return this.isMobileUA() ? 'mobile' : 'desktop';
        if (w <= this.MOBILE_MAX) return 'mobile';
        if (w <= this.TABLET_MAX) return 'tablet';
        return 'desktop';
    },

    isMobile() {
        return this.type() === 'mobile';
    },

    isTablet() {
        return this.type() === 'tablet';
    },

    isDesktop() {
        return this.type() === 'desktop';
    },

    /** 是否为小屏（手机 / 窄版平板），产品列表用紧凑卡片 */
    isCompact() {
        return this.type() !== 'desktop';
    },

    /** 监听设备形态变化（窗口 resize、手机旋转） */
    onChange(callback) {
        if (typeof window === 'undefined' || typeof callback !== 'function') return;
        let lastType = this.type();
        let timer = null;

        const check = () => {
            const now = this.type();
            if (now !== lastType) {
                lastType = now;
                callback(now);
            }
            this.syncBody();
        };

        const schedule = () => {
            clearTimeout(timer);
            timer = setTimeout(check, 150);   // 节流，避免缩放过程中疯狂重绘
        };

        window.addEventListener('resize', schedule);
        window.addEventListener('orientationchange', () => setTimeout(check, 250));
        if (window.matchMedia) {
            ['(max-width: 767.98px)', '(min-width: 768px) and (max-width: 991.98px)', '(min-width: 992px)']
                .forEach(q => {
                    const mq = window.matchMedia(q);
                    if (mq.addEventListener) mq.addEventListener('change', schedule);
                    else if (mq.addListener) mq.addListener(schedule);
                });
        }
    },

    /** 把当前设备形态写到 <html data-device="..."> / <body data-device="...">，供 CSS 与调试使用 */
    syncBody() {
        if (typeof document === 'undefined') return;
        const t = this.type();
        if (document.documentElement) document.documentElement.setAttribute('data-device', t);
        if (document.body) document.body.setAttribute('data-device', t);
    }
};

window.Device = Device;

// 尽早标记设备形态，避免首屏闪烁
Device.syncBody();
document.addEventListener('DOMContentLoaded', () => Device.syncBody());

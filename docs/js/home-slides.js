/**
 * ============================================================
 * 首页轮播图配置与渲染 (home-slides.js)
 * ============================================================
 * 【数量可配置】：往 HOME_SLIDES 数组里增删对象即可，1 张也能正常工作
 *                （只有 1 张时自动隐藏左右箭头与底部指示点）。
 *
 * 每一项支持字段：
 *   enabled  : false 可临时下线某一张，不必删除配置
 *   image    : 背景图路径（建议横图 ≥1600×700；留空则用 gradient 渐变背景）
 *   gradient : 自定义 CSS 背景渐变，仅在 image 为空时生效
 *   fit      : 背景填充方式 cover / contain（默认 cover；手机端自动转 contain，保证不变形）
 *   align    : 文案水平位置 left / right（默认 left）
 *   title    : { cn, en } 主标题
 *   desc     : { cn, en } 副标题
 *   btn      : { text:{cn,en}, href:'products.html' } 按钮，不需要则不写
 *
 * 全局参数见下方 HomeSliderConfig（自动播放、间隔、各断点高度等）。
 *
 * 【自动切换保障】
 *   Bootstrap JS 可用时使用官方 Carousel 并强制 cycle()；
 *   若 CDN 未加载成功（国内网络常见），自动降级为内置轮播器，同样支持
 *   自动播放、点击箭头/指示点切换、移动端左右滑动切换。
 * ============================================================
 */

const HomeSliderConfig = {
    autoPlay: true,          // 是否自动轮播（默认开启）
    interval: 5000,          // 每张停留毫秒数
    pauseInBackground: true, // 页面切到后台时暂停，回到前台继续
    indicators: true,        // 底部指示点
    controls: true,          // 左右箭头
    height: '600px',         // 桌面端高度
    tabletHeight: '520px',   // ≤991.98px（平板 / 大屏手机）
    mobileHeight: '380px'    // ≤575.98px（手机）
};

const HOME_SLIDES = [
    {
        enabled: true,
        image: '',
        gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        align: 'left',
        title: { cn: '专业房车空调<br>智造清凉旅途', en: 'Professional RV Air Conditioners<br>Cool Comfort for Every Journey' },
        desc:  { cn: '广州亿铭工业自动化科技有限公司 - 房车空调专业制造商', en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd. - Professional RV Air Conditioner Manufacturer' },
        btn:   { text: { cn: '查看产品中心', en: 'View Products' }, href: 'products.html' }
    },
    {
        enabled: true,
        image: 'images/out-qk600.jpg',
        align: 'right',
        title: { cn: 'QK-600 分体式变频房车空调', en: 'QK-600 Split Inverter RV Air Conditioner' },
        desc:  { cn: '12V / 24V / 48V 直流可选，制冷量 2600W，静音 55dB(A)，可搭配 QK-530A、QK-680 等多款挂机。', en: '12V / 24V / 48V DC optional, 2600W cooling capacity, 55dB(A) quiet operation, compatible with QK-530A, QK-680 and more.' },
        btn:   { text: { cn: '了解 QK-600', en: 'Explore QK-600' }, href: 'product-detail.html?id=qk-600' }
    },
    {
        enabled: true,
        image: 'images/about-factory.jpg',
        align: 'left',
        title: { cn: '现代化生产基地', en: 'Modern Manufacturing Base' },
        desc:  { cn: '标准模具机械厂房与现代化空调生产车间，从产品设计、模具制造到注塑成型一站式交付。', en: 'Standard mould machinery plant and modern AC production workshop: design, moulding and injection in one stop.' },
        btn:   { text: { cn: '关于我们', en: 'About Us' }, href: 'about.html' }
    },
    {
        enabled: true,
        image: 'images/out-qk610.jpg',
        align: 'right',
        title: { cn: 'QK-610 超薄一体外机', en: 'QK-610 Ultra-thin Outdoor Unit' },
        desc:  { cn: '机身厚度仅 115mm，节省安装空间，适配 QK-530B、QK-848、QK-980 等挂机。', en: 'Only 115mm thick to save installation space, compatible with QK-530B, QK-848 and QK-980 indoor units.' },
        btn:   { text: { cn: '了解 QK-610', en: 'Explore QK-610' }, href: 'product-detail.html?id=qk-610' }
    }
];

const HomeSlider = {
    lang() {
        return localStorage.getItem('qiangke_lang') || 'cn';
    },

    t(obj) {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[this.lang()] || obj.cn || '';
    },

    esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    },

    /** 背景层样式：有图用图片（填充方式交给 CSS 变量，便于按断点切换），无图用渐变 */
    bgStyle(slide) {
        if (slide.image) {
            return `background-image:url('${this.esc(slide.image)}')`;
        }
        return `background:${slide.gradient || 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'}`;
    },

    render() {
        const box = document.getElementById('home-carousel-box');
        if (!box) return;

        // 已渲染过则先销毁旧实例与定时器，避免重复计时
        this.destroy();

        const slides = (HOME_SLIDES || []).filter(s => s && s.enabled !== false);
        if (!slides.length) {
            box.style.display = 'none';
            return;
        }
        box.style.display = '';

        const multi = slides.length > 1;
        const auto = multi && HomeSliderConfig.autoPlay;
        const showControls = multi && HomeSliderConfig.controls;
        const showIndicators = multi && HomeSliderConfig.indicators;

        const heightVars = `--hero-h:${HomeSliderConfig.height}` +
                           `;--hero-h-md:${HomeSliderConfig.tabletHeight}` +
                           `;--hero-h-sm:${HomeSliderConfig.mobileHeight}`;

        const items = slides.map((s, i) => {
            const right = s.align === 'right';
            const colCls = right ? 'col-lg-7 ms-auto' : 'col-lg-7';
            const textCls = right ? 'text-lg-end' : '';
            // 无图（纯渐变）幻灯片：移动端文案垂直居中，避免上方留大片空黑
            // 无图幻灯片：移动端文案垂直居中；有图幻灯片：移动端只占上部图片带
            const noImgCls = s.image ? ' hero-slide--img' : ' hero-slide--noimg';
            // 桌面端填充方式走 CSS 变量（--hero-fit），手机/平板由 CSS 改判为 contain 完整展示
            const fitVar = s.image ? `;--hero-fit:${s.fit || 'cover'}` : '';
            return `
            <div class="carousel-item${i === 0 ? ' active' : ''}">
                <div class="hero-slide${noImgCls}" style="${heightVars}${fitVar}">
                    <div class="hero-slide-bg" style="${this.bgStyle(s)}"></div>
                    <div class="hero-slide-body">
                        <div class="container">
                            <div class="row">
                                <div class="${colCls} ${textCls}">
                                    <h1 class="hero-slide-title">${this.t(s.title)}</h1>
                                    <p class="hero-slide-desc">${this.esc(this.t(s.desc))}</p>
                                    ${s.btn ? `<div class="hero-slide-btn-wrap ${right ? 'text-lg-end' : ''}"><a href="${this.esc(s.btn.href)}" class="btn btn-danger btn-lg">${this.esc(this.t(s.btn.text))}</a></div>` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');

        const indicators = showIndicators ? `
            <div class="carousel-indicators">
                ${slides.map((s, i) => `<button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="${i}"${i === 0 ? ' class="active" aria-current="true"' : ''} aria-label="Slide ${i + 1}"></button>`).join('')}
            </div>` : '';

        const controls = showControls ? `
            <button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>` : '';

        box.innerHTML = `
            <div id="homeCarousel" class="carousel slide home-carousel">
                ${indicators}
                <div class="carousel-inner">${items}</div>
                ${controls}
            </div>`;

        this.start(slides.length, auto);
    },

    /** 启动自动播放：优先 Bootstrap，缺失时使用内置轻量轮播器 */
    start(count, auto) {
        const el = document.getElementById('homeCarousel');
        if (!el || count < 2) return;

        const interval = Number(HomeSliderConfig.interval) || 5000;

        if (window.bootstrap && bootstrap.Carousel) {
            this.instance = bootstrap.Carousel.getOrCreateInstance(el, {
                interval: auto ? interval : false,
                ride: false,
                pause: false,     // 悬停不暂停，保证"始终自动切换"的观感
                wrap: true,
                touch: true       // 移动端左右滑动切换
            });
            if (auto) this.instance.cycle();
            return;
        }

        this.startFallback(el, interval, auto);
    },

    /** 降级轮播器：Bootstrap CDN 不可用时接管自动切换 */
    startFallback(el, interval, auto) {
        const items = Array.prototype.slice.call(el.querySelectorAll('.carousel-item'));
        const dots = Array.prototype.slice.call(el.querySelectorAll('[data-bs-slide-to]'));
        if (items.length < 2) return;

        let index = Math.max(0, items.findIndex(i => i.classList.contains('active')));
        let timer = null;

        const go = (next) => {
            index = (next + items.length) % items.length;
            items.forEach((it, i) => it.classList.toggle('active', i === index));
            dots.forEach((d, i) => {
                d.classList.toggle('active', i === index);
                if (i === index) d.setAttribute('aria-current', 'true');
                else d.removeAttribute('aria-current');
            });
        };

        const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
        const play = () => { stop(); if (auto) timer = setInterval(() => go(index + 1), interval); };

        el.addEventListener('click', (e) => {
            const prev = e.target.closest && e.target.closest('.carousel-control-prev');
            const next = e.target.closest && e.target.closest('.carousel-control-next');
            const dot = e.target.closest && e.target.closest('[data-bs-slide-to]');
            if (prev) { go(index - 1); play(); }
            else if (next) { go(index + 1); play(); }
            else if (dot) { go(Number(dot.getAttribute('data-bs-slide-to')) || 0); play(); }
        });

        // 移动端手势左右滑动
        let startX = 0, startY = 0, moved = false;
        el.addEventListener('touchstart', (e) => {
            const t = e.touches[0];
            startX = t.clientX; startY = t.clientY; moved = false;
        }, { passive: true });
        el.addEventListener('touchmove', () => { moved = true; }, { passive: true });
        el.addEventListener('touchend', (e) => {
            if (!moved) return;
            const t = e.changedTouches[0];
            const dx = t.clientX - startX;
            const dy = t.clientY - startY;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                go(index + (dx < 0 ? 1 : -1));
                play();
            }
        });

        this._fallback = { stop, play };
        play();

        if (HomeSliderConfig.pauseInBackground) {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) stop(); else play();
            });
        }
    },

    /** 销毁旧实例 / 定时器 */
    destroy() {
        const oldEl = document.getElementById('homeCarousel');
        if (oldEl && window.bootstrap && bootstrap.Carousel) {
            const old = bootstrap.Carousel.getInstance(oldEl);
            if (old) old.dispose();
        }
        if (this._fallback) {
            this._fallback.stop();
            this._fallback = null;
        }
    }
};

window.HomeSlider = HomeSlider;
document.addEventListener('DOMContentLoaded', () => HomeSlider.render());
// 语言切换后按当前语言重绘轮播文案
document.addEventListener('langChanged', () => HomeSlider.render());

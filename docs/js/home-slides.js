/**
 * ============================================================
 * 首页轮播图配置 (home-slides.js)
 * ============================================================
 * 【数量可配置】：往 HOME_SLIDES 数组里增删对象即可，1 张也能正常工作
 *                （只有 1 张时自动隐藏左右箭头与底部指示点）。
 *
 * 每一项支持字段：
 *   enabled  : false 可临时下线某一张，不必删除配置
 *   image    : 背景图路径（留空则用 gradient 渐变背景）
 *   gradient : 自定义 CSS 背景渐变，仅在 image 为空时生效
 *   fit      : 背景填充方式 cover / contain（默认 cover）
 *   title    : { cn, en } 主标题
 *   desc     : { cn, en } 副标题
 *   btn      : { text:{cn,en}, href:'products.html' } 按钮，不需要按钮则不写
 *
 * 全局参数见下方 HomeSliderConfig（自动播放间隔、是否自动播放、高度等）。
 * ============================================================
 */

const HomeSliderConfig = {
    autoPlay: true,        // 是否自动播放
    interval: 5000,        // 每张停留毫秒数
    pauseOnHover: true,    // 鼠标悬停暂停
    indicators: true,      // 底部指示点
    controls: true,        // 左右箭头
    height: '600px'        // 轮播高度（手机端由 CSS 自动降低）
};

const HOME_SLIDES = [
    {
        enabled: true,
        image: '',
        gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        title: { cn: '专业房车空调<br>智造清凉旅途', en: 'Professional RV Air Conditioners<br>Cool Comfort for Every Journey' },
        desc:  { cn: '广州亿铭工业自动化科技有限公司 - 房车空调专业制造商', en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd. - Professional RV Air Conditioner Manufacturer' },
        btn:   { text: { cn: '查看产品中心', en: 'View Products' }, href: 'products.html' }
    },
    {
        enabled: true,
        image: 'images/out-qk600.jpg',
        fit: 'cover',
        title: { cn: 'QK-600 分体式变频房车空调', en: 'QK-600 Split Inverter RV Air Conditioner' },
        desc:  { cn: '12V / 24V / 48V 直流可选，制冷量 2600W，静音 55dB(A)，可搭配 QK-530A、QK-680 等多款挂机。', en: '12V / 24V / 48V DC optional, 2600W cooling capacity, 55dB(A) quiet operation, compatible with QK-530A, QK-680 and more.' },
        btn:   { text: { cn: '了解 QK-600', en: 'Explore QK-600' }, href: 'product-detail.html?id=qk-600' }
    },
    {
        enabled: true,
        image: 'images/about-factory.jpg',
        fit: 'cover',
        title: { cn: '现代化生产基地', en: 'Modern Manufacturing Base' },
        desc:  { cn: '标准模具机械厂房与现代化空调生产车间，从产品设计、模具制造到注塑成型一站式交付。', en: 'Standard mould machinery plant and modern AC production workshop: design, moulding and injection in one stop.' },
        btn:   { text: { cn: '关于我们', en: 'About Us' }, href: 'about.html' }
    },
    {
        enabled: true,
        image: 'images/out-qk610.jpg',
        fit: 'cover',
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

    bgStyle(slide) {
        const parts = [];
        if (slide.image) {
            parts.push(`background-image:url('${this.esc(slide.image)}')`);
        } else {
            parts.push(`background:${slide.gradient || 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'}`);
        }
        parts.push(`background-size:${slide.fit || 'cover'}`);
        parts.push('background-position:center');
        parts.push('background-repeat:no-repeat');
        return parts.join(';');
    },

    render() {
        const box = document.getElementById('home-carousel-box');
        if (!box) return;

        // 已在页面上渲染过则先销毁旧的轮播实例，避免事件残留
        const oldEl = document.getElementById('homeCarousel');
        if (oldEl && window.bootstrap) {
            const old = bootstrap.Carousel.getInstance(oldEl);
            if (old) old.dispose();
        }

        const slides = (HOME_SLIDES || []).filter(s => s && s.enabled !== false);
        if (!slides.length) {
            box.style.display = 'none';
            return;
        }
        box.style.display = '';

        const multi = slides.length > 1;
        const showControls = multi && HomeSliderConfig.controls;
        const showIndicators = multi && HomeSliderConfig.indicators;

        const items = slides.map((s, i) => `
            <div class="carousel-item${i === 0 ? ' active' : ''}">
                <div class="hero-slide" style="min-height:${HomeSliderConfig.height};${this.bgStyle(s)}">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center">
                            <div class="col-lg-7">
                                <h1 class="hero-slide-title">${this.t(s.title)}</h1>
                                <p class="hero-slide-desc">${this.esc(this.t(s.desc))}</p>
                                ${s.btn ? `<a href="${this.esc(s.btn.href)}" class="btn btn-danger btn-lg">${this.esc(this.t(s.btn.text))}</a>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`).join('');

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
            <div id="homeCarousel" class="carousel slide home-carousel" data-bs-ride="${multi && HomeSliderConfig.autoPlay ? 'carousel' : 'false'}">
                ${indicators}
                <div class="carousel-inner">${items}</div>
                ${controls}
            </div>`;

        if (window.bootstrap) {
            const el = document.getElementById('homeCarousel');
            bootstrap.Carousel.getOrCreateInstance(el, {
                interval: (multi && HomeSliderConfig.autoPlay) ? HomeSliderConfig.interval : false,
                pause: HomeSliderConfig.pauseOnHover ? 'hover' : false,
                wrap: true,
                ride: (multi && HomeSliderConfig.autoPlay) ? 'carousel' : false
            });
        }
    }
};

window.HomeSlider = HomeSlider;
document.addEventListener('DOMContentLoaded', () => HomeSlider.render());
// 语言切换后按当前语言重绘轮播文案
document.addEventListener('langChanged', () => HomeSlider.render());

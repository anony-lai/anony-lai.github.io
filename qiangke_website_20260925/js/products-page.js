/**
 * ============================================================
 * 产品页面渲染逻辑 (products-page.js)
 * ============================================================
 * 依赖：main.js（语言切换）、products-data.js（ProductStore）
 * 功能：
 *   1. products.html        —— 分类筛选 + 产品网格渲染
 *   2. product-detail.html  —— 按 ?id= 渲染产品详情
 *   3. index.html           —— 首页推荐产品位渲染（容器 #featured-products）
 * 所有产品内容均来自 ProductStore，支持中英文随语言切换实时刷新。
 * ============================================================
 */

const ProductPage = {
    lang() {
        return localStorage.getItem('qiangke_lang') || 'cn';
    },

    t(obj) {
        if (obj == null) return '';
        if (typeof obj === 'string') return obj;
        return obj[this.lang()] || obj.cn || '';
    },

    ui(key) {
        const dict = {
            all:          { cn: '全部产品', en: 'All Products' },
            detail:       { cn: '查看详情', en: 'View Details' },
            intro:        { cn: '产品简介', en: 'Product Introduction' },
            specs:        { cn: '技术参数', en: 'Technical Specifications' },
            outdoor:      { cn: '搭配外机型号', en: 'Matching Outdoor Units' },
            contact:      { cn: '联系我们咨询', en: 'Contact Us for Inquiry' },
            notFound:     { cn: '未找到该产品，请返回产品中心浏览。', en: 'Product not found. Please go back to the products page.' },
            loadError:    { cn: '产品数据加载失败，请稍后重试。', en: 'Failed to load products. Please try again later.' }
        };
        return (dict[key] || {})[this.lang()] || key;
    },

    escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));
    },

    /** 单个产品卡片 HTML */
    cardHtml(p) {
        return `
        <div class="product-card">
            <a href="product-detail.html?id=${encodeURIComponent(p.id)}" class="product-img-link">
                <img src="${this.escapeHtml(p.image)}" alt="${this.escapeHtml(p.model)}" class="product-img" loading="lazy">
            </a>
            <div class="product-info">
                <h4>${this.escapeHtml(this.t(p.title))}</h4>
                <p>${this.escapeHtml(this.t(p.desc))}</p>
            </div>
            <div class="card-footer text-center">
                <a href="product-detail.html?id=${encodeURIComponent(p.id)}" class="btn btn-outline-danger btn-sm">${this.ui('detail')}</a>
            </div>
        </div>`;
    },

    /* ---------------- products.html ---------------- */
    currentFilter: 'all',

    async renderList() {
        const container = document.getElementById('product-list');
        if (!container) return;
        try {
            const [products, categories] = await Promise.all([
                ProductStore.list(this.currentFilter),
                Promise.resolve(ProductStore.getCategories())
            ]);
            // 按分类分组渲染
            const groups = categories
                .filter(c => this.currentFilter === 'all' || c.key === this.currentFilter)
                .map(c => ({ cat: c, items: products.filter(p => p.category === c.key) }))
                .filter(g => g.items.length > 0);

            container.innerHTML = groups.map(g => `
                <h3 class="mb-4 mt-4 series-title">${this.escapeHtml(this.lang() === 'cn' ? g.cat.cn : g.cat.en)}</h3>
                <div class="product-grid mb-5">
                    ${g.items.map(p => this.cardHtml(p)).join('')}
                </div>
            `).join('');
        } catch (e) {
            container.innerHTML = `<p class="text-center text-muted py-5">${this.ui('loadError')}</p>`;
        }
        this.renderFilter();
    },

    renderFilter() {
        const bar = document.getElementById('category-filter');
        if (!bar) return;
        const cats = [{ key: 'all', cn: this.ui('all'), en: this.ui('all') }, ...ProductStore.getCategories()];
        bar.innerHTML = cats.map(c => {
            const label = this.lang() === 'cn' ? c.cn : c.en;
            const active = this.currentFilter === c.key ? ' active' : '';
            return `<button class="filter-btn${active}" data-cat="${c.key}">${this.escapeHtml(label)}</button>`;
        }).join('');
        bar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentFilter = btn.getAttribute('data-cat');
                this.renderList();
            });
        });
    },

    /* ---------------- product-detail.html ---------------- */
    async renderDetail() {
        const box = document.getElementById('product-detail-box');
        if (!box) return;
        const id = new URLSearchParams(window.location.search).get('id');
        const p = id ? await ProductStore.get(id) : null;
        if (!p) {
            box.innerHTML = `<p class="text-center text-muted py-5">${this.ui('notFound')}</p>`;
            return;
        }
        document.title = `${p.model} - ${this.lang() === 'cn' ? '产品详情 - 广州亿铭工业自动化' : 'Product Details - Yiming Automation'}`;

        const specRows = (p.specs || []).map(s =>
            `<tr><td style="width:40%">${this.escapeHtml(this.t(s.label))}</td><td>${this.escapeHtml(this.t(s.value))}</td></tr>`
        ).join('');

        let outdoorHtml = '';
        if (p.outdoor && p.outdoor.length) {
            const units = (await Promise.all(p.outdoor.map(oid => ProductStore.get(oid)))).filter(Boolean);
            if (units.length) {
                outdoorHtml = `
                    <h4 class="mt-5 mb-3">${this.ui('outdoor')}</h4>
                    <div class="product-grid">
                        ${units.map(u => this.cardHtml(u)).join('')}
                    </div>`;
            }
        }

        box.innerHTML = `
            <div class="row">
                <div class="col-lg-6 mb-4">
                    <img src="${this.escapeHtml(p.image)}" class="img-fluid rounded" id="product-image" alt="${this.escapeHtml(p.model)}">
                </div>
                <div class="col-lg-6">
                    <h2 class="detail-title">${this.escapeHtml(this.t(p.title))}</h2>
                    <h4 class="text-muted mb-3 mt-4">${this.ui('intro')}</h4>
                    <p>${this.escapeHtml(this.t(p.desc))}</p>
                    <h4 class="mt-4 mb-3">${this.ui('specs')}</h4>
                    <table class="table table-bordered">
                        <tbody>${specRows}</tbody>
                    </table>
                    <div class="mt-4">
                        <a href="contact.html" class="btn btn-danger me-2">${this.ui('contact')}</a>
                    </div>
                </div>
            </div>
            ${outdoorHtml}`;
    },

    /* ---------------- index.html 推荐位 ---------------- */
    async renderFeatured() {
        const box = document.getElementById('featured-products');
        if (!box) return;
        const items = await ProductStore.featured();
        box.innerHTML = items.map(p => `
            <div class="col-md-6 col-lg-3 mb-4">
                <div class="card h-100 product-card">
                    <a href="product-detail.html?id=${encodeURIComponent(p.id)}">
                        <img src="${this.escapeHtml(p.image)}" class="card-img-top" alt="${this.escapeHtml(p.model)}" loading="lazy">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title" style="font-size:1em">${this.escapeHtml(this.t(p.title))}</h5>
                        <a href="product-detail.html?id=${encodeURIComponent(p.id)}" class="btn btn-outline-danger btn-sm mt-auto align-self-start">${this.ui('detail')}</a>
                    </div>
                </div>
            </div>`).join('');
    },

    init() {
        this.renderList();
        this.renderDetail();
        this.renderFeatured();
        // 语言切换后重新渲染产品内容
        document.addEventListener('langChanged', () => {
            this.renderList();
            this.renderDetail();
            this.renderFeatured();
        });
    }
};

window.ProductPage = ProductPage;
document.addEventListener('DOMContentLoaded', () => ProductPage.init());

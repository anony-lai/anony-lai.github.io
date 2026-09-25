// 1. 中英文翻译字典
const translations = {
    // 全局导航栏
    nav_home: { cn: '首页', en: 'Home' },
    nav_products: { cn: '产品中心', en: 'Products' },
    nav_about: { cn: '关于我们', en: 'About Us' },
    nav_contact: { cn: '联系我们', en: 'Contact Us' },

    // === index.html 翻译 ===
    hero_title: { cn: '专业房车空调<br>智造清凉旅途', en: 'Professional RV Air Conditioners<br>Cool Comfort for Every Journey' },
    hero_subtitle: { cn: '广州亿铭工业自动化科技有限公司 - 房车空调专业制造商', en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd. - Professional RV Air Conditioner Manufacturer' },
    btn_view_products: { cn: '查看产品中心', en: 'View Products' },
    core_competence: { cn: '核心竞争力', en: 'Core Competence' },
    feature_1_title: { cn: '智能变频技术', en: 'Smart Inverter Technology' },
    feature_1_desc: { cn: '自主研发智能变频房车空调，支持 12V/24V/48V 直流电压，超静音无刷电机，节能省电，续航更持久。', en: 'Self-developed smart inverter RV air conditioners supporting 12V/24V/48V DC, ultra-quiet brushless motors, energy-saving for longer endurance.' },
    feature_2_title: { cn: '全系列产品线', en: 'Full Product Line' },
    feature_2_desc: { cn: '覆盖智能变频挂机、手动/智能挂机、吸顶风口、鼓风机与一体外机全系列，满足房车、MPV、工程车等多种车型需求。', en: 'Full range covering smart inverter units, manual/smart wall-mounted units, ceiling outlets, blowers and outdoor units for RVs, MPVs and engineering vehicles.' },
    feature_3_title: { cn: '一站式定制服务', en: 'One-stop Customization' },
    feature_3_desc: { cn: '从产品设计、模具制造到注塑成型的一站式服务，支持非标定制，为客户提供高性价比的自动化产品。', en: 'One-stop services from product design, mold manufacturing to injection molding. Non-standard customization supported with cost-effective solutions.' },
    recommend_products: { cn: '推荐产品', en: 'Recommended Products' },
    btn_detail: { cn: '查看详情', en: 'View Details' },
    footer_contact_title: { cn: '联系我们', en: 'Contact Us' },
    footer_company_name: { cn: '广州亿铭工业自动化科技有限公司', en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd.' },
    footer_address: { cn: '地址：广州增城增江街东方村光墩路38号', en: 'Address: No. 38, Guangdun Road, Dongfang Village, Zengjiang Street, Zengcheng, Guangzhou' },
    footer_quick_links: { cn: '快速链接', en: 'Quick Links' },

    // === products.html 翻译 ===
    page_title_products: { cn: '产品中心', en: 'Products Center' },
    page_subtitle_products: { cn: '房车空调 · 驻车空调 · 室外机', en: 'RV Air Conditioners & Outdoor Units' },

    // === product-detail.html 翻译 ===
    page_title_detail: { cn: '产品详情', en: 'Product Details' },
    btn_back_list: { cn: '← 返回列表', en: '← Back to List' },

    // === about.html 翻译 ===
    page_title_about: { cn: '关于我们', en: 'About Us' },
    page_subtitle_about: { cn: 'About Us', en: 'About Us' },
    about_company_name: { cn: '公司简介', en: 'Company Profile' },
    about_content_1: { cn: '广州市增城强科塑料模具机械厂成立于 2006 年 2 月，是一家专业设计（全自动）液压机械、塑胶模具的制造企业，拥有十几年丰富的开发设计与生产制造经验。在原有机械制造经验的基础上，先后控股成立了广州亿铭工业自动化科技有限公司、广州市铭达汽车空调设备有限公司，主要提供工件产品的机械自动化设计制造、专业空调风口（挂机）产品设计及其模具制造注塑成型的一站式服务。现拥有一支具有专业素养的设计技术队伍、现代化的标准模具机械生产厂房，以及全新现代化标准的空调生产制造厂房。近年来，为响应国家"一带一路"的发展建设，公司已逐步面向新的方向发展。', en: 'Guangzhou Zengcheng Qiangke Plastic Mould Machinery Factory was founded in February 2006. It is a professional manufacturer specializing in the design of fully automatic hydraulic machinery and plastic moulds, with over ten years of rich experience in development, design and manufacturing. On the basis of our original machinery manufacturing experience, we successively established Guangzhou Yiming Industrial Automation Technology Co., Ltd. and Guangzhou Mingda Automobile Air Conditioning Equipment Co., Ltd., providing one-stop services that cover mechanical automation design and manufacturing of workpieces, professional air conditioner (split unit) product design, mould manufacturing and injection molding. We now have a professional design and technical team, a modern standard mould machinery production plant, and a brand-new modern standard air-conditioning manufacturing plant. In recent years, in response to the national "Belt and Road" development initiative, the company has been developing towards new directions.' },
    about_content_2: { cn: '我们生产的产品在国内市场广受好评，业务延伸至全国各地及东南亚地区。在专注于行业市场开拓的同时，公司还建立了完善的售后服务，为客户在产品使用过程中遇到的问题和困难提供专业的技术指导。', en: 'Our products enjoy a high reputation in the domestic market, with our business extending across the country and to Southeast Asia. While focusing on market development, we have also established a comprehensive after-sales service system to provide professional technical guidance for any problems and difficulties our customers may encounter during product use.' },
    about_content_3: { cn: '多年来，公司秉持"质量第一，严守信誉，与时俱进，追求卓越"的企业发展精神，积极参考与引进国内外先进技术，力求精益求精，在品质上不断追求一流的产品。凭借在自动化领域的不懈努力，我司团队已成功研发并制造出智能变频冷暖两用驻车空调、自动珩磨机、导柱顶针打头机、拉伸油压机、活塞孔机、自动装配生产线、注塑机、吹塑机等一系列自动化产品。今后，强科将秉承竭诚为广大客户提供更多性价比更高的自动化产品，同时积极参与国家"一带一路"建设，贡献自己微薄之力！', en: 'Over the years, adhering to the enterprise spirit of "Quality First, Abiding by Credibility, Advancing with the Times and Pursuing Excellence", we have actively referenced and introduced advanced technologies at home and abroad, striving for excellence and constantly pursuing first-class product quality. Through persistent efforts in the field of automation, our team has successfully developed and manufactured a series of automated products, including intelligent variable-frequency cooling and heating RV air conditioners, automatic honing machines, guide post and ejector pin heading machines, tensile hydraulic presses, piston hole machines, automatic assembly lines, injection moulding machines and blow moulding machines. Going forward, Qiangke will continue to provide customers with more cost-effective automation products, and actively participate in the "Belt and Road" initiative, contributing our own modest strength.' },
    about_spirit_title: { cn: '企业精神：', en: 'Corporate Spirit: ' },
    about_spirit_content: { cn: '质量第一，严守信誉，与时俱进，追求卓越。', en: 'Quality First, Strict Credibility, Keeping with the Times, Pursuit of Excellence.' },

    // === contact.html 翻译 ===
    page_title_contact: { cn: '联系我们', en: 'Contact Us' },
    page_subtitle_contact: { cn: 'Contact Us', en: 'Contact Us' },
    contact_info_title: { cn: '联系信息', en: 'Contact Information' },
    contact_label_company: { cn: '公司名称：', en: 'Company Name: ' },
    contact_label_address: { cn: '地址：', en: 'Address: ' },
    contact_label_phone: { cn: '电话：', en: 'Phone: ' },
    contact_label_mobile: { cn: '手机：', en: 'Mobile: ' },
    contact_label_email: { cn: '邮箱：', en: 'Email: ' },
	// 表单相关翻译
    form_name: { cn: '您的姓名', en: 'Your Name' },
    form_email: { cn: '电子邮件', en: 'Email Address' },
    form_phone: { cn: '联系电话', en: 'Phone Number' },
    form_company: { cn: '公司名称', en: 'Company Name' },
    form_subject: { cn: '咨询主题', en: 'Subject' },
    form_subject_opt1: { cn: '产品咨询', en: 'Product Inquiry' },
    form_subject_opt2: { cn: '技术支持', en: 'Technical Support' },
    form_subject_opt3: { cn: '其他', en: 'Other' },
    form_message: { cn: '留言内容', en: 'Message' },
    form_submit: { cn: '发送留言', en: 'Send Message' },
    form_success: { cn: '留言发送成功！我们将尽快与您联系。', en: 'Message sent successfully! We will contact you soon.' },
	
	// 在 translations 对象中补充：
	contact_wechat_btn: { cn: ' 点击查看微信二维码', en: ' Click to View WeChat QR Code' },
	wechat_modal_title: { cn: '微信扫码联系我们', en: 'Scan WeChat QR Code' },
	wechat_modal_desc: { cn: '请使用微信扫一扫添加好友', en: 'Please scan the QR code to add us on WeChat' }
};

// 2. 语言切换核心逻辑
let currentLang = localStorage.getItem('qiangke_lang') || 'cn';

function switchLang() {
    currentLang = currentLang === 'cn' ? 'en' : 'cn';
    localStorage.setItem('qiangke_lang', currentLang);
    applyTranslations();
    // 通知产品模块重新渲染（products-page.js 监听此事件）
    document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang: currentLang } }));
}

function applyTranslations() {
    // 1. 处理普通文本内容
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.innerHTML = translations[key][currentLang];
        }
    });

    // 2. 处理输入框的 placeholder (新增)
    const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    placeholders.forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            el.placeholder = translations[key][currentLang];
        }
    });

    // 3. 处理下拉框选项 (新增)
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        const options = select.querySelectorAll('option');
        options.forEach(opt => {
            const key = opt.getAttribute('data-i18n');
            if (key && translations[key]) {
                opt.textContent = translations[key][currentLang];
            }
        });
    });
}

// 3. 页面加载时初始化语言
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
});

// 4. 表单提交处理
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const successMsg = document.getElementById('formSuccess');
            successMsg.classList.remove('d-none');
            form.reset();
            setTimeout(() => {
                successMsg.classList.add('d-none');
            }, 5000);
        });
    }
});

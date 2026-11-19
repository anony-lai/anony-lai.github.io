/**
 * ============================================================
 * 隐私政策内容数据 (privacy-data.js)
 * ============================================================
 * 内容以结构化数据中英双语维护，由 PrivacyPage 渲染进 private.html，
 * 支持随语言切换实时刷新。修改文案只需改本文件，无需改 HTML。
 *
 * blocks 支持三种类型：
 *   { type:'p',  text:{cn,en} }                       段落
 *   { type:'ul', items:[{cn,en}, ...] }               列表
 *   { type:'kv', items:[{label:{cn,en}, value:{cn,en}}] }  键值对表格
 * ============================================================
 */

/** 运营主体信息（隐私政策公示用） */
const COMPANY_INFO = {
    name:       { cn: '广州亿铭工业自动化科技有限公司', en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd.' },
    creditCode: '91440101MA59QMLC84',
    legalRep:   { cn: '李全强', en: 'Li Quanqiang' },
    email:      '597441084@qq.com',
    address:    { cn: '广州市增城区增江街东方村光墩路38号', en: 'No. 38, Guangdun Road, Dongfang Village, Zengjiang Street, Zengcheng District, Guangzhou' },
    phone:      '+86-20-82627482',
    mobile:     '+86-13352862388',
    site:       'qk-ac.com'
};

const PRIVACY_DATA = {
    updatedAt: '2026-10-07',
    effectiveAt: '2026-10-07',

    intro: {
        cn: '广州亿铭工业自动化科技有限公司（以下简称"我们"）重视您的个人信息保护。本政策说明您访问本网站、以及通过"联系我们"页面留言板提交信息时，我们收集哪些信息、为何收集、如何存储与保护，以及您所享有的权利。请您在使用留言功能前仔细阅读本政策。',
        en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd. ("we") attaches great importance to the protection of your personal information. This policy explains what information we collect when you visit this website or submit a message through the contact form, why we collect it, how it is stored and protected, and the rights you have. Please read it carefully before using the message function.'
    },

    sections: [
        {
            title: { cn: '一、运营者信息', en: '1. Operator Information' },
            blocks: [
                { type: 'kv', items: [
                    { label: { cn: '公司名称', en: 'Company Name' },    value: { cn: '广州亿铭工业自动化科技有限公司', en: 'Guangzhou Yiming Industrial Automation Technology Co., Ltd.' } },
                    { label: { cn: '统一社会信用代码', en: 'Unified Social Credit Code' }, value: { cn: '91440101MA59QMLC84', en: '91440101MA59QMLC84' } },
                    { label: { cn: '法定代表人', en: 'Legal Representative' }, value: { cn: '李全强', en: 'Li Quanqiang' } },
                    { label: { cn: '联系邮箱', en: 'Email' },            value: { cn: '597441084@qq.com', en: '597441084@qq.com' } },
                    { label: { cn: '联系电话', en: 'Phone' },            value: { cn: '+86-20-82627482 / +86-13352862388', en: '+86-20-82627482 / +86-13352862388' } },
                    { label: { cn: '联系地址', en: 'Address' },          value: { cn: '广州市增城区增江街东方村光墩路38号', en: 'No. 38, Guangdun Road, Dongfang Village, Zengjiang Street, Zengcheng District, Guangzhou' } },
                    { label: { cn: '网站域名', en: 'Website' },          value: { cn: 'qk-ac.com', en: 'qk-ac.com' } }
                ]}
            ]
        },
        {
            title: { cn: '二、我们收集哪些信息', en: '2. Information We Collect' },
            blocks: [
                { type: 'p', text: { cn: '我们仅收集实现商务沟通所必需的最少信息，具体如下：', en: 'We collect only the minimum information necessary for business communication:' } },
                { type: 'ul', items: [
                    { cn: '您主动填写的信息：留言板中的姓名、电子邮箱、公司名称、联系电话、咨询主题与留言内容。', en: 'Information you provide voluntarily: name, email address, company name, phone number, subject and message entered in the contact form.' },
                    { cn: '网站运行自动产生的信息：您访问本网站时，托管服务商（GitHub Pages）可能记录 IP 地址、浏览器类型、操作系统、访问时间与页面地址等技术日志，用于安全与运行维护。', en: 'Automatically generated information: when you visit this site, our hosting provider (GitHub Pages) may log technical data such as IP address, browser type, operating system, access time and requested page for security and operation purposes.' },
                    { cn: '设备本地保存的信息：本网站使用浏览器本地存储（localStorage，键名 qiangke_lang）记住您选择的中/英文语言偏好，该数据仅保存在您自己的设备上，不会上传至我们的服务器。', en: 'Information stored on your device: the site uses browser localStorage (key: qiangke_lang) to remember your Chinese/English language preference. It stays on your device and is never uploaded to our servers.' }
                ]},
                { type: 'p', text: { cn: '本网站不设置注册登录、不收集支付信息、不采集精确地理位置、通讯录、相册等敏感个人信息，也不埋设第三方广告或统计追踪代码。', en: 'This website has no registration or login, does not collect payment information, precise location, contacts or photo albums, and contains no third-party advertising or analytics tracking code.' } }
            ]
        },
        {
            title: { cn: '三、第三方服务：留言转发（Static Forms）', en: '3. Third-party Service: Message Forwarding (Static Forms)' },
            blocks: [
                { type: 'p', text: { cn: '本站"联系我们"页面的留言板使用 Static Forms（staticforms.dev）提供的表单转发服务。您点击"发送留言"后，表单内容（姓名、邮箱、公司名称、电话、咨询主题与留言正文）会提交至该服务，并由其以电子邮件形式转发至本公司邮箱 597441084@qq.com，以便我们回复您的咨询。', en: 'The contact form on our "Contact Us" page uses the Static Forms (staticforms.dev) message forwarding service. After you click "Send Message", the form content (name, email, company name, phone number, subject and message) is submitted to this service and forwarded by email to our company mailbox 597441084@qq.com so that we can reply to your inquiry.' } },
                { type: 'ul', items: [
                    { cn: '该第三方仅作为信息传输通道使用，我们未授权其将您的信息用于发送营销邮件或任何其他目的。', en: 'The third party acts only as a transmission channel; we do not authorise it to use your information for marketing or any other purpose.' },
                    { cn: '消息转发过程依赖邮件服务商，邮件内容可能经由该服务商的服务器传输与存储，其处理行为受其自身隐私政策约束。', en: 'Message forwarding relies on email providers; message content may transit and be stored on their servers, governed by their own privacy policies.' },
                    { cn: '如您不希望信息经由第三方转发，可直接发送邮件至 597441084@qq.com 或致电 +86-20-82627482 与我们联系。', en: 'If you prefer not to send information through a third party, you may email 597441084@qq.com or call +86-20-82627482 directly.' }
                ]}
            ]
        },
        {
            title: { cn: '四、我们使用信息的目的', en: '4. How We Use Your Information' },
            blocks: [
                { type: 'ul', items: [
                    { cn: '回复您的产品咨询、报价申请与技术支持请求；', en: 'Responding to your product inquiries, quotation requests and technical support requests;' },
                    { cn: '在您同意的前提下，向您发送与咨询相关的产品资料与商务信息；', en: 'Sending you product materials and business information related to your inquiry, with your consent;' },
                    { cn: '改进本网站内容与产品服务体验；', en: 'Improving this website and our products and services;' },
                    { cn: '履行法律法规规定的义务、处理投诉与争议。', en: 'Complying with legal obligations and handling complaints or disputes.' }
                ]},
                { type: 'p', text: { cn: '我们不会将您的个人信息用于上述范围之外的目的；确需变更使用目的时，将重新征得您的同意。', en: 'We will not use your personal information beyond the purposes above; if the purpose changes, we will obtain your consent again.' } }
            ]
        },
        {
            title: { cn: '五、信息的存储与保护', en: '5. Storage and Security' },
            blocks: [
                { type: 'ul', items: [
                    { cn: '存储地点：您的留言信息保存在本公司邮箱及内部沟通记录中，服务器与邮箱均位于中国境内。', en: 'Location: your messages are stored in our company mailbox and internal records; servers and mailboxes are located in mainland China.' },
                    { cn: '存储期限：仅为实现处理目的所必需的最短时间，通常自最后一次沟通起不超过 24 个月，法律法规另有要求的除外；期限届满或您要求删除后，我们将删除或匿名化处理。', en: 'Retention: only for the minimum period necessary, generally no more than 24 months from the last communication unless otherwise required by law. After expiry or upon your deletion request, we will delete or anonymise the data.' },
                    { cn: '安全措施：我们对接触个人信息的人员实行权限控制，并采取加密传输（HTTPS）、访问控制等措施保护信息安全。', en: 'Security measures: we apply access control for personnel handling personal information and use encrypted transmission (HTTPS) and access restrictions to protect your data.' },
                    { cn: '风险提示：互联网环境并非绝对安全，如发生个人信息泄露等安全事件，我们将按法律法规要求及时启动应急预案并向您告知。', en: 'Risk notice: the internet is not absolutely secure. In the event of a personal information breach, we will activate our emergency plan and notify you as required by law.' }
                ]}
            ]
        },
        {
            title: { cn: '六、信息的共享、转让与公开披露', en: '6. Sharing, Transfer and Disclosure' },
            blocks: [
                { type: 'p', text: { cn: '我们不会出售、出租或交换您的个人信息。仅在以下情形可能对外提供：', en: 'We do not sell, rent or exchange your personal information. It may only be provided externally in the following cases:' } },
                { type: 'ul', items: [
                    { cn: '为完成留言转发所必需的第三方服务（详见第三条）；', en: 'Third-party services necessary for message forwarding (see Section 3);' },
                    { cn: '依据法律法规、司法机关或行政机关的强制性要求；', en: 'Where required by laws, judicial or administrative authorities;' },
                    { cn: '为保护我们、您或其他自然人的生命、财产等合法权益所必需；', en: 'Where necessary to protect the life or property of us, you or other individuals;' },
                    { cn: '经您事先明确同意的其他情形。', en: 'Other circumstances with your prior explicit consent.' }
                ]}
            ]
        },
        {
            title: { cn: '七、您的权利', en: '7. Your Rights' },
            blocks: [
                { type: 'p', text: { cn: '依据《中华人民共和国个人信息保护法》等相关法律法规，您对您的个人信息享有以下权利：', en: 'Under the Personal Information Protection Law of the People\'s Republic of China and other applicable laws, you have the following rights:' } },
                { type: 'ul', items: [
                    { cn: '查阅、复制您的个人信息；', en: 'Access and obtain a copy of your personal information;' },
                    { cn: '更正、补充不准确或不完整的信息；', en: 'Correct or supplement inaccurate or incomplete information;' },
                    { cn: '删除您的个人信息，或撤回此前作出的同意；', en: 'Delete your personal information or withdraw your prior consent;' },
                    { cn: '要求我们对信息处理规则作出解释说明。', en: 'Request an explanation of our information processing rules.' }
                ]},
                { type: 'p', text: { cn: '行使上述权利，请发送邮件至 597441084@qq.com（或致电 +86-20-82627482），我们将在收到请求后 15 个工作日内予以响应。为保护您的权益，我们可能需要先验证您的身份。', en: 'To exercise these rights, please email 597441084@qq.com (or call +86-20-82627482). We will respond within 15 working days of receiving your request. We may need to verify your identity first to protect your rights.' } }
            ]
        },
        {
            title: { cn: '八、未成年人信息保护', en: '8. Protection of Minors' },
            blocks: [
                { type: 'p', text: { cn: '本网站面向企业与个人用户开展商务沟通，不面向不满十四周岁的儿童提供服务，也不会主动收集儿童个人信息。如我们发现不慎收集了儿童个人信息，将尽快删除。', en: 'This website is intended for business communication with enterprise and individual users. It is not directed to children under 14, and we do not knowingly collect children\'s personal information. If we learn that we have inadvertently collected such information, we will delete it promptly.' } }
            ]
        },
        {
            title: { cn: '九、Cookie 与本地存储', en: '9. Cookies and Local Storage' },
            blocks: [
                { type: 'p', text: { cn: '本网站不投放广告类或追踪类 Cookie。我们仅使用浏览器本地存储（localStorage）保存您选择的语言偏好，您可随时通过浏览器设置清除该数据，清除后网站将以默认中文显示。', en: 'This website does not use advertising or tracking cookies. We only use browser localStorage to remember your language preference. You may clear it at any time via your browser settings; the site will then display in Chinese by default.' } }
            ]
        },
        {
            title: { cn: '十、政策的更新', en: '10. Updates to This Policy' },
            blocks: [
                { type: 'p', text: { cn: '因业务调整或法律法规变化，我们可能适时修订本政策。修订后将在本页面公布更新后的版本并更新"最后更新日期"；若涉及信息处理目的、方式、范围等重大变更，我们会在网站显著位置另行提示。', en: 'We may revise this policy as our business or applicable laws change. The updated version will be published on this page with a revised "Last Updated" date. For material changes to the purpose, method or scope of processing, we will provide a prominent notice on the website.' } }
            ]
        },
        {
            title: { cn: '十一、联系我们', en: '11. Contact Us' },
            blocks: [
                { type: 'p', text: { cn: '如您对本政策或我们的个人信息处理活动有任何疑问、意见或投诉，欢迎通过以下方式与我们联系：', en: 'If you have any questions, comments or complaints about this policy or our personal information processing activities, please contact us:' } },
                { type: 'ul', items: [
                    { cn: '邮箱：597441084@qq.com', en: 'Email: 597441084@qq.com' },
                    { cn: '电话：+86-20-82627482　手机：+86-13352862388', en: 'Tel: +86-20-82627482　Mobile: +86-13352862388' },
                    { cn: '地址：广州市增城区增江街东方村光墩路38号', en: 'Address: No. 38, Guangdun Road, Dongfang Village, Zengjiang Street, Zengcheng District, Guangzhou' }
                ]}
            ]
        }
    ]
};

/* ============================================================
 * 隐私政策渲染器
 * ============================================================ */
const PrivacyPage = {
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

    blockHtml(block) {
        if (block.type === 'ul') {
            return `<ul class="privacy-list">${block.items.map(i => `<li>${this.esc(this.t(i))}</li>`).join('')}</ul>`;
        }
        if (block.type === 'kv') {
            return `<table class="table table-bordered privacy-table"><tbody>${
                block.items.map(i => `<tr><th scope="row">${this.esc(this.t(i.label))}</th><td>${this.esc(this.t(i.value))}</td></tr>`).join('')
            }</tbody></table>`;
        }
        return `<p>${this.esc(this.t(block.text))}</p>`;
    },

    render() {
        const box = document.getElementById('privacy-content');
        if (!box) return;

        const meta = `<p class="privacy-meta">
            ${this.lang() === 'cn' ? '最后更新日期' : 'Last Updated'}：${PRIVACY_DATA.updatedAt}
            <span class="mx-2">|</span>
            ${this.lang() === 'cn' ? '生效日期' : 'Effective Date'}：${PRIVACY_DATA.effectiveAt}
        </p>`;

        const sections = PRIVACY_DATA.sections.map(sec => `
            <section class="privacy-section">
                <h3 class="privacy-section-title">${this.esc(this.t(sec.title))}</h3>
                ${sec.blocks.map(b => this.blockHtml(b)).join('')}
            </section>`).join('');

        box.innerHTML = `${meta}<p class="privacy-intro">${this.esc(this.t(PRIVACY_DATA.intro))}</p>${sections}`;
    }
};

window.PrivacyPage = PrivacyPage;
document.addEventListener('DOMContentLoaded', () => PrivacyPage.render());
document.addEventListener('langChanged', () => PrivacyPage.render());

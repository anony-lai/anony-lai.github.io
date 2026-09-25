/**
 * ============================================================
 * 产品数据层 (products-data.js)
 * ============================================================
 * 产品中心的所有产品数据由 ProductStore 统一提供。
 * 列表页 / 详情页 / 首页推荐位均通过 ProductStore 读取数据，
 * 页面本身不硬编码任何产品信息。
 *
 * 【预留管理后端对接说明】
 * 当前数据源为本地 PRODUCTS_DATA（见文件底部）。
 * 后续接入管理后端时，只需：
 *   1. 将 ProductConfig.useRemoteApi 设为 true
 *   2. 将 ProductConfig.apiBaseUrl 设为后端接口地址
 * 后端接口约定（RESTful，返回 JSON）：
 *   GET {apiBaseUrl}/products        -> 产品数组（结构同 PRODUCTS_DATA）
 *   GET {apiBaseUrl}/products/{id}   -> 单个产品对象
 * 数据结构字段说明：
 *   id       : 产品唯一标识（英文小写，用于 URL 参数）
 *   model    : 产品型号（如 QK-530A）
 *   category : 分类标识（inverter=智能变频挂机 / manual=手动智能挂机 / outdoor=室外机）
 *   title    : { cn, en } 产品名称
 *   desc     : { cn, en } 产品简介
 *   image    : 产品图片路径
 *   specs    : 技术参数数组 [{ label:{cn,en}, value:{cn,en} }, ...]
 *   outdoor  : （可选）搭配外机的产品 id 数组
 * ============================================================
 */

const ProductConfig = {
    useRemoteApi: false,          // 对接后端后改为 true
    apiBaseUrl: '/api'            // 后端接口基础地址
};
// 显式挂到 window，确保跨脚本 / 各浏览器环境可访问
window.ProductConfig = ProductConfig;

const ProductStore = {
    _cache: null,

    /** 获取全部分类（含中英文名称） */
    getCategories() {
        return [
            { key: 'inverter', cn: '智能变频挂机系列', en: 'Smart Inverter Wall-mounted Series' },
            { key: 'manual',   cn: '手动 / 智能挂机系列', en: 'Manual & Smart Wall-mounted Series' },
            { key: 'outdoor',  cn: '室外机系列', en: 'Outdoor Unit Series' }
        ];
    },

    /** 获取产品列表，可按分类过滤 */
    async list(category) {
        let data;
        if (ProductConfig.useRemoteApi) {
            const url = category && category !== 'all'
                ? `${ProductConfig.apiBaseUrl}/products?category=${encodeURIComponent(category)}`
                : `${ProductConfig.apiBaseUrl}/products`;
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to load products');
            data = await res.json();
        } else {
            data = PRODUCTS_DATA;
            if (category && category !== 'all') {
                data = data.filter(p => p.category === category);
            }
        }
        return data;
    },

    /** 按 id 获取单个产品 */
    async get(id) {
        if (ProductConfig.useRemoteApi) {
            const res = await fetch(`${ProductConfig.apiBaseUrl}/products/${encodeURIComponent(id)}`);
            if (!res.ok) return null;
            return await res.json();
        }
        return PRODUCTS_DATA.find(p => p.id === id) || null;
    },

    /** 首页推荐产品（取各分类代表产品） */
    async featured() {
        const all = await this.list();
        return all.filter(p => ['qk-680', 'qk-530a', 'qk-980', 'qk-600'].includes(p.id));
    }
};
window.ProductStore = ProductStore;

/* ============================================================
 * 本地产品数据（整理自《广州亿铭工业画册02》）
 * ============================================================ */
const PRODUCTS_DATA = [
    /* ---------- 智能变频挂机系列 ---------- */
    {
        id: 'qk-530a', model: 'QK-530A', category: 'inverter',
        title: { cn: 'QK-530A 2.5寸屏显智能变频挂机（出风口）', en: 'QK-530A 2.5" Screen Smart Inverter Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '2.5寸屏显智能变频挂机，使用超静音无刷电机，搭配一体外机 QK-600。', en: '2.5-inch on-screen inverter wall-mounted unit with ultra-quiet brushless motor, paired with integrated outdoor unit QK-600.' },
        image: 'images/qk-530a.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '53cm(长)×26cm(宽)×16cm(高)', en: '53cm(L)×26cm(W)×16cm(H)' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '63 dBA', en: '63 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '29W', en: '29W' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '智能模拟电压输出', en: 'Intelligent analog voltage output' } },
            { label: { cn: '风速', en: 'Air Flow' }, value: { cn: '5 m/s', en: '5 m/s' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.2A', en: '1.2A' } },
            { label: { cn: '信号输出', en: 'Signal Output' }, value: { cn: 'DC12V: 4V-9V / DC24V: 9V-19V', en: 'DC12V: 4V-9V / DC24V: 9V-19V' } }
        ],
        outdoor: ['qk-600']
    },
    {
        id: 'qk-530b', model: 'QK-530B', category: 'inverter',
        title: { cn: 'QK-530B 2.5寸屏显智能变频挂机（出风口）', en: 'QK-530B 2.5" Screen Smart Inverter Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '2.5寸屏显智能变频挂机，使用超静音无刷电机，搭配超薄一体外机 QK-610。', en: '2.5-inch on-screen inverter wall-mounted unit with ultra-quiet brushless motor, paired with ultra-thin integrated outdoor unit QK-610.' },
        image: 'images/qk-530b.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '53cm(长)×26cm(宽)×16cm(高)', en: '53cm(L)×26cm(W)×16cm(H)' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '63 dBA', en: '63 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '29W', en: '29W' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '智能模拟电压输出', en: 'Intelligent analog voltage output' } },
            { label: { cn: '风速', en: 'Air Flow' }, value: { cn: '5 m/s', en: '5 m/s' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.2A', en: '1.2A' } },
            { label: { cn: '信号输出', en: 'Signal Output' }, value: { cn: 'DC12V: 4V-9V / DC24V: 9V-19V', en: 'DC12V: 4V-9V / DC24V: 9V-19V' } }
        ],
        outdoor: ['qk-610']
    },
    {
        id: 'qk-680', model: 'QK-680', category: 'inverter',
        title: { cn: 'QK-680 顶置式智能蓝牙触屏无线遥控挂机', en: 'QK-680 Top-mounted Smart Bluetooth Touch-screen Wireless Remote Unit' },
        desc:  { cn: '顶置式智能蓝牙触屏无线遥控挂机，全智能无刷电机，搭配一体外机 QK-600。', en: 'Top-mounted smart Bluetooth touch-screen unit with wireless remote control and fully smart brushless motor, paired with outdoor unit QK-600.' },
        image: 'images/qk-680.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '68cm(长)×28.4cm(宽)×15.59cm(高)', en: '68cm(L)×28.4cm(W)×15.59cm(H)' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '64 dBA', en: '64 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '28W', en: '28W' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V', en: 'DC-12V / 24V' } },
            { label: { cn: '风速', en: 'Air Flow' }, value: { cn: '6.5 m/s', en: '6.5 m/s' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.2A', en: '1.2A' } },
            { label: { cn: '控制输出', en: 'Control Output' }, value: { cn: 'DC-12V: 4V-9V / DC-24V: 9V-19V', en: 'DC-12V: 4V-9V / DC-24V: 9V-19V' } },
            { label: { cn: '风量', en: 'Air Volume' }, value: { cn: '7.6 m/s', en: '7.6 m/s' } }
        ],
        outdoor: ['qk-600']
    },
    {
        id: 'qk-690', model: 'QK-690', category: 'inverter',
        title: { cn: 'QK-690 可挂壁 · 可管路变频挂机', en: 'QK-690 Wall-mountable / Ductable Inverter Unit' },
        desc:  { cn: '可挂壁、可管路两种安装方式，12V/24V/48V 电压可选，可搭配一体外机 QK-470 或 QK-645。', en: 'Supports wall-mounted and ducted installation, optional 12V/24V/48V, paired with outdoor unit QK-470 or QK-645.' },
        image: 'images/qk-690.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '690mm(长)×185mm(宽)×230mm(高)', en: '690mm(L)×185mm(W)×230mm(H)' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.8 / 0.9A', en: '1.8 / 0.9A' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '21.6W', en: '21.6W' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V / 48V（可选）', en: 'DC-12V / 24V / 48V (Optional)' } },
            { label: { cn: '风流', en: 'Air Flow' }, value: { cn: '5.6 m/s', en: '5.6 m/s' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '56 dBA', en: '56 dBA' } }
        ],
        outdoor: ['qk-470', 'qk-645']
    },
    {
        id: 'qk-848', model: 'QK-848', category: 'inverter',
        title: { cn: 'QK-848 升级版无刷电机挂机', en: 'QK-848 Upgraded Brushless Motor Wall-mounted Unit' },
        desc:  { cn: '升级版无刷电机挂机，多档功率可选，搭配超薄一体外机 QK-610。', en: 'Upgraded brushless motor unit with multiple power options, paired with ultra-thin outdoor unit QK-610.' },
        image: 'images/qk-848.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '805mm(长)×350mm(宽)×143mm(高)', en: '805mm(L)×350mm(W)×143mm(H)' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '68 dBA', en: '68 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '30 / 40 / 45W', en: '30 / 40 / 45W' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V / 48V', en: 'DC-12V / 24V / 48V' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '6.5 m/s', en: '6.5 m/s' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '2.5 / 1.6 / 0.95×2A', en: '2.5 / 1.6 / 0.95×2A' } }
        ],
        outdoor: ['qk-610']
    },
    {
        id: 'qk-980', model: 'QK-980', category: 'inverter',
        title: { cn: 'QK-980 顶置多功能 MPV 系列挂机', en: 'QK-980 Top-mounted Multifunctional MPV Series Unit' },
        desc:  { cn: '顶置多功能 MPV 系列，12V/24V 两用，可搭配超薄一体外机 QK-610 或一体外机 QK-645。', en: 'Top-mounted multifunctional MPV series, 12V/24V dual use, paired with outdoor unit QK-610 or QK-645.' },
        image: 'images/qk-980.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '980mm(长)×260mm(宽)×120mm(高)', en: '980mm(L)×260mm(W)×120mm(H)' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.5 / 0.8A', en: '1.5 / 0.8A' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '18 / 19W', en: '18 / 19W' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V 两用', en: 'DC-12V / 24V Dual' } },
            { label: { cn: '风流', en: 'Air Flow' }, value: { cn: '6 m/s', en: '6 m/s' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '56 dBA', en: '56 dBA' } }
        ],
        outdoor: ['qk-610', 'qk-645']
    },

    /* ---------- 手动 / 智能挂机系列 ---------- */
    {
        id: 'qk-730-remote', model: 'QK-730', category: 'manual',
        title: { cn: 'QK-730 遥控冷暖两用挂机（出风口）', en: 'QK-730 Remote Control Cooling & Heating Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '遥控冷暖两用挂机，智能模拟电压输出，四季适用。', en: 'Remote control dual-purpose (cooling & heating) unit with intelligent analog voltage output.' },
        image: 'images/qk-730-remote.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '73cm(长)×30cm(宽)×13.8cm(高)', en: '73cm(L)×30cm(W)×13.8cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '智能模拟电压输出', en: 'Intelligent analog voltage output' } },
            { label: { cn: '信号输出', en: 'Signal Output' }, value: { cn: 'DC12V: 4V-9V / DC24V: 9V-19V', en: 'DC12V: 4V-9V / DC24V: 9V-19V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '75 dBA', en: '75 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '76W', en: '76W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '3.2A', en: '3.2A' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '7.5 m/s', en: '7.5 m/s' } }
        ]
    },
    {
        id: 'qk-730', model: 'QK-730', category: 'manual',
        title: { cn: 'QK-730 单冷大挂机（出风口）', en: 'QK-730 Cooling-only Large Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '单冷大挂机，大风量出风口设计，适用于大型房车与工程车辆。', en: 'Cooling-only large wall-mounted unit with high air volume outlet, suitable for large RVs and engineering vehicles.' },
        image: 'images/qk-730.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '73cm(长)×30cm(宽)×13.8cm(高)', en: '73cm(L)×30cm(W)×13.8cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC 24V / 12V', en: 'DC 24V / 12V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '75 dBA', en: '75 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '76W', en: '76W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '3.2A', en: '3.2A' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '7.5 m/s', en: '7.5 m/s' } }
        ]
    },
    {
        id: 'qk-630b-remote', model: 'QK-630B', category: 'manual',
        title: { cn: 'QK-630B 遥控单冷中挂机（出风口）', en: 'QK-630B Remote Control Cooling-only Medium Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '遥控单冷中挂机，智能模拟电压输出，中型房车适用。', en: 'Remote control cooling-only medium unit with intelligent analog voltage output.' },
        image: 'images/qk-630b-remote.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '64.5cm(长)×16cm(宽)×26cm(高)', en: '64.5cm(L)×16cm(W)×26cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '智能模拟电压输出', en: 'Intelligent analog voltage output' } },
            { label: { cn: '信号输出', en: 'Signal Output' }, value: { cn: 'DC12V: 4V-9V / DC24V: 9V-19V', en: 'DC12V: 4V-9V / DC24V: 9V-19V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '67 dBA', en: '67 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '41W', en: '41W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.7A', en: '1.7A' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '3.8 m/s', en: '3.8 m/s' } }
        ]
    },
    {
        id: 'qk-630b', model: 'QK-630B', category: 'manual',
        title: { cn: 'QK-630B 单冷中挂机（出风口）', en: 'QK-630B Cooling-only Medium Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '单冷中挂机，结构紧凑，安装简便。', en: 'Cooling-only medium wall-mounted unit, compact structure and easy installation.' },
        image: 'images/qk-630b.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '64.5cm(长)×16cm(宽)×26cm(高)', en: '64.5cm(L)×16cm(W)×26cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC 24V / 12V', en: 'DC 24V / 12V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '67 dBA', en: '67 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '41W', en: '41W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '1.7A', en: '1.7A' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '3.8 m/s', en: '3.8 m/s' } }
        ]
    },
    {
        id: 'qk-480-remote', model: 'QK-480', category: 'manual',
        title: { cn: 'QK-480 遥控单冷小挂机（出风口）', en: 'QK-480 Remote Control Cooling-only Small Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '遥控单冷小挂机，体积小巧，适合小型房车与露营车。', en: 'Remote control cooling-only compact unit, ideal for small RVs and campers.' },
        image: 'images/qk-480-remote.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '48cm(长)×30cm(宽)×13.8cm(高)', en: '48cm(L)×30cm(W)×13.8cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '智能模拟电压输出', en: 'Intelligent analog voltage output' } },
            { label: { cn: '信号输出', en: 'Signal Output' }, value: { cn: 'DC12V: 4V-9V / DC24V: 9V-19V', en: 'DC12V: 4V-9V / DC24V: 9V-19V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '69 dBA', en: '69 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '65W', en: '65W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '2.6A', en: '2.6A' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '9.5 m/s', en: '9.5 m/s' } }
        ]
    },
    {
        id: 'qk-480', model: 'QK-480', category: 'manual',
        title: { cn: 'QK-480 单冷小挂机（出风口）', en: 'QK-480 Cooling-only Small Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '单冷小挂机，经济实惠，安装灵活。', en: 'Cooling-only compact wall-mounted unit, economical and flexible to install.' },
        image: 'images/qk-480.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '48cm(长)×30cm(宽)×13.8cm(高)', en: '48cm(L)×30cm(W)×13.8cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC 24V / 12V', en: 'DC 24V / 12V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '72 dBA', en: '72 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '65W', en: '65W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '2.6A', en: '2.6A' } },
            { label: { cn: '风速', en: 'Wind Speed' }, value: { cn: '9.5 m/s', en: '9.5 m/s' } }
        ]
    },
    {
        id: 'qk-546', model: 'QK-546', category: 'manual',
        title: { cn: 'QK-546 顶置式吸顶风口', en: 'QK-546 Top-mounted Ceiling Air Outlet' },
        desc:  { cn: '顶置式吸顶风口，手动 / 智能遥控可选，大风量静音设计。', en: 'Top-mounted ceiling air outlet, manual or smart remote control optional, high air volume with quiet design.' },
        image: 'images/qk-546.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '54.6cm(长)×49.6cm(宽)×14.2cm(高)', en: '54.6cm(L)×49.6cm(W)×14.2cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V', en: 'DC-12V / 24V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '76 dBA', en: '76 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '80W', en: '80W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '3.37A', en: '3.37A' } },
            { label: { cn: '风量', en: 'Air Volume' }, value: { cn: '11.5 m³', en: '11.5 m³' } }
        ]
    },
    {
        id: 'qk-363', model: 'QK-363', category: 'manual',
        title: { cn: 'QK-363 鼓风机', en: 'QK-363 Air Blower' },
        desc:  { cn: '房车空调专用鼓风机，运行稳定，风量强劲。', en: 'Dedicated air blower for RV air conditioners, stable operation with strong air volume.' },
        image: 'images/qk-363.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '36.3cm×12.5cm×12.3cm', en: '36.3cm×12.5cm×12.3cm' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '80W', en: '80W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '3.3A', en: '3.3A' } },
            { label: { cn: '风量', en: 'Air Volume' }, value: { cn: '11.5 m³', en: '11.5 m³' } }
        ]
    },
    {
        id: 'qk-404-100', model: 'QK-404-100', category: 'manual',
        title: { cn: 'QK-404-100 挂机（出风口）', en: 'QK-404-100 Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '经典款挂机出风口，12V/24V 可选，适配多种车型。', en: 'Classic wall-mounted air outlet, 12V/24V optional, fits various vehicle models.' },
        image: 'images/qk-404-100.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '38cm(长)×31.2cm(宽)×12.7cm(高)', en: '38cm(L)×31.2cm(W)×12.7cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC 24V / 12V', en: 'DC 24V / 12V' } }
        ]
    },
    {
        id: 'qk-414-100', model: 'QK-414-100', category: 'manual',
        title: { cn: 'QK-414-100 挂机（出风口）', en: 'QK-414-100 Wall-mounted Unit (Air Outlet)' },
        desc:  { cn: '宽体型挂机出风口，送风范围广。', en: 'Wide-body wall-mounted air outlet with broad air supply coverage.' },
        image: 'images/qk-414-100.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '41.2cm×38cm×13.2cm', en: '41.2cm×38cm×13.2cm' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC 12V / 24V', en: 'DC 12V / 24V' } }
        ]
    },
    {
        id: 'qk-507-fridge', model: 'QK-507', category: 'manual',
        title: { cn: 'QK-507 手动落地式带冰箱出风口', en: 'QK-507 Manual Floor-standing Air Outlet with Refrigerator' },
        desc:  { cn: '手动落地式机型，集成冰箱出风口设计，一机多用。', en: 'Manual floor-standing model with integrated refrigerator air outlet, multi-purpose design.' },
        image: 'images/qk-507-fridge.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '40cm(长)×14.2cm(宽)×45cm(高)', en: '40cm(L)×14.2cm(W)×45cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V', en: 'DC-12V / 24V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '72 dBA', en: '72 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '80W', en: '80W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '3.3A', en: '3.3A' } },
            { label: { cn: '风量', en: 'Air Volume' }, value: { cn: '11 m³', en: '11 m³' } }
        ]
    },
    {
        id: 'qk-507', model: 'QK-507', category: 'manual',
        title: { cn: 'QK-507 手动式工程款出风口', en: 'QK-507 Manual Engineering Model Air Outlet' },
        desc:  { cn: '手动式工程款出风口，坚固耐用，适合工程车辆批量装配。', en: 'Manual engineering model air outlet, robust and durable, suitable for batch installation in engineering vehicles.' },
        image: 'images/qk-507.jpg',
        specs: [
            { label: { cn: '规格尺寸', en: 'Size' }, value: { cn: '40cm(长)×14.2cm(宽)×38.8cm(高)', en: '40cm(L)×14.2cm(W)×38.8cm(H)' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: 'DC-12V / 24V', en: 'DC-12V / 24V' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '72 dBA', en: '72 dBA' } },
            { label: { cn: '功率', en: 'Power' }, value: { cn: '80W', en: '80W' } },
            { label: { cn: '电流', en: 'Current' }, value: { cn: '3.3A', en: '3.3A' } },
            { label: { cn: '风量', en: 'Air Volume' }, value: { cn: '11 m³', en: '11 m³' } }
        ]
    },

    /* ---------- 室外机系列 ---------- */
    {
        id: 'qk-600', model: 'QK-600', category: 'outdoor',
        title: { cn: 'QK-600 分体式变频房车空调（一体外机）', en: 'QK-600 Split Inverter RV Air Conditioner (Integrated Outdoor Unit)' },
        desc:  { cn: '分体式变频房车空调一体外机，12V/24V/48V 电压可选，可搭配 QK-530A、QK-680 等挂机使用。', en: 'Split inverter RV air conditioner outdoor unit, 12V/24V/48V optional, compatible with QK-530A, QK-680 and other indoor units.' },
        image: 'images/out-qk600.jpg',
        specs: [
            { label: { cn: '电源', en: 'Power Supply' }, value: { cn: 'DC-12V / 24V / 48V（可选电压）', en: 'DC-12V / 24V / 48V (Optional)' } },
            { label: { cn: '额定功率', en: 'Rated Power' }, value: { cn: '850 / 265W', en: '850 / 265W' } },
            { label: { cn: '制冷量', en: 'Cooling Capacity' }, value: { cn: '2600 / 702W', en: '2600 / 702W' } },
            { label: { cn: '冷媒类型', en: 'Refrigerant' }, value: { cn: 'R134a', en: 'R134a' } },
            { label: { cn: '最大冷媒充注量', en: 'Max Refrigerant Charge' }, value: { cn: '700g', en: '700g' } },
            { label: { cn: '额定电流', en: 'Rated Current' }, value: { cn: '38 / 11A', en: '38 / 11A' } },
            { label: { cn: '防护等级', en: 'Protection Grade' }, value: { cn: 'E', en: 'E' } },
            { label: { cn: '吸气侧最高工作压力', en: 'Max Suction Pressure' }, value: { cn: '0.2 - 0.3 MPa', en: '0.2 - 0.3 MPa' } },
            { label: { cn: '排气侧最高工作压力', en: 'Max Discharge Pressure' }, value: { cn: '1.6 MPa', en: '1.6 MPa' } },
            { label: { cn: '热交换最大工作压力', en: 'Max Heat Exchange Pressure' }, value: { cn: '2.0 MPa', en: '2.0 MPa' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '55 dB(A)', en: '55 dB(A)' } },
            { label: { cn: '冷重比', en: 'Cooling-to-weight Ratio' }, value: { cn: '84 W/kg', en: '84 W/kg' } },
            { label: { cn: '防触电保护类别', en: 'Electric Shock Protection Class' }, value: { cn: 'III 类', en: 'Class III' } },
            { label: { cn: '外机尺寸', en: 'Unit Size' }, value: { cn: '600×380×160mm（长×宽×高）', en: '600×380×160mm (L×W×H)' } }
        ]
    },
    {
        id: 'qk-610', model: 'QK-610', category: 'outdoor',
        title: { cn: 'QK-610 分体式变频房车空调（超薄一体外机）', en: 'QK-610 Split Inverter RV Air Conditioner (Ultra-thin Integrated Outdoor Unit)' },
        desc:  { cn: '超薄一体外机，厚度仅 115mm，节省安装空间，可搭配 QK-530B、QK-848、QK-980 等挂机使用。', en: 'Ultra-thin outdoor unit with only 115mm thickness, space-saving, compatible with QK-530B, QK-848, QK-980 and other indoor units.' },
        image: 'images/out-qk610.jpg',
        specs: [
            { label: { cn: '电源', en: 'Power Supply' }, value: { cn: 'DC-12V / 24V / 48V（可选电压）', en: 'DC-12V / 24V / 48V (Optional)' } },
            { label: { cn: '额定功率', en: 'Rated Power' }, value: { cn: '850 / 265W', en: '850 / 265W' } },
            { label: { cn: '制冷量', en: 'Cooling Capacity' }, value: { cn: '2600 / 702W', en: '2600 / 702W' } },
            { label: { cn: '冷媒类型', en: 'Refrigerant' }, value: { cn: 'R134a', en: 'R134a' } },
            { label: { cn: '最大冷媒充注量', en: 'Max Refrigerant Charge' }, value: { cn: '700g', en: '700g' } },
            { label: { cn: '额定电流', en: 'Rated Current' }, value: { cn: '38 / 11A', en: '38 / 11A' } },
            { label: { cn: '防护等级', en: 'Protection Grade' }, value: { cn: 'E', en: 'E' } },
            { label: { cn: '吸气侧最高工作压力', en: 'Max Suction Pressure' }, value: { cn: '0.2 - 0.3 MPa', en: '0.2 - 0.3 MPa' } },
            { label: { cn: '排气侧最高工作压力', en: 'Max Discharge Pressure' }, value: { cn: '1.6 MPa', en: '1.6 MPa' } },
            { label: { cn: '热交换最大工作压力', en: 'Max Heat Exchange Pressure' }, value: { cn: '2.0 MPa', en: '2.0 MPa' } },
            { label: { cn: '噪音', en: 'Noise' }, value: { cn: '55 dB(A)', en: '55 dB(A)' } },
            { label: { cn: '冷重比', en: 'Cooling-to-weight Ratio' }, value: { cn: '84 W/kg', en: '84 W/kg' } },
            { label: { cn: '防触电保护类别', en: 'Electric Shock Protection Class' }, value: { cn: 'III 类', en: 'Class III' } },
            { label: { cn: '外机尺寸', en: 'Unit Size' }, value: { cn: '610×370×115mm（长×宽×高）', en: '610×370×115mm (L×W×H)' } }
        ]
    },
    {
        id: 'qk-470', model: 'QK-470', category: 'outdoor',
        title: { cn: 'QK-470 分体式变频房车空调（一体外机）', en: 'QK-470 Split Inverter RV Air Conditioner (Integrated Outdoor Unit)' },
        desc:  { cn: '搭载 KZN150D 变频压缩机，额定制冷量 3450W，可搭配 QK-690 挂机使用。', en: 'Equipped with KZN150D inverter compressor, rated cooling capacity 3450W, compatible with QK-690 indoor unit.' },
        image: 'images/out-qk470.jpg',
        specs: [
            { label: { cn: '压缩机型号', en: 'Compressor Model' }, value: { cn: 'KZN150D', en: 'KZN150D' } },
            { label: { cn: '空调类型', en: 'Type' }, value: { cn: '变频驱动', en: 'Inverter Driven' } },
            { label: { cn: '冷媒最大充注量', en: 'Max Refrigerant Charge' }, value: { cn: '0.8 kg', en: '0.8 kg' } },
            { label: { cn: '额定制冷量', en: 'Rated Cooling Capacity' }, value: { cn: '3450W', en: '3450W' } },
            { label: { cn: '最大输入功率', en: 'Max Input Power' }, value: { cn: '950W', en: '950W' } },
            { label: { cn: '最大排气压力', en: 'Max Discharge Pressure' }, value: { cn: '3.4 MPa', en: '3.4 MPa' } },
            { label: { cn: '最大吸气压力', en: 'Max Suction Pressure' }, value: { cn: '0.25 - 0.55 MPa', en: '0.25 - 0.55 MPa' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '12V / 24V / 48V（可选）', en: '12V / 24V / 48V (Optional)' } },
            { label: { cn: '外机尺寸', en: 'Unit Size' }, value: { cn: '470×445×195mm（长×宽×高）', en: '470×445×195mm (L×W×H)' } }
        ]
    },
    {
        id: 'qk-645', model: 'QK-645', category: 'outdoor',
        title: { cn: 'QK-645 分体式变频房车空调（一体外机）', en: 'QK-645 Split Inverter RV Air Conditioner (Integrated Outdoor Unit)' },
        desc:  { cn: '搭载 KZN150D 变频压缩机，额定制冷量 3450W，可搭配 QK-690、QK-980 挂机使用。', en: 'Equipped with KZN150D inverter compressor, rated cooling capacity 3450W, compatible with QK-690, QK-980 indoor units.' },
        image: 'images/out-qk645.jpg',
        specs: [
            { label: { cn: '压缩机型号', en: 'Compressor Model' }, value: { cn: 'KZN150D', en: 'KZN150D' } },
            { label: { cn: '空调类型', en: 'Type' }, value: { cn: '变频驱动', en: 'Inverter Driven' } },
            { label: { cn: '冷媒最大充注量', en: 'Max Refrigerant Charge' }, value: { cn: '0.8 kg', en: '0.8 kg' } },
            { label: { cn: '额定制冷量', en: 'Rated Cooling Capacity' }, value: { cn: '3450W', en: '3450W' } },
            { label: { cn: '最大输入功率', en: 'Max Input Power' }, value: { cn: '950W', en: '950W' } },
            { label: { cn: '最大排气压力', en: 'Max Discharge Pressure' }, value: { cn: '3.4 MPa', en: '3.4 MPa' } },
            { label: { cn: '最大吸气压力', en: 'Max Suction Pressure' }, value: { cn: '0.25 - 0.55 MPa', en: '0.25 - 0.55 MPa' } },
            { label: { cn: '电压', en: 'Voltage' }, value: { cn: '12V / 24V / 48V（可选）', en: '12V / 24V / 48V (Optional)' } },
            { label: { cn: '外机尺寸', en: 'Unit Size' }, value: { cn: '645×390×195mm（长×宽×高）', en: '645×390×195mm (L×W×H)' } }
        ]
    }
];

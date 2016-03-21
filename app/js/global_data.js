

var service_types = [
    {value:'设计搭建', label:'设计搭建', tips: '会展活动中展位、展台及舞台的设计、制作和搭建等服务'},
    {value:'展览工厂', label:'展览工厂', tips: '展厅展台、特装展位、精品展柜的制作搭建和组装'},
    {value:'公关策划', label:'公关策划', tips: '会议、活动等的策划与执行'},
    {value:'篷房展具租赁', label:'篷房展具租赁', tips: '篷房、桌椅、家具、电器等展具物品租赁'},
    {value:'AV设备租赁', label:'AV设备租赁', tips:'灯光、音响、LED等AV设备的租赁及现场服务'},
    {value:'物流仓储', label:'物流仓储', tips: '展品的运输及仓储服务'},
    {value:'摄影摄像', label:'摄影摄像', tips: '摄影、摄像、导播、后期制作'},
    {value:'植物租赁', label:'植物租赁'},
    {value:'礼仪模特', label:'礼仪模特'},
    {value:'速记翻译', label:'速记翻译'},
    {value:'安保服务', label:'安保服务'}];

var service_types_filter = [
    {value:'设计搭建', label:'设计搭建'},
    {value:'展览工厂', label:'展览工厂'},
    {value:'公关策划', label:'公关策划'},
    {value:'篷房展具租赁', label:'篷房展具租赁'},
    {value:'AV设备租赁', label:'AV设备租赁'},
    {value:'物流仓储', label:'物流仓储'},
    {value:'摄影摄像', label:'摄影摄像'},
    {value:'植物租赁', label:'植物租赁'},
    {value:'礼仪模特', label:'礼仪模特'},
    {value:'速记翻译', label:'速记翻译'},
    {value:'安保服务', label:'安保服务'}];


var cities = [
    '不限','北京','上海','广州','深圳','天津','杭州','南京','武汉','重庆','成都','西安'
];


var cityObjArray = [
    {value:'', label: '不限'},
    {value:'北京', label: '北京'},
    {value:'上海', label: '上海'},
    {value:'广州', label: '广州'},
    {value:'深圳', label: '深圳'},
    {value:'天津', label: '天津'},
    {value:'杭州', label: '杭州'},
    {value:'南京', label: '南京'},
    {value:'武汉', label: '武汉'},
    {value:'重庆', label: '重庆'},
    {value:'成都', label: '成都'},
    {value:'西安', label: '西安'}];



var pageSize = 10;

const COMPANY_DEFAULT_LOGO = 'images/company-logo.png';
const COMPANY_DEFAULT_WEB_IMG = 'images/web-company-img.png';
const COMPANY_DEFAULT_BANNER = 'images/banner-normal.png';




export {service_types, cities, pageSize, cityObjArray, service_types_filter, COMPANY_DEFAULT_LOGO, COMPANY_DEFAULT_WEB_IMG, COMPANY_DEFAULT_BANNER}
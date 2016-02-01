

var service_types = [
    {value:'场地搭建', label:'场地搭建'},
    {value:'公关策划', label:'公关策划'},
    {value:'展位设计', label:'展位设计'},
    {value:'设备租赁', label:'设备租赁'},
    {value:'篷房展具租赁', label:'篷房展具租赁'},
    {value:'礼仪模特', label:'礼仪模特'},
    {value:'摄影摄像', label:'摄影摄像'},
    {value:'物流', label:'物流'},
    {value:'仓储', label:'仓储'},
    {value:'植物租赁', label:'植物租赁'},
    {value:'安保服务', label:'安保服务'},
    {value:'速记翻译', label:'速记翻译'}];

var service_types_filter = [
    {value: 'full', label: '综合/一站式服务'},
    {value:'展位设计', label:'展位设计'},
    {value:'公关策划', label:'公关策划'},
    {value:'场地搭建', label:'场地搭建'},
    {value:'设备租赁', label:'设备租赁'},
    {value:'篷房展具租赁', label:'篷房展具租赁'},
    {value:'礼仪模特', label:'礼仪模特'},
    {value:'摄影摄像', label:'摄影摄像'},
    {value:'物流', label:'物流'},
    {value:'仓储', label:'仓储'},
    {value:'植物租赁', label:'植物租赁'},
    {value:'安保服务', label:'安保服务'},
    {value:'速记翻译', label:'速记翻译'}];

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
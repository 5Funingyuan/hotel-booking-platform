// 中国行政区划数据 - 省市二级（轻量版，约340+城市）
// 用于移动端快速选择，不包含区县级数据以保持轻量

export interface City {
  code: string
  name: string
  pinyin: string
  letter: string
}

// 所有城市列表（带拼音和首字母）
export const allCities: City[] = [
  // A
  { code: "340800", name: "安庆市", pinyin: "anqing", letter: "A" },
  { code: "410500", name: "安阳市", pinyin: "anyang", letter: "A" },
  { code: "210300", name: "鞍山市", pinyin: "anshan", letter: "A" },
  { code: "520400", name: "安顺市", pinyin: "anshun", letter: "A" },
  { code: "610900", name: "安康市", pinyin: "ankang", letter: "A" },
  { code: "152900", name: "阿拉善盟", pinyin: "alashan", letter: "A" },
  
  // B
  { code: "110000", name: "北京市", pinyin: "beijing", letter: "B" },
  { code: "130600", name: "保定市", pinyin: "baoding", letter: "B" },
  { code: "150200", name: "包头市", pinyin: "baotou", letter: "B" },
  { code: "210500", name: "本溪市", pinyin: "benxi", letter: "B" },
  { code: "220600", name: "白山市", pinyin: "baishan", letter: "B" },
  { code: "220800", name: "白城市", pinyin: "baicheng", letter: "B" },
  { code: "340300", name: "蚌埠市", pinyin: "bengbu", letter: "B" },
  { code: "450500", name: "北海市", pinyin: "beihai", letter: "B" },
  { code: "511900", name: "巴中市", pinyin: "bazhong", letter: "B" },
  { code: "520500", name: "毕节市", pinyin: "bijie", letter: "B" },
  { code: "530500", name: "保山市", pinyin: "baoshan", letter: "B" },
  { code: "610300", name: "宝鸡市", pinyin: "baoji", letter: "B" },
  { code: "620400", name: "白银市", pinyin: "baiyin", letter: "B" },
  
  // C
  { code: "500000", name: "重庆市", pinyin: "chongqing", letter: "C" },
  { code: "130800", name: "承德市", pinyin: "chengde", letter: "C" },
  { code: "130900", name: "沧州市", pinyin: "cangzhou", letter: "C" },
  { code: "140400", name: "长治市", pinyin: "changzhi", letter: "C" },
  { code: "150400", name: "赤峰市", pinyin: "chifeng", letter: "C" },
  { code: "211300", name: "朝阳市", pinyin: "chaoyang", letter: "C" },
  { code: "220100", name: "长春市", pinyin: "changchun", letter: "C" },
  { code: "320400", name: "常州市", pinyin: "changzhou", letter: "C" },
  { code: "341100", name: "滁州市", pinyin: "chuzhou", letter: "C" },
  { code: "341700", name: "池州市", pinyin: "chizhou", letter: "C" },
  { code: "430100", name: "长沙市", pinyin: "changsha", letter: "C" },
  { code: "430700", name: "常德市", pinyin: "changde", letter: "C" },
  { code: "431000", name: "郴州市", pinyin: "chenzhou", letter: "C" },
  { code: "445100", name: "潮州市", pinyin: "chaozhou", letter: "C" },
  { code: "451400", name: "崇左市", pinyin: "chongzuo", letter: "C" },
  { code: "510100", name: "成都市", pinyin: "chengdu", letter: "C" },
  { code: "532300", name: "楚雄彝族自治州", pinyin: "chuxiong", letter: "C" },
  { code: "542100", name: "昌都市", pinyin: "changdu", letter: "C" },
  { code: "652300", name: "昌吉回族自治州", pinyin: "changji", letter: "C" },
  
  // D
  { code: "139001", name: "定州市", pinyin: "dingzhou", letter: "D" },
  { code: "140200", name: "大同市", pinyin: "datong", letter: "D" },
  { code: "150600", name: "鄂尔多斯市", pinyin: "eerduosi", letter: "D" },
  { code: "210200", name: "大连市", pinyin: "dalian", letter: "D" },
  { code: "210600", name: "丹东市", pinyin: "dandong", letter: "D" },
  { code: "230600", name: "大庆市", pinyin: "daqing", letter: "D" },
  { code: "232700", name: "大兴安岭地区", pinyin: "daxinganling", letter: "D" },
  { code: "370500", name: "东营市", pinyin: "dongying", letter: "D" },
  { code: "371400", name: "德州市", pinyin: "dezhou", letter: "D" },
  { code: "441900", name: "东莞市", pinyin: "dongguan", letter: "D" },
  { code: "469007", name: "东方市", pinyin: "dongfang", letter: "D" },
  { code: "510600", name: "德阳市", pinyin: "deyang", letter: "D" },
  { code: "511700", name: "达州市", pinyin: "dazhou", letter: "D" },
  { code: "532900", name: "大理白族自治州", pinyin: "dali", letter: "D" },
  { code: "533100", name: "德宏傣族景颇族自治州", pinyin: "dehong", letter: "D" },
  { code: "621200", name: "定西市", pinyin: "dingxi", letter: "D" },
  
  // E
  { code: "150600", name: "鄂尔多斯市", pinyin: "eerduosi", letter: "E" },
  { code: "420700", name: "鄂州市", pinyin: "ezhou", letter: "E" },
  { code: "422800", name: "恩施土家族苗族自治州", pinyin: "enshi", letter: "E" },
  { code: "152900", name: "阿拉善盟", pinyin: "alashan", letter: "E" },
  
  // F
  { code: "210400", name: "抚顺市", pinyin: "fushun", letter: "F" },
  { code: "210900", name: "阜新市", pinyin: "fuxin", letter: "F" },
  { code: "341200", name: "阜阳市", pinyin: "fuyang", letter: "F" },
  { code: "350100", name: "福州市", pinyin: "fuzhou", letter: "F" },
  { code: "361000", name: "抚州市", pinyin: "fuzhou2", letter: "F" },
  { code: "440600", name: "佛山市", pinyin: "foshan", letter: "F" },
  { code: "450600", name: "防城港市", pinyin: "fangchenggang", letter: "F" },
  
  // G
  { code: "360700", name: "赣州市", pinyin: "ganzhou", letter: "G" },
  { code: "440100", name: "广州市", pinyin: "guangzhou", letter: "G" },
  { code: "450300", name: "桂林市", pinyin: "guilin", letter: "G" },
  { code: "450800", name: "贵港市", pinyin: "guigang", letter: "G" },
  { code: "510800", name: "广元市", pinyin: "guangyuan", letter: "G" },
  { code: "511600", name: "广安市", pinyin: "guangan", letter: "G" },
  { code: "520100", name: "贵阳市", pinyin: "guiyang", letter: "G" },
  { code: "640400", name: "固原市", pinyin: "guyuan", letter: "G" },
  
  // H
  { code: "130400", name: "邯郸市", pinyin: "handan", letter: "H" },
  { code: "131100", name: "衡水市", pinyin: "hengshui", letter: "H" },
  { code: "150100", name: "呼和浩特市", pinyin: "huhehaote", letter: "H" },
  { code: "150700", name: "呼伦贝尔市", pinyin: "hulunbeier", letter: "H" },
  { code: "211400", name: "葫芦岛市", pinyin: "huludao", letter: "H" },
  { code: "230100", name: "哈尔滨市", pinyin: "haerbin", letter: "H" },
  { code: "230400", name: "鹤岗市", pinyin: "hegang", letter: "H" },
  { code: "231100", name: "黑河市", pinyin: "heihe", letter: "H" },
  { code: "320800", name: "淮安市", pinyin: "huaian", letter: "H" },
  { code: "330100", name: "杭州市", pinyin: "hangzhou", letter: "H" },
  { code: "330500", name: "湖州市", pinyin: "huzhou", letter: "H" },
  { code: "340100", name: "合肥市", pinyin: "hefei", letter: "H" },
  { code: "340400", name: "淮南市", pinyin: "huainan", letter: "H" },
  { code: "340600", name: "淮北市", pinyin: "huaibei", letter: "H" },
  { code: "341000", name: "黄山市", pinyin: "huangshan", letter: "H" },
  { code: "410600", name: "鹤壁市", pinyin: "hebi", letter: "H" },
  { code: "420200", name: "黄石市", pinyin: "huangshi", letter: "H" },
  { code: "421100", name: "黄冈市", pinyin: "huanggang", letter: "H" },
  { code: "430400", name: "衡阳市", pinyin: "hengyang", letter: "H" },
  { code: "431200", name: "怀化市", pinyin: "huaihua", letter: "H" },
  { code: "441300", name: "惠州市", pinyin: "huizhou", letter: "H" },
  { code: "441600", name: "河源市", pinyin: "heyuan", letter: "H" },
  { code: "451100", name: "贺州市", pinyin: "hezhou", letter: "H" },
  { code: "451200", name: "河池市", pinyin: "hechi", letter: "H" },
  { code: "460100", name: "海口市", pinyin: "haikou", letter: "H" },
  { code: "610700", name: "汉中市", pinyin: "hanzhong", letter: "H" },
  { code: "630200", name: "海东市", pinyin: "haidong", letter: "H" },
  { code: "632300", name: "黄南藏族自治州", pinyin: "huangnan", letter: "H" },
  { code: "632500", name: "海南藏族自治州", pinyin: "hainan", letter: "H" },
  { code: "632800", name: "海西蒙古族藏族自治州", pinyin: "haixi", letter: "H" },
  { code: "650500", name: "哈密市", pinyin: "hami", letter: "H" },
  
  // J
  { code: "140500", name: "晋城市", pinyin: "jincheng", letter: "J" },
  { code: "140700", name: "晋中市", pinyin: "jinzhong", letter: "J" },
  { code: "210700", name: "锦州市", pinyin: "jinzhou", letter: "J" },
  { code: "220200", name: "吉林市", pinyin: "jilin", letter: "J" },
  { code: "230300", name: "鸡西市", pinyin: "jixi", letter: "J" },
  { code: "230800", name: "佳木斯市", pinyin: "jiamusi", letter: "J" },
  { code: "330400", name: "嘉兴市", pinyin: "jiaxing", letter: "J" },
  { code: "330700", name: "金华市", pinyin: "jinhua", letter: "J" },
  { code: "360200", name: "景德镇市", pinyin: "jingdezhen", letter: "J" },
  { code: "360400", name: "九江市", pinyin: "jiujiang", letter: "J" },
  { code: "360800", name: "吉安市", pinyin: "jian", letter: "J" },
  { code: "370100", name: "济南市", pinyin: "jinan", letter: "J" },
  { code: "370800", name: "济宁市", pinyin: "jining", letter: "J" },
  { code: "410800", name: "焦作市", pinyin: "jiaozuo", letter: "J" },
  { code: "420800", name: "荆门市", pinyin: "jingmen", letter: "J" },
  { code: "421000", name: "荆州市", pinyin: "jingzhou", letter: "J" },
  { code: "440700", name: "江门市", pinyin: "jiangmen", letter: "J" },
  { code: "445200", name: "揭阳市", pinyin: "jieyang", letter: "J" },
  { code: "620200", name: "嘉峪关市", pinyin: "jiayuguan", letter: "J" },
  { code: "620300", name: "金昌市", pinyin: "jinchang", letter: "J" },
  { code: "620900", name: "酒泉市", pinyin: "jiuquan", letter: "J" },
  
  // K
  { code: "410200", name: "开封市", pinyin: "kaifeng", letter: "K" },
  { code: "530100", name: "昆明市", pinyin: "kunming", letter: "K" },
  { code: "650200", name: "克拉玛依市", pinyin: "kelamayi", letter: "K" },
  { code: "653000", name: "克孜勒苏柯尔克孜自治州", pinyin: "kezileisu", letter: "K" },
  { code: "653100", name: "喀什地区", pinyin: "kashi", letter: "K" },
  
  // L
  { code: "131000", name: "廊坊市", pinyin: "langfang", letter: "L" },
  { code: "141000", name: "临汾市", pinyin: "linfen", letter: "L" },
  { code: "141100", name: "吕梁市", pinyin: "lvliang", letter: "L" },
  { code: "211000", name: "辽阳市", pinyin: "liaoyang", letter: "L" },
  { code: "220400", name: "辽源市", pinyin: "liaoyuan", letter: "L" },
  { code: "320700", name: "连云港市", pinyin: "lianyungang", letter: "L" },
  { code: "331000", name: "台州市", pinyin: "taizhou", letter: "L" },
  { code: "331100", name: "丽水市", pinyin: "lishui", letter: "L" },
  { code: "341500", name: "六安市", pinyin: "liuan", letter: "L" },
  { code: "350800", name: "龙岩市", pinyin: "longyan", letter: "L" },
  { code: "371300", name: "临沂市", pinyin: "linyi", letter: "L" },
  { code: "371500", name: "聊城市", pinyin: "liaocheng", letter: "L" },
  { code: "410300", name: "洛阳市", pinyin: "luoyang", letter: "L" },
  { code: "411100", name: "漯河市", pinyin: "luohe", letter: "L" },
  { code: "431300", name: "娄底市", pinyin: "loudi", letter: "L" },
  { code: "450200", name: "柳州市", pinyin: "liuzhou", letter: "L" },
  { code: "451300", name: "来宾市", pinyin: "laibin", letter: "L" },
  { code: "510500", name: "泸州市", pinyin: "luzhou", letter: "L" },
  { code: "511100", name: "乐山市", pinyin: "leshan", letter: "L" },
  { code: "520200", name: "六盘水市", pinyin: "liupanshui", letter: "L" },
  { code: "530700", name: "丽江市", pinyin: "lijiang", letter: "L" },
  { code: "530900", name: "临沧市", pinyin: "lincang", letter: "L" },
  { code: "540100", name: "拉萨市", pinyin: "lasa", letter: "L" },
  { code: "540400", name: "林芝市", pinyin: "linzhi", letter: "L" },
  { code: "620100", name: "兰州市", pinyin: "lanzhou", letter: "L" },
  { code: "621200", name: "陇南市", pinyin: "longnan", letter: "L" },
  
  // M
  { code: "231000", name: "牡丹江市", pinyin: "mudanjiang", letter: "M" },
  { code: "340500", name: "马鞍山市", pinyin: "maanshan", letter: "M" },
  { code: "440900", name: "茂名市", pinyin: "maoming", letter: "M" },
  { code: "441400", name: "梅州市", pinyin: "meizhou", letter: "M" },
  { code: "510700", name: "绵阳市", pinyin: "mianyang", letter: "M" },
  { code: "511400", name: "眉山市", pinyin: "meishan", letter: "M" },
  
  // N
  { code: "320100", name: "南京市", pinyin: "nanjing", letter: "N" },
  { code: "320600", name: "南通市", pinyin: "nantong", letter: "N" },
  { code: "330200", name: "宁波市", pinyin: "ningbo", letter: "N" },
  { code: "350900", name: "宁德市", pinyin: "ningde", letter: "N" },
  { code: "360100", name: "南昌市", pinyin: "nanchang", letter: "N" },
  { code: "411300", name: "南阳市", pinyin: "nanyang", letter: "N" },
  { code: "450100", name: "南宁市", pinyin: "nanning", letter: "N" },
  { code: "511000", name: "内江市", pinyin: "neijiang", letter: "N" },
  { code: "511300", name: "南充市", pinyin: "nanchong", letter: "N" },
  { code: "533300", name: "怒江傈僳族自治州", pinyin: "nujiang", letter: "N" },
  { code: "542400", name: "那曲市", pinyin: "naqu", letter: "N" },
  
  // P
  { code: "211100", name: "盘锦市", pinyin: "panjin", letter: "P" },
  { code: "350300", name: "莆田市", pinyin: "putian", letter: "P" },
  { code: "360300", name: "萍乡市", pinyin: "pingxiang", letter: "P" },
  { code: "410400", name: "平顶山市", pinyin: "pingdingshan", letter: "P" },
  { code: "410900", name: "濮阳市", pinyin: "puyang", letter: "P" },
  { code: "510400", name: "攀枝花市", pinyin: "panzhihua", letter: "P" },
  { code: "620800", name: "平凉市", pinyin: "pingliang", letter: "P" },
  
  // Q
  { code: "130300", name: "秦皇岛市", pinyin: "qinhuangdao", letter: "Q" },
  { code: "230200", name: "齐齐哈尔市", pinyin: "qiqihaer", letter: "Q" },
  { code: "230900", name: "七台河市", pinyin: "qitaihe", letter: "Q" },
  { code: "330800", name: "衢州市", pinyin: "quzhou", letter: "Q" },
  { code: "350500", name: "泉州市", pinyin: "quanzhou", letter: "Q" },
  { code: "370200", name: "青岛市", pinyin: "qingdao", letter: "Q" },
  { code: "429005", name: "潜江市", pinyin: "qianjiang", letter: "Q" },
  { code: "441800", name: "清远市", pinyin: "qingyuan", letter: "Q" },
  { code: "450700", name: "钦州市", pinyin: "qinzhou", letter: "Q" },
  { code: "530300", name: "曲靖市", pinyin: "qujing", letter: "Q" },
  { code: "621000", name: "庆阳市", pinyin: "qingyang", letter: "Q" },
  
  // R
  { code: "371100", name: "日照市", pinyin: "rizhao", letter: "R" },
  { code: "540200", name: "日喀则市", pinyin: "rikaze", letter: "R" },
  
  // S
  { code: "310000", name: "上海市", pinyin: "shanghai", letter: "S" },
  { code: "130100", name: "石家庄市", pinyin: "shijiazhuang", letter: "S" },
  { code: "140600", name: "朔州市", pinyin: "shuozhou", letter: "S" },
  { code: "220300", name: "四平市", pinyin: "siping", letter: "S" },
  { code: "220700", name: "松原市", pinyin: "songyuan", letter: "S" },
  { code: "230500", name: "双鸭山市", pinyin: "shuangyashan", letter: "S" },
  { code: "231200", name: "绥化市", pinyin: "suihua", letter: "S" },
  { code: "320500", name: "苏州市", pinyin: "suzhou", letter: "S" },
  { code: "321300", name: "宿迁市", pinyin: "suqian", letter: "S" },
  { code: "330600", name: "绍兴市", pinyin: "shaoxing", letter: "S" },
  { code: "341300", name: "宿州市", pinyin: "suzhou2", letter: "S" },
  { code: "350200", name: "厦门市", pinyin: "xiamen", letter: "S" },
  { code: "350400", name: "三明市", pinyin: "sanming", letter: "S" },
  { code: "361100", name: "上饶市", pinyin: "shangrao", letter: "S" },
  { code: "411200", name: "三门峡市", pinyin: "sanmenxia", letter: "S" },
  { code: "411400", name: "商丘市", pinyin: "shangqiu", letter: "S" },
  { code: "420300", name: "十堰市", pinyin: "shiyan", letter: "S" },
  { code: "430500", name: "邵阳市", pinyin: "shaoyang", letter: "S" },
  { code: "440200", name: "韶关市", pinyin: "shaoguan", letter: "S" },
  { code: "440300", name: "深圳市", pinyin: "shenzhen", letter: "S" },
  { code: "440500", name: "汕头市", pinyin: "shantou", letter: "S" },
  { code: "441500", name: "汕尾市", pinyin: "shanwei", letter: "S" },
  { code: "460200", name: "三亚市", pinyin: "sanya", letter: "S" },
  { code: "460300", name: "三沙市", pinyin: "sansha", letter: "S" },
  { code: "611000", name: "商洛市", pinyin: "shangluo", letter: "S" },
  { code: "640200", name: "石嘴山市", pinyin: "shizuishan", letter: "S" },
  { code: "659001", name: "石河子市", pinyin: "shihezi", letter: "S" },
  
  // T
  { code: "120000", name: "天津市", pinyin: "tianjin", letter: "T" },
  { code: "130200", name: "唐山市", pinyin: "tangshan", letter: "T" },
  { code: "140100", name: "太原市", pinyin: "taiyuan", letter: "T" },
  { code: "150500", name: "通辽市", pinyin: "tongliao", letter: "T" },
  { code: "211200", name: "铁岭市", pinyin: "tieling", letter: "T" },
  { code: "220500", name: "通化市", pinyin: "tonghua", letter: "T" },
  { code: "321200", name: "泰州市", pinyin: "taizhou2", letter: "T" },
  { code: "331000", name: "台州市", pinyin: "taizhou", letter: "T" },
  { code: "340700", name: "铜陵市", pinyin: "tongling", letter: "T" },
  { code: "370900", name: "泰安市", pinyin: "taian", letter: "T" },
  { code: "429006", name: "天门市", pinyin: "tianmen", letter: "T" },
  { code: "520600", name: "铜仁市", pinyin: "tongren", letter: "T" },
  { code: "610200", name: "铜川市", pinyin: "tongchuan", letter: "T" },
  { code: "620500", name: "天水市", pinyin: "tianshui", letter: "T" },
  { code: "650400", name: "吐鲁番市", pinyin: "tulufan", letter: "T" },
  { code: "654200", name: "塔城地区", pinyin: "tacheng", letter: "T" },
  { code: "659003", name: "图木舒克市", pinyin: "tumushuke", letter: "T" },
  { code: "659006", name: "铁门关市", pinyin: "tiemenguan", letter: "T" },
  
  // W
  { code: "150300", name: "乌海市", pinyin: "wuhai", letter: "W" },
  { code: "150900", name: "乌兰察布市", pinyin: "wulanchabu", letter: "W" },
  { code: "320200", name: "无锡市", pinyin: "wuxi", letter: "W" },
  { code: "330300", name: "温州市", pinyin: "wenzhou", letter: "W" },
  { code: "340200", name: "芜湖市", pinyin: "wuhu", letter: "W" },
  { code: "370700", name: "潍坊市", pinyin: "weifang", letter: "W" },
  { code: "371000", name: "威海市", pinyin: "weihai", letter: "W" },
  { code: "420100", name: "武汉市", pinyin: "wuhan", letter: "W" },
  { code: "450400", name: "梧州市", pinyin: "wuzhou", letter: "W" },
  { code: "532600", name: "文山壮族苗族自治州", pinyin: "wenshan", letter: "W" },
  { code: "610500", name: "渭南市", pinyin: "weinan", letter: "W" },
  { code: "620600", name: "武威市", pinyin: "wuwei", letter: "W" },
  { code: "640300", name: "吴忠市", pinyin: "wuzhong", letter: "W" },
  { code: "650100", name: "乌鲁木齐市", pinyin: "wulumuqi", letter: "W" },
  { code: "659004", name: "五家渠市", pinyin: "wujiaqu", letter: "W" },
  
  // X
  { code: "130500", name: "邢台市", pinyin: "xingtai", letter: "X" },
  { code: "140900", name: "忻州市", pinyin: "xinzhou", letter: "X" },
  { code: "152200", name: "兴安盟", pinyin: "xingan", letter: "X" },
  { code: "152500", name: "锡林郭勒盟", pinyin: "xilinguole", letter: "X" },
  { code: "320300", name: "徐州市", pinyin: "xuzhou", letter: "X" },
  { code: "341800", name: "宣城市", pinyin: "xuancheng", letter: "X" },
  { code: "360500", name: "新余市", pinyin: "xinyu", letter: "X" },
  { code: "410700", name: "新乡市", pinyin: "xinxiang", letter: "X" },
  { code: "411000", name: "许昌市", pinyin: "xuchang", letter: "X" },
  { code: "411500", name: "信阳市", pinyin: "xinyang", letter: "X" },
  { code: "420600", name: "襄阳市", pinyin: "xiangyang", letter: "X" },
  { code: "420900", name: "孝感市", pinyin: "xiaogan", letter: "X" },
  { code: "421200", name: "咸宁市", pinyin: "xianning", letter: "X" },
  { code: "429004", name: "仙桃市", pinyin: "xiantao", letter: "X" },
  { code: "430300", name: "湘潭市", pinyin: "xiangtan", letter: "X" },
  { code: "433100", name: "湘西土家族苗族自治州", pinyin: "xiangxi", letter: "X" },
  { code: "532800", name: "西双版纳傣族自治州", pinyin: "xishuangbanna", letter: "X" },
  { code: "610100", name: "西安市", pinyin: "xian", letter: "X" },
  { code: "610400", name: "咸阳市", pinyin: "xianyang", letter: "X" },
  { code: "630100", name: "西宁市", pinyin: "xining", letter: "X" },
  { code: "810000", name: "香港特别行政区", pinyin: "xianggang", letter: "X" },
  
  // Y
  { code: "140300", name: "阳泉市", pinyin: "yangquan", letter: "Y" },
  { code: "140800", name: "运城市", pinyin: "yuncheng", letter: "Y" },
  { code: "210800", name: "营口市", pinyin: "yingkou", letter: "Y" },
  { code: "222400", name: "延边朝鲜族自治州", pinyin: "yanbian", letter: "Y" },
  { code: "230700", name: "伊春市", pinyin: "yichun", letter: "Y" },
  { code: "320900", name: "盐城市", pinyin: "yancheng", letter: "Y" },
  { code: "321000", name: "扬州市", pinyin: "yangzhou", letter: "Y" },
  { code: "360900", name: "宜春市", pinyin: "yichun", letter: "Y" },
  { code: "370600", name: "烟台市", pinyin: "yantai", letter: "Y" },
  { code: "420500", name: "宜昌市", pinyin: "yichang", letter: "Y" },
  { code: "430600", name: "岳阳市", pinyin: "yueyang", letter: "Y" },
  { code: "430900", name: "益阳市", pinyin: "yiyang", letter: "Y" },
  { code: "431100", name: "永州市", pinyin: "yongzhou", letter: "Y" },
  { code: "450900", name: "玉林市", pinyin: "yulin", letter: "Y" },
  { code: "511500", name: "宜宾市", pinyin: "yibin", letter: "Y" },
  { code: "511800", name: "雅安市", pinyin: "yaan", letter: "Y" },
  { code: "530400", name: "玉溪市", pinyin: "yuxi", letter: "Y" },
  { code: "610600", name: "延安市", pinyin: "yanan", letter: "Y" },
  { code: "610800", name: "榆林市", pinyin: "yulin", letter: "Y" },
  { code: "640100", name: "银川市", pinyin: "yinchuan", letter: "Y" },
  { code: "654000", name: "伊犁哈萨克自治州", pinyin: "yili", letter: "Y" },
  
  // Z
  { code: "130700", name: "张家口市", pinyin: "zhangjiakou", letter: "Z" },
  { code: "321100", name: "镇江市", pinyin: "zhenjiang", letter: "Z" },
  { code: "330900", name: "舟山市", pinyin: "zhoushan", letter: "Z" },
  { code: "350600", name: "漳州市", pinyin: "zhangzhou", letter: "Z" },
  { code: "370300", name: "淄博市", pinyin: "zibo", letter: "Z" },
  { code: "370400", name: "枣庄市", pinyin: "zaozhuang", letter: "Z" },
  { code: "410100", name: "郑州市", pinyin: "zhengzhou", letter: "Z" },
  { code: "411600", name: "周口市", pinyin: "zhoukou", letter: "Z" },
  { code: "411700", name: "驻马店市", pinyin: "zhumadian", letter: "Z" },
  { code: "430200", name: "株洲市", pinyin: "zhuzhou", letter: "Z" },
  { code: "430800", name: "张家界市", pinyin: "zhangjiajie", letter: "Z" },
  { code: "440400", name: "珠海市", pinyin: "zhuhai", letter: "Z" },
  { code: "440800", name: "湛江市", pinyin: "zhanjiang", letter: "Z" },
  { code: "441200", name: "肇庆市", pinyin: "zhaoqing", letter: "Z" },
  { code: "442000", name: "中山市", pinyin: "zhongshan", letter: "Z" },
  { code: "510300", name: "自贡市", pinyin: "zigong", letter: "Z" },
  { code: "512000", name: "资阳市", pinyin: "ziyang", letter: "Z" },
  { code: "520300", name: "遵义市", pinyin: "zunyi", letter: "Z" },
  { code: "530600", name: "昭通市", pinyin: "zhaotong", letter: "Z" },
  { code: "620700", name: "张掖市", pinyin: "zhangye", letter: "Z" },
  { code: "640500", name: "中卫市", pinyin: "zhongwei", letter: "Z" },
  { code: "820000", name: "澳门特别行政区", pinyin: "aomen", letter: "Z" },
]

// 按字母分组城市
export const groupedCities: Record<string, City[]> = allCities.reduce((acc, city) => {
  const letter = city.letter
  if (!acc[letter]) {
    acc[letter] = []
  }
  acc[letter].push(city)
  return acc
}, {} as Record<string, City[]>)

// 字母列表（只包含有城市的字母）
export const alphabetLetters: string[] = Object.keys(groupedCities).sort()

// 热门城市
export const hotCities: { code: string; name: string }[] = [
  { code: "110000", name: "北京市" },
  { code: "310000", name: "上海市" },
  { code: "440100", name: "广州市" },
  { code: "440300", name: "深圳市" },
  { code: "330100", name: "杭州市" },
  { code: "320100", name: "南京市" },
  { code: "320500", name: "苏州市" },
  { code: "510100", name: "成都市" },
  { code: "500000", name: "重庆市" },
  { code: "420100", name: "武汉市" },
  { code: "430100", name: "长沙市" },
  { code: "610100", name: "西安市" },
  { code: "440600", name: "佛山市" },
  { code: "441900", name: "东莞市" },
  { code: "330200", name: "宁波市" },
  { code: "350200", name: "厦门市" },
  { code: "370200", name: "青岛市" },
  { code: "410100", name: "郑州市" },
  { code: "530100", name: "昆明市" },
  { code: "210100", name: "沈阳市" },
  { code: "370100", name: "济南市" },
  { code: "120000", name: "天津市" },
  { code: "210200", name: "大连市" },
  { code: "320200", name: "无锡市" },
]

// 最近访问（需要从本地存储获取）
export const getRecentCities = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const recent = localStorage.getItem('recent_cities')
    return recent ? JSON.parse(recent) : []
  } catch {
    return []
  }
}

// 保存最近访问
export const saveRecentCity = (cityName: string): void => {
  if (typeof window === 'undefined') return
  try {
    const recent = getRecentCities()
    const newRecent = [cityName, ...recent.filter(c => c !== cityName)].slice(0, 10)
    localStorage.setItem('recent_cities', JSON.stringify(newRecent))
  } catch {
    // ignore
  }
}

// 搜索城市
export const searchCities = (keyword: string): City[] => {
  if (!keyword) return []
  const lowerKeyword = keyword.toLowerCase()
  return allCities.filter(city => 
    city.name.includes(keyword) || 
    city.pinyin.includes(lowerKeyword) ||
    city.letter === keyword.toUpperCase()
  ).slice(0, 20)
}

// 根据城市名称获取城市信息
export const getCityByName = (name: string): City | undefined => {
  return allCities.find(city => city.name === name)
}

// 获取所有城市名称列表
export const getAllCityNames = (): string[] => {
  return allCities.map(city => city.name)
}

// 根据名称查找城市编码
export const getCityCodeByName = (name: string): string | undefined => {
  const city = allCities.find(city => city.name === name)
  return city?.code
}

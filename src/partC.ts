import { writeFileSync } from "fs";
import { resolve } from "path";

var imageList = require('./2019-SMG-PVA-PZJS.json');
var partA = require('./2019PVA-PartA.json')
var partC = require('./2019PVA-PartC.json')
var combination = require('./纯电动CBC组合设计-20190418.json')
var combinationResList = require('./纯电动CBC组合设计-结果-20190418.json')

// 类别
const classifyList = [
  "Inter Luxury",
  "Entry Luxury",
  "Compact Luxury",
  "Upper med",
  "Low-med",
  "Small",
  "Luxury SUV-3",
  "Luxury SUV-2",
  "Medium SUV",
  "Compact SUV",
  "Small SUV",
  "Large MPV",
  "Medium MPV",
  "PHEV",
  "EV"
];

// 卷号
const volumeList = [
  "卷1",
  "卷2",
  "卷3",
  "卷4",
  "卷5",
  "卷6",
  "卷7"
]

// 问卷题号
const paramList1 = [
  'C1.1',
  'C2.2',
  "C2.10",
  "C2.10",
  "C2.10",
  "C3.6",
  "C3.6",
  "C3.6",
  "C3.14",
  "C3.14",
  "C5.5",
]

// 测试名称
const paramList2 = [
  "自动变速器(6档)",
  "无级变速器",
  "双离合变速器(6档)",
  "6MT",
  "7AT",
  "8AT",
  "9AT",
  "10AT",
  "7DCT",
  "8DCT",
  "9DCT",
  "10DCT",
  "三缸",
  "独立后悬架",
  "主动后悬架",
  "自适应后悬架",
  "前轮主动转向",
  "后轮主动转向",
  "四轮主动转向",
  "后轮驱动",
  "普通四驱(适时/分时)",
  "全时四驱",
  "电动两驱",
  "电动四驱",
]


// 需要返回的类型 testName 表示测试名称 volume 表示问卷题号
const types = ['volume', 'testName']


var judge_test_name_or_volume = function (data: any) {
  var classify = data.classify;
  // var index = + data.index.toString();
  var volume = data.volume;
  var param = data.param;
  var type = data.type;

  var list = partC.filter(function (item: any) {
    return item[classify] == volume;
  })

  // console.log('list', list);

  // var row = list[index - 1];
  var row = list.find(function (item: any) {
    if (type == 'volume') {
      return (item['问卷题号'] == param)
    }
    if (type == 'testName') {
      return (item['测试名称'] == param);
    }
  })
  // console.log('............');
  // console.log(row);

  var result = false;
  if (row) {
    result = true;
  }

  return {
    result: result,
    valid: result
  }
}


const list:any = []

classifyList.forEach(classify => {
  volumeList.forEach(volume => {
    types.forEach(type => {
      if (type == 'volume') {
        paramList1.forEach(param => {
          const data = {
            volume,
            classify,
            type,
            param,
          }
          const res = judge_test_name_or_volume(data);
          const result = {
            data,
            res,
          }
          list.push(result)
          // writeFileSync(resolve(__dirname,'result','partC1.json'))
        })
      }
      if (type == 'testName') {
        paramList2.forEach(param => {
          const data = {
            volume,
            classify,
            type,
            param,
          }
          const res = judge_test_name_or_volume(data);
          const result = {
            data,
            res,
          }
          list.push(result)
          // writeFileSync(resolve(__dirname,'result','partC1.json'))
        })
      }
    })
  })
})

writeFileSync(resolve(__dirname, 'result', 'partC.json'), JSON.stringify(list), {
  encoding: 'utf8'
})

import { writeFileSync } from "fs";
import { resolve } from "path";

var imageList = require('./2019-SMG-PVA-PZJS.json');
var partA = require('./2019PVA-PartA.json')
var partC = require('./2019PVA-PartC.json')
var combination = require('./纯电动CBC组合设计-20190418.json')
var combinationResList = require('./纯电动CBC组合设计-结果-20190418.json')

// 卷号
const volumeList = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
]

// 循环题的第几个循环
const indexList = [
  '1',
  '2',
  '3',
  '4',
  '5',
]

// 组合:例： 组合1/组合2...
const combList = [
  '1',
  '2',
  '3',
  '4',
  '5'
]

var get_cbc_option_id = function (data: any) {
  var volume = data.volume.trim();
  var index = +data.index.trim();
  var comb = data.comb.trim();
  // var option = data.option.trim();
  var row = combination.find(function (item: any) {
    return item['卷号'] == volume && item['题号'] == index;
  })
  var id = '';
  if (row) {
    var p = '组合' + comb
    id = row[p];
  }
  return {
    result: id,
  }
}

const list: any = []

volumeList.forEach(volume => {
  indexList.forEach(index => {
    combList.forEach(comb => {
      const data = {
        volume,
        index,
        comb,
      }

      const res = get_cbc_option_id(data);

      const result = {
        data,
        res
      }

      list.push(result);
    })
  })
})

writeFileSync(resolve(__dirname, 'result', 'partB.json'), JSON.stringify(list), { encoding: 'utf8' });
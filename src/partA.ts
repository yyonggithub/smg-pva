import { writeFileSync, fstat } from "fs";
import { resolve } from "path";

import { imageList, partA, partC, combination, combinationResList } from './index';

var preUrl = 'https://media.cform.io/2019-SGM-PVA-PZJS/';

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

// 卷名
const volumeList = [
  "卷1",
  "卷2",
  "卷3",
  "卷4",
  "卷5",
  "卷6",
  "卷7"
]

// 循环题的第几个循环
const index = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

// 需要返回的类型 name 表示测试名称，url 表示图片html元素
const type = ['name', 'url']

const get_image_info_or_test_name = function (data: any) {
  var classify = data.classify.trim();
  var index = +data.index.toString().trim();
  var volume = data.volume.trim();
  var type = data.type.trim();

  var list = partA.filter(function (item: any) {
    return item[classify] == volume
  })

  var row = list[index - 1];
  var name = '';
  if (row) {
    name = row['测试名称'];
  }

  if (type === 'name') {
    return {
      result: name
    }
  }

  var reg = new RegExp(transfer(name), 'i')
  var imgRow = imageList.find(function (img: any) {
    return img.image && reg.test(img.image);
  })

  var ele = '';
  if (imgRow) {
    // ele = '<img src="' + preUrl + (imgRow.image ? imgRow.image : "") + '" alt="' + name + '"/>';
    ele = '<img src="' + preUrl + (imgRow.image ? imgRow.image : "") + '" alt="' + name + '"/>';

  }
  console.log(ele)
  return {
    result: ele,
  }
}

// const s = get_image_info_or_test_name({
//   classify: "Inter Luxury",
//   index: '6',
//   volume: '卷3',
//   type: 'url'
//   // type: 'name'
// })

// console.log(s);

function transfer(str: string) {
  var entityMap: any = {
    ")": "\\)",
    "(": "\\(",
    "/": " ",
  }

  return str.replace(/[\(\)\/]/g, function (s) {
    console.log(s);

    return entityMap[s]
  })
}

const list: { data: { classify: string; index: number; volume: string; type: string; }; result: { result: any; }; }[] = []

classifyList.forEach((classify) => {
  volumeList.forEach((volume) => {
    index.forEach(idx => {
      type.forEach(t => {
        const data = {
          classify,
          index: idx,
          volume,
          type: t
        }

        const result = get_image_info_or_test_name(data)

        const res = {
          data,
          result
        }

        list.push(res);

      })
    })
  })
})


const str = JSON.stringify(list);

writeFileSync(resolve(__dirname, 'result', 'partA.json'), str, { encoding: 'utf8' })
import * as fs from 'fs';
import { resolve } from "path";
const folder = resolve(__dirname, 'result')

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

export const imageList = require('./2019-SMG-PVA-PZJS.json');
export var partA = require('./2019PVA-PartA.json')
export var partC = require('./2019PVA-PartC.json')
export var combination = require('./纯电动CBC组合设计-20190418.json')
export var combinationResList = require('./纯电动CBC组合设计-结果-20190418.json')
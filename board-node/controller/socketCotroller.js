const { linkQuery } = require("../until/sqlSever");

// 返回的笔记信息配置
const retBrushAtt = [
  "brushId",
  "boardId",
  "userId",
  "type",
  "data",
  "x",
  "y",
  "width",
  "height",
  "createdTime",
];
class retBrushData {
  constructor(data) {
    for (let key in data) {
      if (retBrushAtt.includes(key)) {
        this[key] = data[key];
      }
    }
  }
}
const getBrushData = async (brushId) => {
  let sqlStr = `select * from brush where brushId like '` + brushId + `'`
  let data = await linkQuery(sqlStr);
  if (data.length > 0) {
    const buffer = Buffer.from(data[0].data);
    data[0].data = buffer.toString("utf-8");
    data[0] = new retBrushData(data[0]);
    return data[0];
  } else {
    return -1;
  }
}

module.exports = { getBrushData };
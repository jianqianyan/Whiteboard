const { add, update } = require(`../until/sqlSever`);
const { sqlTime } = require(`../until/Time`);
const { timesTamp } = require("../until/Time");
const brushAtt = [
  "brushId",
  "boardId",
  "userId",
  "type",
  "data",
  "x",
  "y",
  "width",
  "height",
  "createTime",
  "delected",
  "revised",
  "lastRevised",
  "delectTime",
];
class brushData {
  constructor(data) {
    for (let key in data) {
      if (brushAtt.includes(key)) {
        this[key] = data[key];
      }
    }
  }
}

/**
 * @description: 新增笔迹
 * @param {data: 笔迹所需数据}
 * @return {message: 返回信息}
 **/
const brushAdd = async (data) => {
  let brushdata = new brushData(data);
  let result = await add("brush", brushdata);
  if (result !== -1) return "OK";
  else return -1;
};

/**
 * @description: 笔迹修改
 * @param {data: 笔迹所需数据, newBrushId: 新的笔迹id}
 * @return {message: 返回信息}
 * 这里的逻辑应该是先插入一条新的笔迹,然后新的笔迹中lastRevised为旧笔迹id
 * 旧笔迹的revised改为1
 **/
const brushUpdate = async (data) => {
  let newData = new brushData(data.data);
  let oldData = new brushData(data.data);
  newData.brushId = data.newBrushId;
  newData.lastRevised = data.data.brushId;
  newData.createTime = data.createTime;
  let result = await add("brush", newData);
  if (result === -1) return -1;
  let target = { brushId: oldData.brushId };
  let message = { revised: 1 };
  result = await update("brush", target, message, 1, 0);
  if (result === -1) return -1;
  return "OK";
};
/**
 * @description: 新增白板
 * @param {userId: 用户id}
 * @return {boardId: 白板id}
 **/
const boardAdd = async (userId) => {
  let boardIdPre = "u" + userId + "t";
  let boardId = timesTamp(boardIdPre);
  let data = {
    boardId: boardId,
    userId: userId,
    createTime: sqlTime(),
  };
  let result = await add("board", data);
  if (result) return boardId;
  else return -1;
};

/**
 * @description: 删除笔迹
 * @param {data: {brushId: 被删除的brushId, delectTime: 删除时间}}
 * @return {message: 返回信息}
 **/
const brushDelect = async (data) => {
  let target = { brushId: data.brushId };
  let message = { delected: 1 };
  let result = await update("brush", target, message, 1, 1);
  if (result === -1) return -1;
  message = { delectTime: data.delectTime };
  result = await update("brush", target, message, 1, 0);
  if (result === -1) return -1;
  return "OK";
};

module.exports = { brushAdd, boardAdd, brushUpdate, brushDelect };

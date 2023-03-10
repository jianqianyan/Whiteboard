const { linkQuery } = require("../until/sqlSever");

const getBoardList = async (data) => {
  let begin = (Number(data.page) - 1) * Number(data.pageSize);
  let end = Number(data.page) * Number(data.pageSize);
  let limit = ` limit ` + begin + `,` + end;
  let sqlstr = `select * from board` + limit;
  if (data.userId && data.boardId) {
    sqlstr =
      `select * from board where boardId like '` +
      data.boardId +
      `' and userId like '` +
      data.userId +
      `'` +
      limit;
  } else if (data.userId) {
    sqlstr =
      `select * from board where userId like '` + data.userId + `'` + limit;
  } else if (data.boardId) {
    sqlstr =
      `select * from board where boardId like '` + data.boardId + `'` + limit;
  }
  let boardList = await linkQuery(sqlstr);
  let list = boardList.map((item) => {
    if (item.snapshot) {
      const buffer = Buffer.from(item.snapshot);
      item.snapshot = buffer.toString("utf-8");
    }
    return item;
  });
  return list.length > 0 ? list : -1;
};

module.exports = { getBoardList };

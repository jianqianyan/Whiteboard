const { add } = require(`../until/sqlSever`);

const brushAdd = async (data) => {
  let brushdata = data.data;
  brushdata.createTime = data.createTime;
  return await add("brush", brushdata);
};

module.exports = { brushAdd };

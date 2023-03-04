import { DrawInfo } from "./ExCanvas/Brush";
import API from "../plugin/axios/axiosInstance";
import { sqlTime } from "../tools/sqlTime";
import _ from "lodash";
export function brushAdd(drawInfo: DrawInfo) {
  let info: DrawInfo = _.cloneDeep(drawInfo);
  info.data = JSON.stringify(info.data);
  let body = {
    data: info,
    createTime: sqlTime(),
  };
  API({
    url: "/board/brushAdd",
    method: "post",
    data: body,
  })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
}

export function brushUpdate(drawInfo: DrawInfo) {
  let info: DrawInfo = _.cloneDeep(drawInfo);
  info.data = JSON.stringify(info.data);
  let body = {
    data: info,
    createTime: sqlTime(),
  };
  API({
    url: "/board/brushUpdate",
    method: "post",
    data: body,
  })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
}

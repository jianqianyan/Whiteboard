import { DrawInfo } from "./ExCanvas/Brush";
import API from "../plugin/axios/axiosInstance";
import { sqlTime } from "../tools/sqlTime";
import _ from "lodash";
export function brushAdd(drawInfo: DrawInfo, snapshot: any) {
  let info: DrawInfo = _.cloneDeep(drawInfo);
  if (info.userId === "-1" || info.boardId === "-1") return;
  info.data = JSON.stringify(info.data);
  let body = {
    data: info,
    createTime: sqlTime(),
    snapshot: snapshot,
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

export function brushUpdate(drawInfo: DrawInfo, newBrushId: string, snapshot: any) {
  let info: DrawInfo = _.cloneDeep(drawInfo);
  if (info.userId === "-1" || info.boardId === "-1") return;
  info.data = JSON.stringify(info.data);
  let body = {
    data: info,
    createTime: sqlTime(),
    newBrushId: newBrushId,
    snapshot: snapshot,
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
  drawInfo.brushId = newBrushId;
}

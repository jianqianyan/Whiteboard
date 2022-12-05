import { DrawInfo } from "./ExCanvas/Brush";
import API from "../plugin/axios/axiosInstance";
import { sqlTime } from "../tools/sqlTime";
export function brushAdd(info: DrawInfo,) {
    info.data = JSON.stringify(info.data);
    let body = {
        data: info,
        Time: sqlTime(),
    };
    API({
        url: '/create',
        method: 'post',
        data: body,
    }).then(res => {
    }).catch(err => {
        console.log(err);
    })
}
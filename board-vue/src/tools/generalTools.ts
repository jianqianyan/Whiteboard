export function timesTamp(prefix: string) {
    let nowDate = new Date();
    let nowTime = nowDate.getTime();
    let random = String(Math.ceil(Math.random() * 10001));
    return prefix + nowTime + random;
}
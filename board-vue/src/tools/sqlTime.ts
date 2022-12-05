export function sqlTime() {
    let date = new Date();
    let fmt = 'YYYY-MM-DD hh:mm:ss';
    let opt: Record<string, string> = {
        'Y+': date.getFullYear().toString(),
        'M+': (date.getMonth() + 1).toString(),
        'D+': date.getDate().toString(),
        'h+': date.getHours().toString(),
        'm+': date.getMinutes().toString(),
        's+': date.getSeconds().toString(),
    };
    for (let k in opt) {
        let ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
        }
    }
    fmt = fmt.replace(' ', 'T');
    fmt += 'Z';
    return fmt;
}
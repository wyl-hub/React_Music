export function formatCount(count) {
    if (!count || count < 0) return
    if (count < 10000) {
        return count
    } else if (count < (10000 * 10000)) {
        return (count / 10000).toFixed(2) + '万'
    } else {
        return count / (10000 * 10000).toFixed(2) + '亿'
    }
}

const parserExp = new RegExp(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/)
export function formatLyc(arr) {
    const lyricList = []
    for (let item of arr) {
        if (item) {
            const result = parserExp.exec(item)
            if (!result) continue
            const time1 = result[1] * 60 * 1000
            const time2 = result[2] * 1000
            const time3 = result[3].length === 2 ? result[3] * 10 : result[3] * 1
            const time = time1 + time2 + time3
            const content = result['input'].replace(parserExp, '').trim()
            lyricList.push({
                time,
                content
            })
        }
    }
    return lyricList
}
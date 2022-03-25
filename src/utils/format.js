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
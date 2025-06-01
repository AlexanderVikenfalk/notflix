export const getVisiblePages = (
    current: number,
    total: number
): (number | 'ellipsis')[] => {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: (number | 'ellipsis')[] = []
    pages.push(1)

    if (current <= 3) {
        pages.push(2, 3)
        if (total > 4) pages.push('ellipsis')
        pages.push(total)
    } else if (current >= total - 2) {
        if (total > 4) pages.push('ellipsis')
        pages.push(total - 2, total - 1, total)
    } else {
        pages.push('ellipsis')
        pages.push(current)
        pages.push('ellipsis')
        pages.push(total)
    }

    return pages
}

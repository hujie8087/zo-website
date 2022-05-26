export const filterHtml = (val) => {
    return val.replace(/<.>/g, '')
}
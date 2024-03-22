export const decodeHTMLEntities  = (text) => {
    let txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value;
}
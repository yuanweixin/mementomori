export const BDAY_KEY = "mmori.bday";
export const GRIDTYPE_KEY = "mmori.gtype";

export const GridType = {
    DAYS : 0,
    WEEKS : 1,
    MONTHS: 2, 
    YEARS: 3,
    strvals : ["DAYS", "WEEKS", "MONTHS", "YEARS"]
}
GridType.toString = (gridType) => {
    return GridType.strvals[gridType];
}
Object.freeze(GridType);

export const loadBday = async () => {
    let res = await chrome.storage.sync.get([BDAY_KEY]);
    let d = Date.parse(res[BDAY_KEY])
    if (isNaN(d)) 
        return null;
    return d; 
}

export const loadGridType = async () => {
    let res = await chrome.storage.sync.get([GRIDTYPE_KEY]);
    let n =  Number(res[GRIDTYPE_KEY]);
    if (isNaN(n)) {
        return GridType.WEEKS; // reasonable default. 
    } 
    return n;
}

export const storeBday = async (bday) => {
    let obj = {} 
    obj[BDAY_KEY] = bday.toString();
    await chrome.storage.sync.set(obj);
}

export const storeGridType = async (gridTypeStr) => {
    let obj = {}
    obj[GRIDTYPE_KEY] = gridTypeStr;
    await chrome.storage.sync.set(obj);
}

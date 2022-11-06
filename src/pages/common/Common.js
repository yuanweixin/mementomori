export const BDAY_KEY = "mmori.bday";
export const GRIDTYPE_KEY = "mmori.gtype";
export const AGE_EXPECTANCY = "mmori.ae"
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
    return new Date(d);
}

export const loadGridType = async () => {
    let res = await chrome.storage.sync.get([GRIDTYPE_KEY]);
    let n =  Number(res[GRIDTYPE_KEY]);
    if (isNaN(n)) {
        return GridType.WEEKS; // reasonable default. 
    } 
    return n;
}

export const loadAgeExpectancy = async () => {
    let res = await chrome.storage.sync.get([AGE_EXPECTANCY]);
    let n =  Number(res[AGE_EXPECTANCY]);
    if (isNaN(n)) {
        return 76.22; // for male, from https://www.ssa.gov/oact/STATS/table4c6.html, accessed 11/6/2022 
    } 
    return n;
}

export const storeAgeExpectancy = async (ae) => {
    let obj = {}
    obj[AGE_EXPECTANCY] = ae;
    await chrome.storage.sync.set(obj);
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

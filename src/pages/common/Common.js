export const BDAY_KEY = "mmori.bday";

export const loadBday = async () => {
    let res = await chrome.storage.sync.get([BDAY_KEY]);
    return new Date(res[BDAY_KEY]); // Date(some str) returns current time. Fk javascript. 
}
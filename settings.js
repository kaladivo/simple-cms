import defaultSettings from "./defaultSettings";

let mSettings = null;

function getSettings() {
  if(mSettings == null) throw new Error('Settings must be initialized first');
  return mSettings;
}

export function initSettings(settings) {
  mSettings = injectDefaultValues(settings);
}

function injectDefaultValues(settings) {
  return {...defaultSettings, ...settings};
}

export {getSettings};
export default getSettings;


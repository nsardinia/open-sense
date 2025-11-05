'use strict';

function tryGettingFetch() {
  if (typeof self !== "undefined") {
    return fetch.bind(self);
  }
  if (typeof global !== "undefined" && global.fetch) {
    return global.fetch;
  }
  return null;
}
class ClientConfig {
  constructor() {
    /**
     * MapTiler Cloud API key
     */
    this._apiKey = "";
    /**
     * The fetch function. To be set if in Node < 18, otherwise
     * will be automatically resolved.
     */
    this._fetch = tryGettingFetch();
    /**
     * Number of tiles to keep in cache
     */
    this.tileCacheSize = 200;
  }
  /**
   * Set the MapTiler Cloud API key
   */
  set apiKey(k) {
    this._apiKey = k;
  }
  /**
   * Get the MapTiler Cloud API key
   */
  get apiKey() {
    return this._apiKey;
  }
  /**
   * Set a the custom fetch function to replace the default one
   */
  set fetch(f) {
    this._fetch = f;
  }
  /**
   * Get the fetch fucntion
   */
  get fetch() {
    return this._fetch;
  }
}
const config = new ClientConfig();

const NonISOLanguage = {
  /**
   * Language mode to display the labels in the end user's device language.
   */
  AUTO: {
    code: null,
    flag: "auto",
    name: "Auto",
    latin: false,
    isMode: true,
    geocoding: true
  },
  /**
   * The OSM language using latin script. MapTiler discourages its use as a primary language setting due to the lack of actual linguistic specificity,
   * though it can be an handy fallback. This is not to be confused with the "Classical Latin" language, which is available under the tag `.CLASSICAL_LATIN`.
   */
  LATIN: {
    code: "latin",
    flag: "name:latin",
    name: "Latin",
    latin: true,
    isMode: false,
    geocoding: false
  },
  /**
   * The OSM language using non-latin script. MapTiler discourages its use as a primary language setting due to the lack of actual linguistic specificity,
   * though it can be an handy fallback.
   */
  NON_LATIN: {
    code: "nonlatin",
    flag: "name:nonlatin",
    name: "Non Latin",
    latin: false,
    isMode: false,
    geocoding: false
  },
  /**
   * Using the local language generaly (but not always) means that every labels of a given region will use the dominant local language.
   */
  LOCAL: {
    code: null,
    flag: "name",
    name: "Local",
    latin: true,
    isMode: false,
    geocoding: false
  }
};
const ISOLanguage = {
  /**
   * Albanian language
   */
  ALBANIAN: {
    code: "sq",
    flag: "name:sq",
    name: "Albanian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Amharic language
   */
  AMHARIC: {
    code: "am",
    flag: "name:am",
    name: "Amharic",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Arabic language (right-to-left script)
   */
  ARABIC: {
    code: "ar",
    flag: "name:ar",
    name: "Arabic",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Armenian language
   */
  ARMENIAN: {
    code: "hy",
    flag: "name:hy",
    name: "Armenian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Azerbaijani language
   */
  AZERBAIJANI: {
    code: "az",
    flag: "name:az",
    name: "Azerbaijani",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Basque language
   */
  BASQUE: {
    code: "eu",
    flag: "name:eu",
    name: "Basque",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Belarusian langauge
   */
  BELARUSIAN: {
    code: "be",
    flag: "name:be",
    name: "Belarusian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Bengali language
   */
  BENGALI: {
    code: "bn",
    flag: "name:bn",
    name: "Bengali",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Bosnian language
   */
  BOSNIAN: {
    code: "bs",
    flag: "name:bs",
    name: "Bosnian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Breton language
   */
  BRETON: {
    code: "br",
    flag: "name:br",
    name: "Breton",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Bulgarian language
   */
  BULGARIAN: {
    code: "bg",
    flag: "bg",
    name: "Bulgarian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Catalan language
   */
  CATALAN: {
    code: "ca",
    flag: "name:ca",
    name: "Catalan",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Chinese language
   */
  CHINESE: {
    code: "zh",
    flag: "name:zh",
    name: "Chinese",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Traditional Chinese language
   */
  TRADITIONAL_CHINESE: {
    code: "zh-Hant",
    flag: "name:zh-Hant",
    name: "Chinese (traditional)",
    latin: false,
    isMode: false,
    geocoding: false
  },
  /**
   * Simplified Chinese language
   */
  SIMPLIFIED_CHINESE: {
    code: "zh-Hans",
    flag: "name:zh-Hans",
    name: "Chinese (simplified)",
    latin: false,
    isMode: false,
    geocoding: false
  },
  /**
   * Corsican language
   */
  CORSICAN: {
    code: "co",
    flag: "name:co",
    name: "Corsican",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Croatian language
   */
  CROATIAN: {
    code: "hr",
    flag: "name:hr",
    name: "Croatian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Czech language
   */
  CZECH: {
    code: "cs",
    flag: "name:cs",
    name: "Czech",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Danish language
   */
  DANISH: {
    code: "da",
    flag: "name:da",
    name: "Danish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Dutch language
   */
  DUTCH: {
    code: "nl",
    flag: "name:nl",
    name: "Dutch",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * German language
   */
  GERMAN: {
    code: "de",
    flag: "name:de",
    name: "German",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Greek language
   */
  GREEK: {
    code: "el",
    flag: "name:el",
    name: "Greek",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * English language
   */
  ENGLISH: {
    code: "en",
    flag: "name:en",
    name: "English",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Esperanto language
   */
  ESPERANTO: {
    code: "eo",
    flag: "name:eo",
    name: "Esperanto",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Estonian language
   */
  ESTONIAN: {
    code: "et",
    flag: "name:et",
    name: "Estonian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Finnish language
   */
  FINNISH: {
    code: "fi",
    flag: "name:fi",
    name: "Finnish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * French language
   */
  FRENCH: {
    code: "fr",
    flag: "name:fr",
    name: "French",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Frisian language
   */
  FRISIAN: {
    code: "fy",
    flag: "name:fy",
    name: "Frisian (West)",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Georgian language
   */
  GEORGIAN: {
    code: "ka",
    flag: "name:ka",
    name: "Georgian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Hebrew language (right-to-left non-latin script)
   */
  HEBREW: {
    code: "he",
    flag: "name:he",
    name: "Hebrew",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Hindi language
   */
  HINDI: {
    code: "hi",
    flag: "name:hi",
    name: "Hindi",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Hungarian language
   */
  HUNGARIAN: {
    code: "hu",
    flag: "name:hu",
    name: "Hungarian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Icelandic language
   */
  ICELANDIC: {
    code: "is",
    flag: "name:is",
    name: "Icelandic",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Indonesian language
   */
  INDONESIAN: {
    code: "id",
    flag: "name:id",
    name: "Indonesian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Irish language
   */
  IRISH: {
    code: "ga",
    flag: "name:ga",
    name: "Irish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Italian language
   */
  ITALIAN: {
    code: "it",
    flag: "name:it",
    name: "Italian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Japanese language
   */
  JAPANESE: {
    code: "ja",
    flag: "name:ja",
    name: "Japanese",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Japanese language in Hiragana form
   */
  JAPANESE_HIRAGANA: {
    code: "ja-Hira",
    flag: "name:ja-Hira",
    name: "Japanese Hiragana form",
    latin: false,
    isMode: false,
    geocoding: false
  },
  /**
   * Japanese language (latin script)
   */
  JAPANESE_2018: {
    code: "ja-Latn",
    flag: "name:ja-Latn",
    name: "Japanese (Latin 2018)",
    latin: true,
    isMode: false,
    geocoding: false
  },
  /**
   * Japanese language in Kana form (non-latin script)
   */
  JAPANESE_KANA: {
    code: "ja_kana",
    flag: "name:ja_kana",
    name: "Japanese (Kana)",
    latin: false,
    isMode: false,
    geocoding: false
  },
  /**
   * Japanse language, romanized (latin script)
   */
  JAPANESE_LATIN: {
    code: "ja_rm",
    flag: "name:ja_rm",
    name: "Japanese (Latin script)",
    latin: true,
    isMode: false,
    geocoding: false
  },
  /**
   * Kannada language
   */
  KANNADA: {
    code: "kn",
    flag: "name:kn",
    name: "Kannada",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Kazakh language
   */
  KAZAKH: {
    code: "kk",
    flag: "name:kk",
    name: "Kazakh",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Korean language
   */
  KOREAN: {
    code: "ko",
    flag: "name:ko",
    name: "Korean",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Korean language (latin script)
   */
  KOREAN_LATIN: {
    code: "ko-Latn",
    flag: "name:ko-Latn",
    name: "Korean (Latin script)",
    latin: true,
    isMode: false,
    geocoding: false
  },
  /**
   * Kurdish language
   */
  KURDISH: {
    code: "ku",
    flag: "name:ku",
    name: "Kurdish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Classical Latin language
   */
  CLASSICAL_LATIN: {
    code: "la",
    flag: "name:la",
    name: "Latin",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Latvian language
   */
  LATVIAN: {
    code: "lv",
    flag: "name:lv",
    name: "Latvian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Lithuanian language
   */
  LITHUANIAN: {
    code: "lt",
    flag: "name:lt",
    name: "Lithuanian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Luxembourgish language
   */
  LUXEMBOURGISH: {
    code: "lb",
    flag: "name:lb",
    name: "Luxembourgish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Macedonian language
   */
  MACEDONIAN: {
    code: "mk",
    flag: "name:mk",
    name: "Macedonian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Malayalm language
   */
  MALAYALAM: {
    code: "ml",
    flag: "name:ml",
    name: "Malayalam",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Maltese language
   */
  MALTESE: {
    code: "mt",
    flag: "name:mt",
    name: "Maltese",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Norwegian language
   */
  NORWEGIAN: {
    code: "no",
    flag: "name:no",
    name: "Norwegian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Occitan language
   */
  OCCITAN: {
    code: "oc",
    flag: "name:oc",
    name: "Occitan",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Persian language
   */
  PERSIAN: {
    code: "fa",
    flag: "name:fa",
    name: "Persian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Polish language
   */
  POLISH: {
    code: "pl",
    flag: "name:pl",
    name: "Polish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Portuguese language
   */
  PORTUGUESE: {
    code: "pt",
    flag: "name:pt",
    name: "Portuguese",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Punjabi language
   */
  PUNJABI: {
    code: "pa",
    flag: "name:pa",
    name: "Punjabi",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Western Punjabi language
   */
  WESTERN_PUNJABI: {
    code: "pnb",
    flag: "name:pnb",
    name: "Western Punjabi",
    latin: false,
    isMode: false,
    geocoding: false
  },
  /**
   * Romanian language
   */
  ROMANIAN: {
    code: "ro",
    flag: "name:ro",
    name: "Romanian",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Romansh language
   */
  ROMANSH: {
    code: "rm",
    flag: "name:rm",
    name: "Romansh",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Russian language
   */
  RUSSIAN: {
    code: "ru",
    flag: "name:ru",
    name: "Russian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Serbian language (cyrillic script)
   */
  SERBIAN_CYRILLIC: {
    code: "sr",
    flag: "name:sr",
    name: "Serbian (Cyrillic script)",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Serbian language (latin script)
   */
  SERBIAN_LATIN: {
    code: "sr-Latn",
    flag: "name:sr-Latn",
    name: "Serbian (Latin script)",
    latin: true,
    isMode: false,
    geocoding: false
  },
  /**
   * Scottish Gaelic language
   */
  SCOTTISH_GAELIC: {
    code: "gd",
    flag: "name:gd",
    name: "Scottish Gaelic",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Slovak language
   */
  SLOVAK: {
    code: "sk",
    flag: "name:sk",
    name: "Slovak",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Slovene language
   */
  SLOVENE: {
    code: "sl",
    flag: "name:sl",
    name: "Slovene",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Spanish language
   */
  SPANISH: {
    code: "es",
    flag: "name:es",
    name: "Spanish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Swedish language
   */
  SWEDISH: {
    code: "sv",
    flag: "name:sv",
    name: "Swedish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Tamil language
   */
  TAMIL: {
    code: "ta",
    flag: "name:ta",
    name: "Tamil",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Telugu language
   */
  TELUGU: {
    code: "te",
    flag: "name:te",
    name: "Telugu",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Thai language
   */
  THAI: {
    code: "th",
    flag: "name:th",
    name: "Thai",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Turkish language
   */
  TURKISH: {
    code: "tr",
    flag: "name:tr",
    name: "Turkish",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Ukrainian language
   */
  UKRAINIAN: {
    code: "uk",
    flag: "name:uk",
    name: "Ukrainian",
    latin: false,
    isMode: false,
    geocoding: true
  },
  /**
   * Vietnamese language (latin script)
   */
  VIETNAMESE: {
    code: "vi",
    flag: "name:vi",
    name: "Vietnamese (Latin script)",
    latin: true,
    isMode: false,
    geocoding: true
  },
  /**
   * Welsh language
   */
  WELSH: {
    code: "cy",
    flag: "name:cy",
    name: "Welsh",
    latin: true,
    isMode: false,
    geocoding: true
  }
};
const Language = {
  ...NonISOLanguage,
  ...ISOLanguage
};
function getLanguageInfoFromKey(languageKey, languageDictionary = Language) {
  if (languageKey in languageDictionary) {
    return languageKey[languageKey];
  }
  return null;
}
function getLanguageInfoFromCode(languageCode, languageDictionary = Language) {
  for (const lang of Object.values(languageDictionary)) {
    if (lang.code === languageCode) {
      return lang;
    }
  }
  return null;
}
function getLanguageInfoFromFlag(languageFlag, languageDictionary = Language) {
  for (const lang of Object.values(languageDictionary)) {
    if (lang.flag === languageFlag) {
      return lang;
    }
  }
  return null;
}
function getAutoLanguage() {
  if (typeof navigator === "undefined") {
    const code = Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0];
    const langInfo = getLanguageInfoFromCode(code);
    return langInfo ?? Language.ENGLISH;
  }
  const canditatelangs = Array.from(
    new Set(navigator.languages.map((l) => l.split("-")[0]))
  ).map((code) => getLanguageInfoFromCode(code)).filter((li) => li);
  return canditatelangs[0] ?? Language.ENGLISH;
}
function isLanguageInfo(obj) {
  return obj !== null && typeof obj === "object" && "code" in obj && "flag" in obj && "name" in obj && "latin" in obj && "isMode" in obj && "geocoding" in obj && (typeof obj.code === "string" || obj.code === null) && typeof obj.flag === "string" && typeof obj.name === "string" && typeof obj.latin === "boolean" && typeof obj.isMode === "boolean" && typeof obj.geocoding === "boolean";
}
function toLanguageInfo(lang, languageDictionary = Language) {
  if (isLanguageInfo(lang)) {
    return getLanguageInfoFromFlag(lang.flag, languageDictionary);
  }
  if (typeof lang !== "string") {
    return null;
  }
  return getLanguageInfoFromKey(lang, languageDictionary) || getLanguageInfoFromCode(lang, languageDictionary) || getLanguageInfoFromFlag(lang, languageDictionary) || null;
}
function areSameLanguages(langA, langB, languageDictionary = Language) {
  const langAObj = toLanguageInfo(langA, languageDictionary);
  const langBObj = toLanguageInfo(langB, languageDictionary);
  return langAObj && langBObj && langAObj.flag === langBObj.flag;
}

async function callFetch(resource, options = {}) {
  if (config.fetch === null) {
    throw new Error(
      "The fetch function was not found. If on NodeJS < 18 please specify the fetch function with config.fetch"
    );
  }
  if (new URL(resource).searchParams.get("key").trim() === "") {
    throw new Error(
      "The MapTiler Cloud API key is missing. Set it in `config.apiKey` or get one for free at https://maptiler.com"
    );
  }
  return config.fetch(resource, options);
}

const defaults = {
  maptilerApiURL: "https://api.maptiler.com/",
  mapStyle: "streets-v2"
};
Object.freeze(defaults);

class ServiceError extends Error {
  constructor(res, customMessage = "") {
    super(
      `Call to enpoint ${res.url} failed with the status code ${res.status}. ${customMessage}`
    );
    this.res = res;
  }
}

const customMessages$4 = {
  400: "Query too long / Invalid parameters",
  403: "Key is missing, invalid or restricted"
};
function addLanguageGeocodingOptions(searchParams, options) {
  const { language } = options;
  if (language === void 0) {
    return;
  }
  const languageCodes = (Array.isArray(language) ? language : [language]).map((elem) => toValidGeocodingLanguageCode(elem)).filter((elem) => elem);
  const languages = Array.from(new Set(languageCodes)).join(",");
  searchParams.set("language", languages);
}
function toValidGeocodingLanguageCode(lang) {
  const langInfo = lang === Language.AUTO.flag ? getAutoLanguage() : typeof lang === "string" ? getLanguageInfoFromCode(lang) : isLanguageInfo(lang) ? lang.flag === Language.AUTO.flag ? getAutoLanguage() : getLanguageInfoFromFlag(lang.flag) : null;
  return langInfo?.geocoding ? langInfo.code : null;
}
function addCommonForwardAndReverseGeocodingOptions(searchParams, options) {
  const { apiKey, limit, types, excludeTypes } = options;
  searchParams.set("key", apiKey ?? config.apiKey);
  if (limit !== void 0) {
    searchParams.set("limit", String(limit));
  }
  if (types !== void 0) {
    searchParams.set("types", types.join(","));
  }
  if (excludeTypes !== void 0) {
    searchParams.set("excludeTypes", String(excludeTypes));
  }
  addLanguageGeocodingOptions(searchParams, options);
}
function addForwardGeocodingOptions(searchParams, options) {
  addCommonForwardAndReverseGeocodingOptions(searchParams, options);
  const { bbox, proximity, country, fuzzyMatch, autocomplete } = options;
  if (bbox !== void 0) {
    searchParams.set("bbox", bbox.join(","));
  }
  if (proximity !== void 0) {
    searchParams.set(
      "proximity",
      proximity === "ip" ? proximity : proximity.join(",")
    );
  }
  if (country !== void 0) {
    searchParams.set("country", country.join(","));
  }
  if (fuzzyMatch !== void 0) {
    searchParams.set("fuzzyMatch", fuzzyMatch ? "true" : "false");
  }
  if (autocomplete !== void 0) {
    searchParams.set("autocomplete", autocomplete ? "true" : "false");
  }
}
async function forward(query, options = {}) {
  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error("The query must be a non-empty string");
  }
  const endpoint = new URL(
    `geocoding/${encodeURIComponent(query)}.json`,
    defaults.maptilerApiURL
  );
  addForwardGeocodingOptions(endpoint.searchParams, options);
  const res = await callFetch(endpoint.toString());
  if (!res.ok) {
    throw new ServiceError(res, customMessages$4[res.status] ?? "");
  }
  return await res.json();
}
async function reverse(position, options = {}) {
  if (!Array.isArray(position) || position.length < 2) {
    throw new Error("The position must be an array of form [lng, lat].");
  }
  const endpoint = new URL(
    `geocoding/${position[0]},${position[1]}.json`,
    defaults.maptilerApiURL
  );
  addCommonForwardAndReverseGeocodingOptions(endpoint.searchParams, options);
  const res = await callFetch(endpoint.toString());
  if (!res.ok) {
    throw new ServiceError(res, customMessages$4[res.status] ?? "");
  }
  return await res.json();
}
async function byId(id, options = {}) {
  const endpoint = new URL(`geocoding/${id}.json`, defaults.maptilerApiURL);
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  addLanguageGeocodingOptions(endpoint.searchParams, options);
  const res = await callFetch(endpoint.toString());
  if (!res.ok) {
    throw new ServiceError(res, customMessages$4[res.status] ?? "");
  }
  return await res.json();
}
async function batch$1(queries, options = {}) {
  if (!queries.length) {
    return [];
  }
  const joinedQuery = queries.map((query) => encodeURIComponent(query)).join(";");
  const endpoint = new URL(
    `geocoding/${joinedQuery}.json`,
    defaults.maptilerApiURL
  );
  addForwardGeocodingOptions(endpoint.searchParams, options);
  const res = await callFetch(endpoint.toString());
  if (!res.ok) {
    throw new ServiceError(res, customMessages$4[res.status] ?? "");
  }
  const obj = await res.json();
  return queries.length === 1 ? [obj] : obj;
}
const geocoding = {
  forward,
  reverse,
  byId,
  batch: batch$1
};

const customMessages$3 = {
  403: "Key is missing, invalid or restricted"
};
async function info(options = {}) {
  const endpoint = new URL(`geolocation/ip.json`, defaults.maptilerApiURL);
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  if ("elevation" in options) {
    endpoint.searchParams.set(
      "elevation",
      options.elevation ? "true" : "false"
    );
  }
  const urlWithParams = endpoint.toString();
  const res = await callFetch(urlWithParams);
  if (!res.ok) {
    throw new ServiceError(
      res,
      res.status in customMessages$3 ? customMessages$3[res.status] : ""
    );
  }
  const obj = await res.json();
  return obj;
}
const geolocation = {
  info
};

const customMessages$2 = {
  403: "Key is missing, invalid or restricted"
};
async function search(query, options = {}) {
  if (typeof query !== "string" || query.trim().length === 0) {
    throw new Error("The query must be a non-empty string");
  }
  const endpoint = new URL(
    `coordinates/search/${query}.json`,
    defaults.maptilerApiURL
  );
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  if ("limit" in options) {
    endpoint.searchParams.set("limit", options.limit.toString());
  }
  if ("transformations" in options) {
    endpoint.searchParams.set(
      "transformations",
      options.transformations.toString()
    );
  }
  if ("exports" in options) {
    endpoint.searchParams.set("exports", options.exports.toString());
  }
  const urlWithParams = endpoint.toString();
  const res = await callFetch(urlWithParams);
  if (!res.ok) {
    throw new ServiceError(
      res,
      res.status in customMessages$2 ? customMessages$2[res.status] : ""
    );
  }
  const obj = await res.json();
  return obj;
}
async function transform(positions, options = {}) {
  const coordinatesStr = (Array.isArray(positions[0]) ? positions : [positions]).map((coord) => `${coord[0]},${coord[1]}`).join(";");
  const endpoint = new URL(
    `coordinates/transform/${coordinatesStr}.json`,
    defaults.maptilerApiURL
  );
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  if ("sourceCrs" in options) {
    endpoint.searchParams.set("s_srs", options.sourceCrs.toString());
  }
  if ("targetCrs" in options) {
    endpoint.searchParams.set("t_srs", options.targetCrs.toString());
  }
  if ("operations" in options) {
    endpoint.searchParams.set(
      "ops",
      (Array.isArray(options.operations) ? options.operations : [options.operations]).join("|")
    );
  }
  const urlWithParams = endpoint.toString();
  const res = await callFetch(urlWithParams);
  if (!res.ok) {
    throw new ServiceError(
      res,
      res.status in customMessages$2 ? customMessages$2[res.status] : ""
    );
  }
  const obj = await res.json();
  return obj;
}
const coordinates = {
  search,
  transform
};

const customMessages$1 = {
  403: "Key is missing, invalid or restricted"
};
async function get(dataId, options = {}) {
  if (typeof dataId !== "string" || dataId.trim().length === 0) {
    throw new Error("The data ID must be a non-empty string");
  }
  const endpoint = new URL(
    `data/${encodeURIComponent(dataId)}/features.json`,
    defaults.maptilerApiURL
  );
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  const urlWithParams = endpoint.toString();
  const res = await callFetch(urlWithParams);
  if (!res.ok) {
    throw new ServiceError(
      res,
      res.status in customMessages$1 ? customMessages$1[res.status] : ""
    );
  }
  const obj = await res.json();
  return obj;
}
const data = {
  get
};

function expandMapStyle(style) {
  const maptilerDomainRegex = /^maptiler:\/\/(.*)/;
  let match;
  const trimmed = style.trim();
  let expandedStyle;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    expandedStyle = trimmed;
  } else if ((match = maptilerDomainRegex.exec(trimmed)) !== null) {
    expandedStyle = `https://api.maptiler.com/maps/${match[1]}/style.json`;
  } else {
    expandedStyle = `https://api.maptiler.com/maps/${trimmed}/style.json`;
  }
  return expandedStyle;
}
class MapStyleVariant {
  constructor(name, variantType, id, referenceStyle, description, imageURL, deprecated = false) {
    this.name = name;
    this.variantType = variantType;
    this.id = id;
    this.referenceStyle = referenceStyle;
    this.description = description;
    this.imageURL = imageURL;
    this.deprecated = deprecated;
  }
  /**
   * Get the human-friendly name
   * @returns
   */
  getName() {
    return this.name;
  }
  getFullName() {
    return `${this.referenceStyle.getName()} ${this.name}`;
  }
  /**
   * Get the variant type (eg. "DEFAULT", "DARK", "PASTEL", etc.)
   * @returns
   */
  getType() {
    return this.variantType;
  }
  /**
   * Get the MapTiler Cloud id
   * @returns
   */
  getId() {
    return this.id;
  }
  /**
   * Get the human-friendly description
   */
  getDescription() {
    return this.description;
  }
  /**
   * Get the reference style this variant belongs to
   * @returns
   */
  getReferenceStyle() {
    return this.referenceStyle;
  }
  /**
   * Check if a variant of a given type exists for _this_ variants
   * (eg. if this is a "DARK", then we can check if there is a "LIGHT" variant of it)
   * @param variantType
   * @returns
   */
  hasVariant(variantType) {
    return this.referenceStyle.hasVariant(variantType);
  }
  /**
   * Retrieve the variant of a given type. If not found, will return the "DEFAULT" variant.
   * (eg. _this_ "DARK" variant does not have any "PASTEL" variant, then the "DEFAULT" is returned)
   * @param variantType
   * @returns
   */
  getVariant(variantType) {
    const variant = this.referenceStyle.getVariant(variantType);
    this.warnIfDeprecated(variant);
    return variant;
  }
  /**
   * Get all the variants for _this_ variants, except _this_ current one
   * @returns
   */
  getVariants() {
    return this.referenceStyle.getVariants().filter((v) => v !== this).map((v) => {
      this.warnIfDeprecated(v);
      return v;
    });
  }
  /**
   * Get the image URL that represent _this_ variant
   * @returns
   */
  getImageURL() {
    return this.imageURL;
  }
  /**
   * Get the style as usable by MapLibre, a string (URL) or a plain style description (StyleSpecification)
   * @returns
   */
  getExpandedStyleURL() {
    return expandMapStyle(this.getId());
  }
  warnIfDeprecated(variant = this) {
    if (!variant.deprecated)
      return variant;
    const name = variant.getFullName();
    console.warn(
      `Style "${name}" is deprecated and will be removed in a future version.`
    );
    return variant;
  }
}
class ReferenceMapStyle {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    /**
     * Variants that belong to this reference style, key being the reference type
     */
    this.variants = {};
    /**
     * Variants that belong to this reference style, ordered by relevance
     */
    this.orderedVariants = [];
  }
  /**
   * Get the human-friendly name of this reference style
   * @returns
   */
  getName() {
    return this.name;
  }
  /**
   * Get the id of _this_ reference style
   * @returns
   */
  getId() {
    return this.id;
  }
  /**
   * Add a variant to _this_ reference style
   * @param v
   */
  addVariant(v) {
    this.variants[v.getType()] = v;
    this.orderedVariants.push(v);
  }
  /**
   * Check if a given variant type exists for this reference style
   * @param variantType
   * @returns
   */
  hasVariant(variantType) {
    return variantType in this.variants;
  }
  /**
   * Get a given variant. If the given type of variant does not exist for this reference style,
   * then the most relevant default variant is returned instead
   * @param variantType
   * @returns
   */
  getVariant(variantType) {
    return variantType in this.variants ? this.variants[variantType] : this.orderedVariants[0];
  }
  /**
   * Get the list of variants for this reference style
   * @returns
   */
  getVariants() {
    return Object.values(this.variants);
  }
  /**
   * Get the defualt variant for this reference style
   * @returns
   */
  getDefaultVariant() {
    return this.orderedVariants[0].warnIfDeprecated();
  }
}
const mapStylePresetList = [
  {
    referenceStyleID: "STREETS",
    name: "Streets",
    description: "",
    variants: [
      {
        id: "streets-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "streets-v2-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "streets-v2-light",
        name: "Light",
        variantType: "LIGHT",
        description: "",
        imageURL: ""
      },
      {
        id: "streets-v2-night",
        name: "Night",
        variantType: "NIGHT",
        description: "",
        imageURL: ""
      },
      {
        id: "streets-v2-pastel",
        name: "Pastel",
        variantType: "PASTEL",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "OUTDOOR",
    name: "Outdoor",
    description: "",
    variants: [
      {
        id: "outdoor-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "outdoor-v2-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "WINTER",
    name: "Winter",
    description: "",
    variants: [
      {
        id: "winter-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "winter-v2-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "SATELLITE",
    name: "Satellite",
    description: "",
    variants: [
      {
        id: "satellite",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "HYBRID",
    name: "Hybrid",
    description: "",
    variants: [
      {
        id: "hybrid",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "BASIC",
    name: "Basic",
    description: "",
    variants: [
      {
        id: "basic-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "basic-v2-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "basic-v2-light",
        name: "Light",
        variantType: "LIGHT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "BRIGHT",
    name: "Bright",
    description: "",
    variants: [
      {
        id: "bright-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "bright-v2-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "bright-v2-light",
        name: "Light",
        variantType: "LIGHT",
        description: "",
        imageURL: ""
      },
      {
        id: "bright-v2-pastel",
        name: "Pastel",
        variantType: "PASTEL",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "OPENSTREETMAP",
    name: "OpenStreetMap",
    description: "",
    variants: [
      {
        id: "openstreetmap",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "TOPO",
    name: "Topo",
    description: "",
    variants: [
      {
        id: "topo-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "topo-v2-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "topo-v2-shiny",
        name: "Shiny",
        deprecated: true,
        variantType: "SHINY",
        description: "",
        imageURL: ""
      },
      {
        id: "topo-v2-pastel",
        name: "Pastel",
        variantType: "PASTEL",
        description: "",
        imageURL: ""
      },
      {
        id: "topo-v2-topographique",
        name: "Topographique",
        variantType: "TOPOGRAPHIQUE",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "VOYAGER",
    name: "Voyager",
    description: "",
    variants: [
      {
        id: "voyager-v2",
        name: "Default",
        deprecated: true,
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "voyager-v2-darkmatter",
        name: "Darkmatter",
        deprecated: true,
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "voyager-v2-positron",
        name: "Positron",
        deprecated: true,
        variantType: "LIGHT",
        description: "",
        imageURL: ""
      },
      {
        id: "voyager-v2-vintage",
        name: "Vintage",
        deprecated: true,
        variantType: "VINTAGE",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "TONER",
    name: "Toner",
    description: "",
    variants: [
      {
        id: "toner-v2",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "toner-v2-background",
        name: "Background",
        variantType: "BACKGROUND",
        deprecated: true,
        description: "",
        imageURL: ""
      },
      {
        id: "toner-v2-lite",
        name: "Lite",
        variantType: "LITE",
        description: "",
        imageURL: ""
      },
      {
        id: "toner-v2-lines",
        name: "Lines",
        variantType: "LINES",
        deprecated: true,
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "DATAVIZ",
    name: "Dataviz",
    description: "",
    variants: [
      {
        id: "dataviz",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "dataviz-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "dataviz-light",
        name: "Light",
        variantType: "LIGHT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "BACKDROP",
    name: "Backdrop",
    description: "",
    variants: [
      {
        id: "backdrop",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "backdrop-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "backdrop-light",
        name: "Light",
        variantType: "LIGHT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "OCEAN",
    name: "Ocean",
    description: "",
    variants: [
      {
        id: "ocean",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "AQUARELLE",
    name: "Aquarelle",
    description: "Watercolor map for creative use",
    variants: [
      {
        id: "aquarelle",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "aquarelle-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "aquarelle-vivid",
        name: "Vivid",
        variantType: "VIVID",
        description: "",
        imageURL: ""
      }
    ]
  },
  {
    referenceStyleID: "LANDSCAPE",
    name: "Landscape",
    description: "Terrain map for data overlays and visualisations",
    variants: [
      {
        id: "landscape",
        name: "Default",
        variantType: "DEFAULT",
        description: "",
        imageURL: ""
      },
      {
        id: "landscape-dark",
        name: "Dark",
        variantType: "DARK",
        description: "",
        imageURL: ""
      },
      {
        id: "landscape-vivid",
        name: "Vivid",
        variantType: "VIVID",
        description: "",
        imageURL: ""
      }
    ]
  }
];
function makeReferenceStyleProxy(referenceStyle) {
  return new Proxy(referenceStyle, {
    get(target, prop, receiver) {
      if (target.hasVariant(prop)) {
        return target.getVariant(prop);
      }
      if (prop.toString().toUpperCase() === prop) {
        return referenceStyle.getDefaultVariant();
      }
      const style = Reflect.get(target, prop, receiver);
      return style;
    }
  });
}
function buildMapStyles() {
  const mapStyle = {};
  for (let i = 0; i < mapStylePresetList.length; i += 1) {
    const refStyleInfo = mapStylePresetList[i];
    const refStyle = makeReferenceStyleProxy(
      new ReferenceMapStyle(refStyleInfo.name, refStyleInfo.referenceStyleID)
    );
    for (let j = 0; j < refStyleInfo.variants.length; j += 1) {
      const variantInfo = refStyleInfo.variants[j];
      const variant = new MapStyleVariant(
        variantInfo.name,
        // name
        variantInfo.variantType,
        // variantType
        variantInfo.id,
        // id
        refStyle,
        // referenceStyle
        variantInfo.description,
        variantInfo.imageURL,
        // imageURL
        variantInfo.deprecated
        // deprecated
      );
      refStyle.addVariant(variant);
    }
    mapStyle[refStyleInfo.referenceStyleID] = refStyle;
  }
  return mapStyle;
}
function styleToStyle(style) {
  if (!style) {
    return MapStyle[mapStylePresetList[0].referenceStyleID].getDefaultVariant().getId();
  }
  if (typeof style === "string" || style instanceof String) {
    return style.trim().toLowerCase();
  }
  if (style instanceof MapStyleVariant) {
    return style.getId();
  }
  if (style instanceof ReferenceMapStyle) {
    return style.getDefaultVariant().getId();
  }
}
const MapStyle = buildMapStyles();

function extractLineStrings(geoJson) {
  const lineStrings = [];
  function extractFromGeometry(geometry) {
    if (geometry.type === "LineString" || geometry.type === "MultiLineString") {
      lineStrings.push(geometry);
    }
  }
  function extractFromFeature(feature) {
    if (feature.geometry) {
      extractFromGeometry(feature.geometry);
    }
  }
  function extractFromFeatureCollection(collection) {
    for (const feature of collection.features) {
      if (feature.type === "Feature") {
        extractFromFeature(feature);
      } else if (feature.type === "FeatureCollection") {
        extractFromFeatureCollection(feature);
      }
    }
  }
  if (geoJson.type === "Feature") {
    extractFromFeature(geoJson);
  } else if (geoJson.type === "FeatureCollection") {
    extractFromFeatureCollection(geoJson);
  } else {
    extractFromGeometry(geoJson);
  }
  return lineStrings;
}
function getSqSegDist(p, p1, p2) {
  let x = p1[0], y = p1[1], dx = p2[0] - x, dy = p2[1] - y;
  if (dx !== 0 || dy !== 0) {
    const t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);
    if (t > 1) {
      x = p2[0];
      y = p2[1];
    } else if (t > 0) {
      x += dx * t;
      y += dy * t;
    }
  }
  dx = p[0] - x;
  dy = p[1] - y;
  return dx * dx + dy * dy;
}
function simplifyDPStep(points, first, last, sqTolerance, simplified) {
  let maxSqDist = sqTolerance, index;
  for (let i = first + 1; i < last; i++) {
    const sqDist = getSqSegDist(points[i], points[first], points[last]);
    if (sqDist > maxSqDist) {
      index = i;
      maxSqDist = sqDist;
    }
  }
  if (maxSqDist > sqTolerance) {
    if (index - first > 1) {
      simplifyDPStep(points, first, index, sqTolerance, simplified);
    }
    simplified.push(points[index]);
    if (last - index > 1) {
      simplifyDPStep(points, index, last, sqTolerance, simplified);
    }
  }
}
function simplifyDouglasPeucker(points, sqTolerance) {
  const last = points.length - 1;
  const simplified = [points[0]];
  simplifyDPStep(points, 0, last, sqTolerance, simplified);
  simplified.push(points[last]);
  return simplified;
}
function simplify(points, tolerance) {
  if (points.length <= 2) {
    return points;
  }
  const sqTolerance = tolerance !== void 0 ? tolerance * tolerance : 1;
  const simplePoints = simplifyDouglasPeucker(points, sqTolerance);
  return simplePoints;
}
const misc = {
  extractLineStrings,
  simplify
};

function staticMapMarkerToString(marker, includeColor = true) {
  let str = `${marker[0]},${marker[1]}`;
  if (marker.length === 3 && includeColor) {
    str += `,${marker[2]}`;
  }
  return str;
}
function simplifyAndStringify(path, maxNbChar = 3e3) {
  let str = path.map((point) => point.join(",")).join("|");
  let tolerance = 5e-6;
  const toleranceStep = 1e-5;
  while (str.length > maxNbChar) {
    const simplerPath = misc.simplify(path, tolerance);
    str = simplerPath.map((point) => `${point[0]},${point[1]}`).join("|");
    tolerance += toleranceStep;
  }
  return str;
}
function centered(center, zoom, options = {}) {
  const style = styleToStyle(options.style);
  const scale = options.hiDPI ? "@2x" : "";
  const format = options.format ?? "png";
  let width = ~~(options.width ?? 1024);
  let height = ~~(options.height ?? 1024);
  if (options.hiDPI) {
    width = ~~(width / 2);
    height = ~~(height / 2);
  }
  const endpoint = new URL(
    `maps/${encodeURIComponent(style)}/static/${center[0]},${center[1]},${zoom}/${width}x${height}${scale}.${format}`,
    defaults.maptilerApiURL
  );
  if ("attribution" in options) {
    endpoint.searchParams.set("attribution", options.attribution.toString());
  }
  if ("markers" in options) {
    let markerStr = "";
    const hasIcon = "markerIcon" in options;
    if (hasIcon) {
      markerStr += `icon:${options.markerIcon}|`;
    }
    if (hasIcon && "markerAnchor" in options) {
      markerStr += `anchor:${options.markerAnchor}|`;
    }
    if (hasIcon && options.hiDPI) {
      markerStr += `scale:2|`;
    }
    const markerList = Array.isArray(options.markers[0]) ? options.markers : [options.markers];
    markerStr += markerList.map((m) => staticMapMarkerToString(m, !hasIcon)).join("|");
    endpoint.searchParams.set("markers", markerStr);
  }
  if ("path" in options) {
    let pathStr = "";
    pathStr += `fill:${options.pathFillColor ?? "none"}|`;
    if ("pathStrokeColor" in options) {
      pathStr += `stroke:${options.pathStrokeColor}|`;
    }
    if ("pathWidth" in options) {
      const pathWidth = options.pathWidth / (options.hiDPI ? 2 : 1);
      pathStr += `width:${pathWidth.toString()}|`;
    }
    pathStr += simplifyAndStringify(options.path);
    endpoint.searchParams.set("path", pathStr);
  }
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  return endpoint.toString();
}
function bounded(boundingBox, options = {}) {
  const style = styleToStyle(options.style);
  const scale = options.hiDPI ? "@2x" : "";
  const format = options.format ?? "png";
  let width = ~~(options.width ?? 1024);
  let height = ~~(options.height ?? 1024);
  if (options.hiDPI) {
    width = ~~(width / 2);
    height = ~~(height / 2);
  }
  const endpoint = new URL(
    `maps/${encodeURIComponent(style)}/static/${boundingBox[0]},${boundingBox[1]},${boundingBox[2]},${boundingBox[3]}/${width}x${height}${scale}.${format}`,
    defaults.maptilerApiURL
  );
  if ("attribution" in options) {
    endpoint.searchParams.set("attribution", options.attribution.toString());
  }
  if ("padding" in options) {
    endpoint.searchParams.set("padding", options.padding.toString());
  }
  if ("markers" in options) {
    let markerStr = "";
    const hasIcon = "markerIcon" in options;
    if (hasIcon) {
      markerStr += `icon:${options.markerIcon}|`;
    }
    if (hasIcon && "markerAnchor" in options) {
      markerStr += `anchor:${options.markerAnchor}|`;
    }
    if (hasIcon && options.hiDPI) {
      markerStr += `scale:2|`;
    }
    const markerList = Array.isArray(options.markers[0]) ? options.markers : [options.markers];
    markerStr += markerList.map((m) => staticMapMarkerToString(m, !hasIcon)).join("|");
    endpoint.searchParams.set("markers", markerStr);
  }
  if ("path" in options) {
    let pathStr = "";
    pathStr += `fill:${options.pathFillColor ?? "none"}|`;
    if ("pathStrokeColor" in options) {
      pathStr += `stroke:${options.pathStrokeColor}|`;
    }
    if ("pathWidth" in options) {
      const pathWidth = options.pathWidth / (options.hiDPI ? 2 : 1);
      pathStr += `width:${pathWidth.toString()}|`;
    }
    pathStr += simplifyAndStringify(options.path);
    endpoint.searchParams.set("path", pathStr);
  }
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  return endpoint.toString();
}
function automatic(options = {}) {
  if (!("markers" in options) && !("path" in options)) {
    throw new Error(
      "Automatic static maps require markers and/or path to be created."
    );
  }
  const style = styleToStyle(options.style);
  const scale = options.hiDPI ? "@2x" : "";
  const format = options.format ?? "png";
  let width = ~~(options.width ?? 1024);
  let height = ~~(options.height ?? 1024);
  if (options.hiDPI) {
    width = ~~(width / 2);
    height = ~~(height / 2);
  }
  const endpoint = new URL(
    `maps/${encodeURIComponent(
      style
    )}/static/auto/${width}x${height}${scale}.${format}`,
    defaults.maptilerApiURL
  );
  if ("attribution" in options) {
    endpoint.searchParams.set("attribution", options.attribution.toString());
  }
  if ("padding" in options) {
    endpoint.searchParams.set("padding", options.padding.toString());
  }
  if ("markers" in options) {
    let markerStr = "";
    const hasIcon = "markerIcon" in options;
    if (hasIcon) {
      markerStr += `icon:${options.markerIcon}|`;
    }
    if (hasIcon && "markerAnchor" in options) {
      markerStr += `anchor:${options.markerAnchor}|`;
    }
    if (hasIcon && options.hiDPI) {
      markerStr += `scale:2|`;
    }
    const markerList = Array.isArray(options.markers[0]) ? options.markers : [options.markers];
    markerStr += markerList.map((m) => staticMapMarkerToString(m, !hasIcon)).join("|");
    endpoint.searchParams.set("markers", markerStr);
  }
  if ("path" in options) {
    let pathStr = "";
    pathStr += `fill:${options.pathFillColor ?? "none"}|`;
    if ("pathStrokeColor" in options) {
      pathStr += `stroke:${options.pathStrokeColor}|`;
    }
    if ("pathWidth" in options) {
      const pathWidth = options.pathWidth / (options.hiDPI ? 2 : 1);
      pathStr += `width:${pathWidth.toString()}|`;
    }
    pathStr += simplifyAndStringify(options.path);
    endpoint.searchParams.set("path", pathStr);
  }
  endpoint.searchParams.set("key", options.apiKey ?? config.apiKey);
  return endpoint.toString();
}
const staticMaps = {
  centered,
  bounded,
  automatic
};

const EARTH_RADIUS = 63710088e-1;
const EARTH_CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS;
function longitudeToMercatorX(lng) {
  return (180 + lng) / 360;
}
function latitudeToMercatorY(lat) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360))) / 360;
}
function wgs84ToMercator(position) {
  const wrappedPos = wrapWgs84(position);
  return [
    longitudeToMercatorX(wrappedPos[0]),
    latitudeToMercatorY(wrappedPos[1])
  ];
}
function mercatorXToLongitude(x) {
  return x * 360 - 180;
}
function mercatorYToLatitude(y) {
  const y2 = 180 - y * 360;
  return 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
}
function mercatorToWgs84(position) {
  return [mercatorXToLongitude(position[0]), mercatorYToLatitude(position[1])];
}
function haversineDistanceWgs84(from, to) {
  const rad = Math.PI / 180;
  const lat1 = from[1] * rad;
  const lat2 = to[1] * rad;
  const a = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos((to[0] - from[0]) * rad);
  const maxMeters = EARTH_RADIUS * Math.acos(Math.min(a, 1));
  return maxMeters;
}
function haversineCumulatedDistanceWgs84(positions) {
  const cumulatedDistance = Array(positions.length);
  cumulatedDistance[0] = 0;
  const l = cumulatedDistance.length;
  for (let i = 1; i < l; i++) {
    cumulatedDistance[i] = haversineDistanceWgs84(positions[i - 1], positions[i]) + cumulatedDistance[i - 1];
  }
  return cumulatedDistance;
}
function wrapWgs84(position) {
  const lng = position[0];
  const lat = position[1];
  const d = 360;
  const w = ((lng + 180) % d + d) % d - 180;
  const wrapLong = w === -180 ? 180 : w;
  return [wrapLong, lat];
}
function circumferenceAtLatitude(latitude) {
  return EARTH_CIRCUMFERENCE * Math.cos(latitude * Math.PI / 180);
}
function mercatorToTileIndex(position, zoom, strict = true) {
  const numberOfTilePerAxis = 2 ** zoom;
  const fIndex = [
    position[0] * numberOfTilePerAxis,
    position[1] * numberOfTilePerAxis
  ];
  return strict ? [~~fIndex[0], ~~fIndex[1]] : fIndex;
}
function wgs84ToTileIndex(position, zoom, strict = true) {
  const merc = wgs84ToMercator(position);
  return mercatorToTileIndex(merc, zoom, strict);
}
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
function toDegrees(radians) {
  return radians * 180 / Math.PI;
}
function haversineIntermediateWgs84(pos1, pos2, ratio) {
  const d = haversineDistanceWgs84(pos1, pos2);
  const \u03BB1 = toRadians(pos1[0]);
  const \u03C61 = toRadians(pos1[1]);
  const \u03BB2 = toRadians(pos2[0]);
  const \u03C62 = toRadians(pos2[1]);
  const \u03B4 = d / EARTH_RADIUS;
  const a = Math.sin((1 - ratio) * \u03B4) / Math.sin(\u03B4);
  const b = Math.sin(ratio * \u03B4) / Math.sin(\u03B4);
  const x = a * Math.cos(\u03C61) * Math.cos(\u03BB1) + b * Math.cos(\u03C62) * Math.cos(\u03BB2);
  const y = a * Math.cos(\u03C61) * Math.sin(\u03BB1) + b * Math.cos(\u03C62) * Math.sin(\u03BB2);
  const z = a * Math.sin(\u03C61) + b * Math.sin(\u03C62);
  const \u03C63 = Math.atan2(z, Math.sqrt(x * x + y * y));
  const \u03BB3 = Math.atan2(y, x);
  return [toDegrees(\u03BB3), toDegrees(\u03C63)];
}
const math = {
  EARTH_RADIUS,
  EARTH_CIRCUMFERENCE,
  longitudeToMercatorX,
  latitudeToMercatorY,
  wgs84ToMercator,
  mercatorXToLongitude,
  mercatorYToLatitude,
  mercatorToWgs84,
  haversineDistanceWgs84,
  wrapWgs84,
  circumferenceAtLatitude,
  mercatorToTileIndex,
  wgs84ToTileIndex,
  toRadians,
  toDegrees,
  haversineIntermediateWgs84,
  haversineCumulatedDistanceWgs84
};

class QuickLRU extends Map {
	#size = 0;
	#cache = new Map();
	#oldCache = new Map();
	#maxSize;
	#maxAge;
	#onEviction;

	constructor(options = {}) {
		super();

		if (!(options.maxSize && options.maxSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		if (typeof options.maxAge === 'number' && options.maxAge === 0) {
			throw new TypeError('`maxAge` must be a number greater than 0');
		}

		this.#maxSize = options.maxSize;
		this.#maxAge = options.maxAge || Number.POSITIVE_INFINITY;
		this.#onEviction = options.onEviction;
	}

	// For tests.
	get __oldCache() {
		return this.#oldCache;
	}

	#emitEvictions(cache) {
		if (typeof this.#onEviction !== 'function') {
			return;
		}

		for (const [key, item] of cache) {
			this.#onEviction(key, item.value);
		}
	}

	#deleteIfExpired(key, item) {
		if (typeof item.expiry === 'number' && item.expiry <= Date.now()) {
			if (typeof this.#onEviction === 'function') {
				this.#onEviction(key, item.value);
			}

			return this.delete(key);
		}

		return false;
	}

	#getOrDeleteIfExpired(key, item) {
		const deleted = this.#deleteIfExpired(key, item);
		if (deleted === false) {
			return item.value;
		}
	}

	#getItemValue(key, item) {
		return item.expiry ? this.#getOrDeleteIfExpired(key, item) : item.value;
	}

	#peek(key, cache) {
		const item = cache.get(key);

		return this.#getItemValue(key, item);
	}

	#set(key, value) {
		this.#cache.set(key, value);
		this.#size++;

		if (this.#size >= this.#maxSize) {
			this.#size = 0;
			this.#emitEvictions(this.#oldCache);
			this.#oldCache = this.#cache;
			this.#cache = new Map();
		}
	}

	#moveToRecent(key, item) {
		this.#oldCache.delete(key);
		this.#set(key, item);
	}

	* #entriesAscending() {
		for (const item of this.#oldCache) {
			const [key, value] = item;
			if (!this.#cache.has(key)) {
				const deleted = this.#deleteIfExpired(key, value);
				if (deleted === false) {
					yield item;
				}
			}
		}

		for (const item of this.#cache) {
			const [key, value] = item;
			const deleted = this.#deleteIfExpired(key, value);
			if (deleted === false) {
				yield item;
			}
		}
	}

	get(key) {
		if (this.#cache.has(key)) {
			const item = this.#cache.get(key);
			return this.#getItemValue(key, item);
		}

		if (this.#oldCache.has(key)) {
			const item = this.#oldCache.get(key);
			if (this.#deleteIfExpired(key, item) === false) {
				this.#moveToRecent(key, item);
				return item.value;
			}
		}
	}

	set(key, value, {maxAge = this.#maxAge} = {}) {
		const expiry = typeof maxAge === 'number' && maxAge !== Number.POSITIVE_INFINITY
			? (Date.now() + maxAge)
			: undefined;

		if (this.#cache.has(key)) {
			this.#cache.set(key, {
				value,
				expiry,
			});
		} else {
			this.#set(key, {value, expiry});
		}

		return this;
	}

	has(key) {
		if (this.#cache.has(key)) {
			return !this.#deleteIfExpired(key, this.#cache.get(key));
		}

		if (this.#oldCache.has(key)) {
			return !this.#deleteIfExpired(key, this.#oldCache.get(key));
		}

		return false;
	}

	peek(key) {
		if (this.#cache.has(key)) {
			return this.#peek(key, this.#cache);
		}

		if (this.#oldCache.has(key)) {
			return this.#peek(key, this.#oldCache);
		}
	}

	delete(key) {
		const deleted = this.#cache.delete(key);
		if (deleted) {
			this.#size--;
		}

		return this.#oldCache.delete(key) || deleted;
	}

	clear() {
		this.#cache.clear();
		this.#oldCache.clear();
		this.#size = 0;
	}

	resize(newSize) {
		if (!(newSize && newSize > 0)) {
			throw new TypeError('`maxSize` must be a number greater than 0');
		}

		const items = [...this.#entriesAscending()];
		const removeCount = items.length - newSize;
		if (removeCount < 0) {
			this.#cache = new Map(items);
			this.#oldCache = new Map();
			this.#size = items.length;
		} else {
			if (removeCount > 0) {
				this.#emitEvictions(items.slice(0, removeCount));
			}

			this.#oldCache = new Map(items.slice(removeCount));
			this.#cache = new Map();
			this.#size = 0;
		}

		this.#maxSize = newSize;
	}

	* keys() {
		for (const [key] of this) {
			yield key;
		}
	}

	* values() {
		for (const [, value] of this) {
			yield value;
		}
	}

	* [Symbol.iterator]() {
		for (const item of this.#cache) {
			const [key, value] = item;
			const deleted = this.#deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}

		for (const item of this.#oldCache) {
			const [key, value] = item;
			if (!this.#cache.has(key)) {
				const deleted = this.#deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}

	* entriesDescending() {
		let items = [...this.#cache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			const deleted = this.#deleteIfExpired(key, value);
			if (deleted === false) {
				yield [key, value.value];
			}
		}

		items = [...this.#oldCache];
		for (let i = items.length - 1; i >= 0; --i) {
			const item = items[i];
			const [key, value] = item;
			if (!this.#cache.has(key)) {
				const deleted = this.#deleteIfExpired(key, value);
				if (deleted === false) {
					yield [key, value.value];
				}
			}
		}
	}

	* entriesAscending() {
		for (const [key, value] of this.#entriesAscending()) {
			yield [key, value.value];
		}
	}

	get size() {
		if (!this.#size) {
			return this.#oldCache.size;
		}

		let oldCacheSize = 0;
		for (const key of this.#oldCache.keys()) {
			if (!this.#cache.has(key)) {
				oldCacheSize++;
			}
		}

		return Math.min(this.#size + oldCacheSize, this.#maxSize);
	}

	get maxSize() {
		return this.#maxSize;
	}

	entries() {
		return this.entriesAscending();
	}

	forEach(callbackFunction, thisArgument = this) {
		for (const [key, value] of this.entriesAscending()) {
			callbackFunction.call(thisArgument, value, key, this);
		}
	}

	get [Symbol.toStringTag]() {
		return JSON.stringify([...this.entriesAscending()]);
	}
}

let tileCache = null;
function getTileCache() {
  if (!tileCache) {
    tileCache = new QuickLRU({ maxSize: config.tileCacheSize });
  }
  return tileCache;
}
async function bufferToPixelDataBrowser(buff) {
  const blob = new Blob([buff]);
  const imageBitmap = await createImageBitmap(blob);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  ctx.drawImage(imageBitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return {
    pixels: imageData.data,
    width: canvas.width,
    height: canvas.height,
    components: imageData.data.length / (canvas.width * canvas.height)
  };
}
function getBufferToPixelDataParser() {
  if (config.bufferToPixelData) {
    return config.bufferToPixelData;
  }
  if (typeof window !== "undefined") {
    return bufferToPixelDataBrowser;
  }
  throw new Error(
    "An image file buffer to pixel data parser is necessary. Specify it in `config.bufferToPixelData`"
  );
}
function canParsePixelData() {
  return !!config.bufferToPixelData || typeof window !== "undefined";
}

const TERRAIN_TILESET = "terrain-rgb-v2";
const API_BATCH_SIZE = 50;
const API_WARN_SIZE = 1e3;
let terrainTileJson = null;
const customMessages = {
  403: "Key is missing, invalid or restricted"
};
async function computeOnServer(positions, apiKey) {
  if (positions.length > API_WARN_SIZE) {
    console.warn(
      "Computing elevation for complex geometries is discouraged - simplify the geometry before proceeding"
    );
  }
  const parts = Math.ceil(positions.length / API_BATCH_SIZE);
  const respPromises = Array.from({ length: parts }, () => null).map(
    (_, part) => {
      const startPos = part * API_BATCH_SIZE;
      const batch2 = positions.slice(startPos, startPos + API_BATCH_SIZE);
      const batchEncoded = batch2.map((pos) => pos.join(",")).join(";");
      const endpoint = new URL(
        `elevation/${batchEncoded}.json`,
        defaults.maptilerApiURL
      );
      endpoint.searchParams.set("key", apiKey);
      return callFetch(endpoint.toString());
    }
  );
  const resps = await Promise.allSettled(respPromises);
  const jsons = await Promise.all(
    resps.map(async (resp) => {
      if (resp.status === "rejected") {
        throw new Error(
          `Some segments could not be fetched, error: ${resp.reason}`
        );
      }
      if (!resp.value.ok) {
        throw new Error(
          `Some segments could not be fetched, response: ${resp.value.status} ${await resp.value.text()}, url: ${resp.value.url}`
        );
      }
      return resp.value.json();
    })
  );
  return jsons.flat();
}
async function computeOnClient(positions, apiKey, zoom) {
  if (!terrainTileJson) {
    const endpoint = new URL(
      `tiles/${TERRAIN_TILESET}/tiles.json`,
      defaults.maptilerApiURL
    );
    endpoint.searchParams.set("key", apiKey);
    const urlWithParams = endpoint.toString();
    const res = await callFetch(urlWithParams);
    if (res.ok) {
      terrainTileJson = await res.json();
    } else {
      throw new ServiceError(res, customMessages[res.status] ?? "");
    }
  }
  const tileParser = getBufferToPixelDataParser();
  const tileURLSchema = terrainTileJson.tiles[0];
  const cache = getTileCache();
  const maxZoom = terrainTileJson.maxzoom;
  let usedZoom = ~~(zoom ?? maxZoom);
  if (usedZoom > maxZoom || usedZoom < 0) {
    usedZoom = maxZoom;
  }
  const tileIndicesFloats = positions.map(
    (position) => math.wgs84ToTileIndex(position, usedZoom, false)
  );
  const tileIndicesInteger = tileIndicesFloats.map((index) => [
    ~~index[0],
    ~~index[1]
  ]);
  const tileIDs = tileIndicesInteger.map(
    (index) => `terrain_${usedZoom.toString()}_${index[0].toString()}_${index[1].toString()}`
  );
  const uniqueTilesToFetch = Array.from(
    new Set(tileIDs.filter((tileID) => !cache.has(tileID)))
  ).map((tileID) => tileID.split("_").slice(1));
  const tileURLs = uniqueTilesToFetch.map(
    (zxy) => tileURLSchema.replace("{x}", zxy[1].toString()).replace("{y}", zxy[2].toString()).replace("{z}", zxy[0].toString())
  );
  const promisesFetchTiles = tileURLs.map((url) => callFetch(url));
  const resTiles = await Promise.allSettled(promisesFetchTiles);
  const fulfilledRes = resTiles.map(
    (el) => el.status === "fulfilled" ? el.value : null
  ).filter((res) => res);
  const fulfilledRButNotOkRes = fulfilledRes.filter((res) => !res.ok);
  if (fulfilledRes.length !== promisesFetchTiles.length) {
    throw new Error("Some tiles could not be fetched.");
  }
  if (fulfilledRButNotOkRes.length) {
    throw new ServiceError(
      fulfilledRButNotOkRes[0],
      customMessages[fulfilledRButNotOkRes[0].status] ?? ""
    );
  }
  const tileArrayBuffers = await Promise.all(
    fulfilledRes.map((res) => res.arrayBuffer())
  );
  if (!tileArrayBuffers.every((buff) => buff.byteLength > 0)) {
    throw new Error("Some tiles are not available.");
  }
  const tilePixelDatas = await Promise.all(
    tileArrayBuffers.map((buff) => tileParser(buff))
  );
  tilePixelDatas.forEach((tilePixelData, i) => {
    const zxy = uniqueTilesToFetch[i];
    const tileID = `terrain_${zxy[0].toString()}_${zxy[1].toString()}_${zxy[2].toString()}`;
    cache.set(tileID, tilePixelData);
  });
  const elevatedPositions = positions.map((position, i) => {
    const tileID = tileIDs[i];
    const tileIndexFloat = tileIndicesFloats[i];
    const tilePixelData = cache.get(tileID);
    const pixelX = Math.min(
      Math.round(tilePixelData.width * (tileIndexFloat[0] % 1)),
      tilePixelData.width - 1
    );
    const pixelY = Math.min(
      Math.round(tilePixelData.height * (tileIndexFloat[1] % 1)),
      tilePixelData.height - 1
    );
    const pixelDataIndex = (pixelY * tilePixelData.width + pixelX) * tilePixelData.components;
    const R = tilePixelData.pixels[pixelDataIndex];
    const G = tilePixelData.pixels[pixelDataIndex + 1];
    const B = tilePixelData.pixels[pixelDataIndex + 2];
    const elevation2 = -1e4 + (R * 256 * 256 + G * 256 + B) * 0.1;
    return [position[0], position[1], ~~(elevation2 * 1e3) / 1e3];
  });
  return elevatedPositions;
}
async function at(position, options = {}) {
  const elevatedPositions = await batch([position], options);
  return elevatedPositions[0];
}
async function batch(positions, options = {}) {
  if (positions.length === 0)
    return [];
  const apiKey = options.apiKey ?? config.apiKey;
  const elevatedPositions = options.computeOn === "client" ? await computeOnClient(positions, apiKey, options.zoom) : await computeOnServer(positions, apiKey);
  if (options.smoothingKernelSize) {
    const kernelSize = ~~(options.smoothingKernelSize / 2) * 2 + 1;
    const elevations = elevatedPositions.map((pos) => pos[2]);
    const kernelSpan = ~~(kernelSize / 2);
    for (let i = kernelSpan; i < elevations.length - kernelSpan - 1; i += 1) {
      let sum = 0;
      for (let j = 0; j < kernelSize; j += 1) {
        const elev = elevations[i - kernelSpan + j];
        sum += elev;
      }
      sum /= kernelSize;
      elevatedPositions[i][2] = sum;
    }
  }
  return elevatedPositions;
}
async function fromLineString(ls, options = {}) {
  if (ls.type !== "LineString") {
    throw new Error("The provided object is not a GeoJSON LineString");
  }
  options.computeOn ?? (options.computeOn = canParsePixelData() ? "client" : "server");
  const clone = structuredClone(ls);
  const elevatedPositions = await batch(clone.coordinates, options);
  clone.coordinates = elevatedPositions;
  return clone;
}
async function fromMultiLineString(ls, options = {}) {
  if (ls.type !== "MultiLineString") {
    throw new Error("The provided object is not a GeoJSON MultiLineString");
  }
  options.computeOn ?? (options.computeOn = canParsePixelData() ? "client" : "server");
  const clone = structuredClone(ls);
  const multiLengths = clone.coordinates.map((poss) => poss.length);
  const flattenPositions = clone.coordinates.flat();
  const flattenPositionsElevated = await batch(flattenPositions, options);
  const result = [];
  let index = 0;
  for (const length of multiLengths) {
    result.push(flattenPositionsElevated.slice(index, index + length));
    index += length;
  }
  clone.coordinates = result;
  return clone;
}
const elevation = {
  at,
  batch,
  fromLineString,
  fromMultiLineString
};

exports.ClientConfig = ClientConfig;
exports.ISOLanguage = ISOLanguage;
exports.Language = Language;
exports.MapStyle = MapStyle;
exports.MapStyleVariant = MapStyleVariant;
exports.NonISOLanguage = NonISOLanguage;
exports.ReferenceMapStyle = ReferenceMapStyle;
exports.ServiceError = ServiceError;
exports.areSameLanguages = areSameLanguages;
exports.bufferToPixelDataBrowser = bufferToPixelDataBrowser;
exports.canParsePixelData = canParsePixelData;
exports.circumferenceAtLatitude = circumferenceAtLatitude;
exports.config = config;
exports.coordinates = coordinates;
exports.data = data;
exports.elevation = elevation;
exports.expandMapStyle = expandMapStyle;
exports.geocoding = geocoding;
exports.geolocation = geolocation;
exports.getAutoLanguage = getAutoLanguage;
exports.getBufferToPixelDataParser = getBufferToPixelDataParser;
exports.getLanguageInfoFromCode = getLanguageInfoFromCode;
exports.getLanguageInfoFromFlag = getLanguageInfoFromFlag;
exports.getLanguageInfoFromKey = getLanguageInfoFromKey;
exports.getTileCache = getTileCache;
exports.isLanguageInfo = isLanguageInfo;
exports.mapStylePresetList = mapStylePresetList;
exports.math = math;
exports.misc = misc;
exports.staticMaps = staticMaps;
exports.styleToStyle = styleToStyle;
exports.toLanguageInfo = toLanguageInfo;
//# sourceMappingURL=maptiler-client.cjs.map

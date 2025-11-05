import { BBox, Position, Feature, Geometry, FeatureCollection, LineString, MultiLineString, GeoJsonObject } from 'geojson';
export { BBox, LineString, MultiLineString, Position } from 'geojson';
import QuickLRU from 'quick-lru';

/**
 * Informations about an image
 */
type PixelData = {
    /**
     * The array of pixels as RGBRGB or RGBARGBA in a row-major order
     */
    pixels: Uint8ClampedArray | Uint8Array;
    /**
     * Width of the image in number of pixels
     */
    width: number;
    /**
     * Height of the image in number of pixels
     */
    height: number;
    /**
     * Number of components per pixel (3 if image is RGB, 4 if image is RGBA)
     */
    components: number;
};
/**
 * Type for the function that decodes an image file ArrayBuffer into valid pixel data
 */
type BufferToPixelDataFunction = (ArrayBuffer: any) => Promise<PixelData>;
/**
 * Main properties necessary from a TileJSON
 */
type TileJSON = {
    scale: string;
    format: string;
    maxzoom: number;
    minzoom: number;
    profile: string;
    description: string;
    attribution: string;
    bounds: [number, number, number, number];
    center: [number, number, number];
    /**
     * TileJSON version
     */
    tilejson: string;
    name: string;
    crs: string;
    crs_wkt: string;
    extent: [number, number, number, number];
    tiles: string[];
};
/**
 * Singleton-like function to access the tile cache
 */
declare function getTileCache(): QuickLRU<string, PixelData>;
/**
 * Browser function to decode an image file buffer into valid pixel data
 */
declare function bufferToPixelDataBrowser(buff: ArrayBuffer): Promise<PixelData>;
declare function getBufferToPixelDataParser(): BufferToPixelDataFunction;
declare function canParsePixelData(): boolean;

type FetchFunction = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
/**
 * The configuration object definition
 */
declare class ClientConfig {
    /**
     * MapTiler Cloud API key
     */
    private _apiKey;
    /**
     * The fetch function. To be set if in Node < 18, otherwise
     * will be automatically resolved.
     */
    private _fetch;
    /**
     * Number of tiles to keep in cache
     */
    tileCacheSize: number;
    bufferToPixelData?: BufferToPixelDataFunction | null;
    /**
     * Set the MapTiler Cloud API key
     */
    set apiKey(k: string);
    /**
     * Get the MapTiler Cloud API key
     */
    get apiKey(): string;
    /**
     * Set a the custom fetch function to replace the default one
     */
    set fetch(f: FetchFunction);
    /**
     * Get the fetch fucntion
     */
    get fetch(): FetchFunction | null;
}
/**
 * Configuration object
 */
declare const config: ClientConfig;

type LanguageInfo = {
    /**
     * Two-letter ISO code, such as `"en"` for English language.
     * Can be `null` if the language is a flag to be evaluated at runtime,
     * as it is the case for some "modes".
     */
    code: string | null;
    /**
     * The full OSM language flag, such as `"name:en"` for the English language.
     * Can also be a non-OSM flag if the language needs to be evaluated at runtime, such as `"auto"`,
     * as it is the case for some "modes".
     */
    flag: string;
    /**
     * English name of the language.
     */
    name: string;
    /**
     * Whether the language leverages only the latin charsets.
     */
    latin: boolean;
    /**
     * Some language descriptions corresponds to "modes" rather than to actual languages.
     * For instance the "visitor" mode consists in displaying bilingual labels.
     */
    isMode: boolean;
    /**
     * Whether the language is compatible with the geocoding API
     */
    geocoding: boolean;
};
/**
 * List of "non-ISO specific" languages.
 */
declare const NonISOLanguage: {
    /**
     * Language mode to display the labels in the end user's device language.
     */
    readonly AUTO: LanguageInfo;
    /**
     * The OSM language using latin script. MapTiler discourages its use as a primary language setting due to the lack of actual linguistic specificity,
     * though it can be an handy fallback. This is not to be confused with the "Classical Latin" language, which is available under the tag `.CLASSICAL_LATIN`.
     */
    readonly LATIN: LanguageInfo;
    /**
     * The OSM language using non-latin script. MapTiler discourages its use as a primary language setting due to the lack of actual linguistic specificity,
     * though it can be an handy fallback.
     */
    readonly NON_LATIN: LanguageInfo;
    /**
     * Using the local language generaly (but not always) means that every labels of a given region will use the dominant local language.
     */
    readonly LOCAL: LanguageInfo;
};
/**
 * List of "country specific" languages.
 */
declare const ISOLanguage: {
    /**
     * Albanian language
     */
    readonly ALBANIAN: LanguageInfo;
    /**
     * Amharic language
     */
    readonly AMHARIC: LanguageInfo;
    /**
     * Arabic language (right-to-left script)
     */
    readonly ARABIC: LanguageInfo;
    /**
     * Armenian language
     */
    readonly ARMENIAN: LanguageInfo;
    /**
     * Azerbaijani language
     */
    readonly AZERBAIJANI: LanguageInfo;
    /**
     * Basque language
     */
    readonly BASQUE: LanguageInfo;
    /**
     * Belarusian langauge
     */
    readonly BELARUSIAN: LanguageInfo;
    /**
     * Bengali language
     */
    readonly BENGALI: LanguageInfo;
    /**
     * Bosnian language
     */
    readonly BOSNIAN: LanguageInfo;
    /**
     * Breton language
     */
    readonly BRETON: LanguageInfo;
    /**
     * Bulgarian language
     */
    readonly BULGARIAN: LanguageInfo;
    /**
     * Catalan language
     */
    readonly CATALAN: LanguageInfo;
    /**
     * Chinese language
     */
    readonly CHINESE: LanguageInfo;
    /**
     * Traditional Chinese language
     */
    readonly TRADITIONAL_CHINESE: LanguageInfo;
    /**
     * Simplified Chinese language
     */
    readonly SIMPLIFIED_CHINESE: LanguageInfo;
    /**
     * Corsican language
     */
    readonly CORSICAN: LanguageInfo;
    /**
     * Croatian language
     */
    readonly CROATIAN: LanguageInfo;
    /**
     * Czech language
     */
    readonly CZECH: LanguageInfo;
    /**
     * Danish language
     */
    readonly DANISH: LanguageInfo;
    /**
     * Dutch language
     */
    readonly DUTCH: LanguageInfo;
    /**
     * German language
     */
    readonly GERMAN: LanguageInfo;
    /**
     * Greek language
     */
    readonly GREEK: LanguageInfo;
    /**
     * English language
     */
    readonly ENGLISH: LanguageInfo;
    /**
     * Esperanto language
     */
    readonly ESPERANTO: LanguageInfo;
    /**
     * Estonian language
     */
    readonly ESTONIAN: LanguageInfo;
    /**
     * Finnish language
     */
    readonly FINNISH: LanguageInfo;
    /**
     * French language
     */
    readonly FRENCH: LanguageInfo;
    /**
     * Frisian language
     */
    readonly FRISIAN: LanguageInfo;
    /**
     * Georgian language
     */
    readonly GEORGIAN: LanguageInfo;
    /**
     * Hebrew language (right-to-left non-latin script)
     */
    readonly HEBREW: LanguageInfo;
    /**
     * Hindi language
     */
    readonly HINDI: LanguageInfo;
    /**
     * Hungarian language
     */
    readonly HUNGARIAN: LanguageInfo;
    /**
     * Icelandic language
     */
    readonly ICELANDIC: LanguageInfo;
    /**
     * Indonesian language
     */
    readonly INDONESIAN: LanguageInfo;
    /**
     * Irish language
     */
    readonly IRISH: LanguageInfo;
    /**
     * Italian language
     */
    readonly ITALIAN: LanguageInfo;
    /**
     * Japanese language
     */
    readonly JAPANESE: LanguageInfo;
    /**
     * Japanese language in Hiragana form
     */
    readonly JAPANESE_HIRAGANA: LanguageInfo;
    /**
     * Japanese language (latin script)
     */
    readonly JAPANESE_2018: LanguageInfo;
    /**
     * Japanese language in Kana form (non-latin script)
     */
    readonly JAPANESE_KANA: LanguageInfo;
    /**
     * Japanse language, romanized (latin script)
     */
    readonly JAPANESE_LATIN: LanguageInfo;
    /**
     * Kannada language
     */
    readonly KANNADA: LanguageInfo;
    /**
     * Kazakh language
     */
    readonly KAZAKH: LanguageInfo;
    /**
     * Korean language
     */
    readonly KOREAN: LanguageInfo;
    /**
     * Korean language (latin script)
     */
    readonly KOREAN_LATIN: LanguageInfo;
    /**
     * Kurdish language
     */
    readonly KURDISH: LanguageInfo;
    /**
     * Classical Latin language
     */
    readonly CLASSICAL_LATIN: LanguageInfo;
    /**
     * Latvian language
     */
    readonly LATVIAN: LanguageInfo;
    /**
     * Lithuanian language
     */
    readonly LITHUANIAN: LanguageInfo;
    /**
     * Luxembourgish language
     */
    readonly LUXEMBOURGISH: LanguageInfo;
    /**
     * Macedonian language
     */
    readonly MACEDONIAN: LanguageInfo;
    /**
     * Malayalm language
     */
    readonly MALAYALAM: LanguageInfo;
    /**
     * Maltese language
     */
    readonly MALTESE: LanguageInfo;
    /**
     * Norwegian language
     */
    readonly NORWEGIAN: LanguageInfo;
    /**
     * Occitan language
     */
    readonly OCCITAN: LanguageInfo;
    /**
     * Persian language
     */
    readonly PERSIAN: LanguageInfo;
    /**
     * Polish language
     */
    readonly POLISH: LanguageInfo;
    /**
     * Portuguese language
     */
    readonly PORTUGUESE: LanguageInfo;
    /**
     * Punjabi language
     */
    readonly PUNJABI: LanguageInfo;
    /**
     * Western Punjabi language
     */
    readonly WESTERN_PUNJABI: LanguageInfo;
    /**
     * Romanian language
     */
    readonly ROMANIAN: LanguageInfo;
    /**
     * Romansh language
     */
    readonly ROMANSH: LanguageInfo;
    /**
     * Russian language
     */
    readonly RUSSIAN: LanguageInfo;
    /**
     * Serbian language (cyrillic script)
     */
    readonly SERBIAN_CYRILLIC: LanguageInfo;
    /**
     * Serbian language (latin script)
     */
    readonly SERBIAN_LATIN: LanguageInfo;
    /**
     * Scottish Gaelic language
     */
    readonly SCOTTISH_GAELIC: LanguageInfo;
    /**
     * Slovak language
     */
    readonly SLOVAK: LanguageInfo;
    /**
     * Slovene language
     */
    readonly SLOVENE: LanguageInfo;
    /**
     * Spanish language
     */
    readonly SPANISH: LanguageInfo;
    /**
     * Swedish language
     */
    readonly SWEDISH: LanguageInfo;
    /**
     * Tamil language
     */
    readonly TAMIL: LanguageInfo;
    /**
     * Telugu language
     */
    readonly TELUGU: LanguageInfo;
    /**
     * Thai language
     */
    readonly THAI: LanguageInfo;
    /**
     * Turkish language
     */
    readonly TURKISH: LanguageInfo;
    /**
     * Ukrainian language
     */
    readonly UKRAINIAN: LanguageInfo;
    /**
     * Vietnamese language (latin script)
     */
    readonly VIETNAMESE: LanguageInfo;
    /**
     * Welsh language
     */
    readonly WELSH: LanguageInfo;
};
/**
 * The complete list of languages
 */
declare const Language: {
    /**
     * Albanian language
     */
    readonly ALBANIAN: LanguageInfo;
    /**
     * Amharic language
     */
    readonly AMHARIC: LanguageInfo;
    /**
     * Arabic language (right-to-left script)
     */
    readonly ARABIC: LanguageInfo;
    /**
     * Armenian language
     */
    readonly ARMENIAN: LanguageInfo;
    /**
     * Azerbaijani language
     */
    readonly AZERBAIJANI: LanguageInfo;
    /**
     * Basque language
     */
    readonly BASQUE: LanguageInfo;
    /**
     * Belarusian langauge
     */
    readonly BELARUSIAN: LanguageInfo;
    /**
     * Bengali language
     */
    readonly BENGALI: LanguageInfo;
    /**
     * Bosnian language
     */
    readonly BOSNIAN: LanguageInfo;
    /**
     * Breton language
     */
    readonly BRETON: LanguageInfo;
    /**
     * Bulgarian language
     */
    readonly BULGARIAN: LanguageInfo;
    /**
     * Catalan language
     */
    readonly CATALAN: LanguageInfo;
    /**
     * Chinese language
     */
    readonly CHINESE: LanguageInfo;
    /**
     * Traditional Chinese language
     */
    readonly TRADITIONAL_CHINESE: LanguageInfo;
    /**
     * Simplified Chinese language
     */
    readonly SIMPLIFIED_CHINESE: LanguageInfo;
    /**
     * Corsican language
     */
    readonly CORSICAN: LanguageInfo;
    /**
     * Croatian language
     */
    readonly CROATIAN: LanguageInfo;
    /**
     * Czech language
     */
    readonly CZECH: LanguageInfo;
    /**
     * Danish language
     */
    readonly DANISH: LanguageInfo;
    /**
     * Dutch language
     */
    readonly DUTCH: LanguageInfo;
    /**
     * German language
     */
    readonly GERMAN: LanguageInfo;
    /**
     * Greek language
     */
    readonly GREEK: LanguageInfo;
    /**
     * English language
     */
    readonly ENGLISH: LanguageInfo;
    /**
     * Esperanto language
     */
    readonly ESPERANTO: LanguageInfo;
    /**
     * Estonian language
     */
    readonly ESTONIAN: LanguageInfo;
    /**
     * Finnish language
     */
    readonly FINNISH: LanguageInfo;
    /**
     * French language
     */
    readonly FRENCH: LanguageInfo;
    /**
     * Frisian language
     */
    readonly FRISIAN: LanguageInfo;
    /**
     * Georgian language
     */
    readonly GEORGIAN: LanguageInfo;
    /**
     * Hebrew language (right-to-left non-latin script)
     */
    readonly HEBREW: LanguageInfo;
    /**
     * Hindi language
     */
    readonly HINDI: LanguageInfo;
    /**
     * Hungarian language
     */
    readonly HUNGARIAN: LanguageInfo;
    /**
     * Icelandic language
     */
    readonly ICELANDIC: LanguageInfo;
    /**
     * Indonesian language
     */
    readonly INDONESIAN: LanguageInfo;
    /**
     * Irish language
     */
    readonly IRISH: LanguageInfo;
    /**
     * Italian language
     */
    readonly ITALIAN: LanguageInfo;
    /**
     * Japanese language
     */
    readonly JAPANESE: LanguageInfo;
    /**
     * Japanese language in Hiragana form
     */
    readonly JAPANESE_HIRAGANA: LanguageInfo;
    /**
     * Japanese language (latin script)
     */
    readonly JAPANESE_2018: LanguageInfo;
    /**
     * Japanese language in Kana form (non-latin script)
     */
    readonly JAPANESE_KANA: LanguageInfo;
    /**
     * Japanse language, romanized (latin script)
     */
    readonly JAPANESE_LATIN: LanguageInfo;
    /**
     * Kannada language
     */
    readonly KANNADA: LanguageInfo;
    /**
     * Kazakh language
     */
    readonly KAZAKH: LanguageInfo;
    /**
     * Korean language
     */
    readonly KOREAN: LanguageInfo;
    /**
     * Korean language (latin script)
     */
    readonly KOREAN_LATIN: LanguageInfo;
    /**
     * Kurdish language
     */
    readonly KURDISH: LanguageInfo;
    /**
     * Classical Latin language
     */
    readonly CLASSICAL_LATIN: LanguageInfo;
    /**
     * Latvian language
     */
    readonly LATVIAN: LanguageInfo;
    /**
     * Lithuanian language
     */
    readonly LITHUANIAN: LanguageInfo;
    /**
     * Luxembourgish language
     */
    readonly LUXEMBOURGISH: LanguageInfo;
    /**
     * Macedonian language
     */
    readonly MACEDONIAN: LanguageInfo;
    /**
     * Malayalm language
     */
    readonly MALAYALAM: LanguageInfo;
    /**
     * Maltese language
     */
    readonly MALTESE: LanguageInfo;
    /**
     * Norwegian language
     */
    readonly NORWEGIAN: LanguageInfo;
    /**
     * Occitan language
     */
    readonly OCCITAN: LanguageInfo;
    /**
     * Persian language
     */
    readonly PERSIAN: LanguageInfo;
    /**
     * Polish language
     */
    readonly POLISH: LanguageInfo;
    /**
     * Portuguese language
     */
    readonly PORTUGUESE: LanguageInfo;
    /**
     * Punjabi language
     */
    readonly PUNJABI: LanguageInfo;
    /**
     * Western Punjabi language
     */
    readonly WESTERN_PUNJABI: LanguageInfo;
    /**
     * Romanian language
     */
    readonly ROMANIAN: LanguageInfo;
    /**
     * Romansh language
     */
    readonly ROMANSH: LanguageInfo;
    /**
     * Russian language
     */
    readonly RUSSIAN: LanguageInfo;
    /**
     * Serbian language (cyrillic script)
     */
    readonly SERBIAN_CYRILLIC: LanguageInfo;
    /**
     * Serbian language (latin script)
     */
    readonly SERBIAN_LATIN: LanguageInfo;
    /**
     * Scottish Gaelic language
     */
    readonly SCOTTISH_GAELIC: LanguageInfo;
    /**
     * Slovak language
     */
    readonly SLOVAK: LanguageInfo;
    /**
     * Slovene language
     */
    readonly SLOVENE: LanguageInfo;
    /**
     * Spanish language
     */
    readonly SPANISH: LanguageInfo;
    /**
     * Swedish language
     */
    readonly SWEDISH: LanguageInfo;
    /**
     * Tamil language
     */
    readonly TAMIL: LanguageInfo;
    /**
     * Telugu language
     */
    readonly TELUGU: LanguageInfo;
    /**
     * Thai language
     */
    readonly THAI: LanguageInfo;
    /**
     * Turkish language
     */
    readonly TURKISH: LanguageInfo;
    /**
     * Ukrainian language
     */
    readonly UKRAINIAN: LanguageInfo;
    /**
     * Vietnamese language (latin script)
     */
    readonly VIETNAMESE: LanguageInfo;
    /**
     * Welsh language
     */
    readonly WELSH: LanguageInfo;
    /**
     * Language mode to display the labels in the end user's device language.
     */
    readonly AUTO: LanguageInfo;
    /**
     * The OSM language using latin script. MapTiler discourages its use as a primary language setting due to the lack of actual linguistic specificity,
     * though it can be an handy fallback. This is not to be confused with the "Classical Latin" language, which is available under the tag `.CLASSICAL_LATIN`.
     */
    readonly LATIN: LanguageInfo;
    /**
     * The OSM language using non-latin script. MapTiler discourages its use as a primary language setting due to the lack of actual linguistic specificity,
     * though it can be an handy fallback.
     */
    readonly NON_LATIN: LanguageInfo;
    /**
     * Using the local language generaly (but not always) means that every labels of a given region will use the dominant local language.
     */
    readonly LOCAL: LanguageInfo;
};
/**
 * Get language infos from a provided language key, the key being the no-whitespace capital name.
 * By default, the language dictionary to look into is the one defined in this library, but another one could be provided
 * Returns `null` if not found.
 */
declare function getLanguageInfoFromKey(languageKey: string, languageDictionary?: {
    [k: string]: LanguageInfo;
}): LanguageInfo | null;
/**
 * Get the language info from a provided 2-character iso code.
 * By default, the language dictionary to look into is the one defined in this library, but another one could be provided
 * Returns `null` if not found.
 */
declare function getLanguageInfoFromCode(languageCode: string, languageDictionary?: {
    [k: string]: LanguageInfo;
}): LanguageInfo | null;
/**
 * Get the language info from a language flag (e.g. `"name:en"`).
 * This is also handy to check is a given language flag is a supported language.
 * By default, the language dictionary to look into is the one defined in this library, but another one could be provided
 * Returns `null` if not found.
 */
declare function getLanguageInfoFromFlag(languageFlag: string, languageDictionary?: {
    [k: string]: LanguageInfo;
}): LanguageInfo | null;
/**
 * Get the default language of the device, as a LanguageInfo object.
 */
declare function getAutoLanguage(): LanguageInfo;
declare function isLanguageInfo(obj: unknown): obj is LanguageInfo;
/**
 * By default, the language dictionary to look into is the one defined in this library, but another one could be provided
 */
declare function toLanguageInfo(lang: LanguageInfo | string, languageDictionary?: {
    [k: string]: LanguageInfo;
}): LanguageInfo | null;
/**
 * Tells if two languages are the same, even though possibly provided under different forms.
 * Note: this is not comparing object references, but values.
 */
declare function areSameLanguages(langA: string | LanguageInfo, langB: string | LanguageInfo, languageDictionary?: {
    [k: string]: LanguageInfo;
}): boolean;

type LanguageGeocodingOptions = {
    /**
     * Prefer results in specific language. It’s possible to specify multiple values.
     */
    language?: string | Array<string> | LanguageInfo | Array<LanguageInfo>;
};
type GeocodingPlaceType = "continental_marine" | "country" | "major_landform" | "region" | "subregion" | "county" | "joint_municipality" | "joint_submunicipality" | "municipality" | "municipal_district" | "locality" | "neighbourhood" | "place" | "postal_code" | "address" | "road" | "poi";
type CommonForwardAndReverseGeocodingOptions = LanguageGeocodingOptions & {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`.
     */
    apiKey?: string;
    /**
     * Maximum number of results to show. Must be between 1 and 10.
     * For reverse geocoding with multiple `types` this must not be set or must be set to 1.
     * Default is 5 for forward and 1 for reverse geocoding.
     */
    limit?: number;
    /**
     * Features of specified types to query.
     * If not specified, feature of all available types except `poi` and `major_landform` will be queried (`types = ["poi", "major_landform"]`, `excludeTypes = true`).
     * In case of reverse geocoding if just a single type is specified, then multiple nearby features of the single type can be returned,
     * otherwise single feature for every specified type (or default types) can be returned.
     */
    types?: GeocodingPlaceType[];
    /**
     * Set to `true` to use all available feature types except those mentioned in `types`. Default value is `false` if `types` is specified.
     */
    excludeTypes?: boolean;
};
type GeocodingOptions = CommonForwardAndReverseGeocodingOptions & {
    /**
     * Only search for results in the specified area.
     */
    bbox?: BBox;
    /**
     * Prefer results close to a specific location.
     */
    proximity?: Position | "ip";
    /**
     * Limit search to specific country/countries specified as list of Alpha-2 ISO 3166-1 codes.
     */
    country?: string[];
    /**
     * Set to `false` to disable fuzzy (typo-tolerant) search. Default is `true`.
     */
    fuzzyMatch?: boolean;
    /**
     * Set to `true` to use autocomplete, `false` to disable it. Default is `true`.
     */
    autocomplete?: boolean;
};
type ReverseGeocodingOptions = CommonForwardAndReverseGeocodingOptions;
type ByIdGeocodingOptions = LanguageGeocodingOptions & {
    apiKey?: string;
};
type Coordinates = Position;
type FeatureProperties = {
    /**
     * External reference of the feature used for debugging purposes
     */
    ref: string;
    /**
     * ISO 3166-1 alpha-2 country code of the feature
     */
    country_code: string;
    /**
     * (experimental) Kind of the feature
     */
    kind?: "road" | "road_relation" | "admin_area" | "place" | "street" | "virtual_street";
    /**
     * (experimental) Value of place=* tag from OpenStreetMap feature if kind=place
     */
    "osm:place_type"?: string;
    /**
     * (experimental) Feature tags from OpenStreetMap. Only available for `poi` type.
     */
    "osm:tags"?: Record<string, string>;
    /**
     * Array of POI categories. Only available for `poi` type.
     */
    categories?: string[];
    /**
     * Wikidata identifier.
     */
    wikidata?: string;
};
type FeatureBase = {
    /**
     * Unique feature ID
     */
    id: string;
    /**
     * Localized feature name
     */
    text: string;
    /**
     * Query's primary ISO 639-1 language code
     */
    language?: string;
    /**
     * A string analogous to the `text` field that matches the query in the requested language.
     * This field is only returned when multiple languages are requested using the `language` parameter, and will be present for each requested language.
     */
    [text: `text_${string}`]: string;
    /**
     * A ISO 639-1 query's fallback language code.
     * This field is only returned when multiple languages are requested using the `language` parameter, and will be present for each requested language.
     */
    [language: `language_${string}`]: string;
};
type FeatureHierarchy = FeatureProperties & FeatureBase;
type GeocodingFeature = Feature<Geometry, FeatureProperties> & FeatureBase & {
    /**
     * Bounding box of the original feature as [w, s, e, n] array
     */
    bbox: BBox;
    /**
     * A [lon, lat] array of the original feature centeroid
     */
    center: Coordinates;
    /**
     * Formatted (including the hierarchy) and localized feature full name
     */
    place_name: string;
    /**
     * A string analogous to the `place_name` field that matches the query in the requested language.
     * This field is only returned when multiple languages are requested using the `language` parameter, and will be present for each requested language.
     */
    [key: `place_name_${string}`]: string;
    /**
     * An array of feature types describing the feature.
     * Currently each feature has only single type but this may change in the future.
     */
    place_type: GeocodingPlaceType[];
    /**
     * Localized type of the place name, matches `place_type` property
     */
    place_type_name: string[];
    /**
     * Feature hierarchy
     */
    context?: Array<FeatureHierarchy>;
    /**
     * Address number, if applicable
     */
    address?: string;
    /**
     * Indicates how well the returned feature matches the user's query on a scale from 0 to 1.
     * 0 means the result does not match the query text at all, while 1 means the result fully matches the query text.
     * You can use the relevance property to remove results that don't fully match the query.
     */
    relevance: number;
    /**
     * A string analogous to the `text` field that more closely matches the query than results in the specified language.
     * For example, querying _Praha, Czechia_ with language set to English (`en`) might return a feature with the `text` _Prague_ and the `matching_text` _Praha_.
     */
    matching_text?: string;
    /**
     * A string analogous to the `place_name` field that more closely matches the query than results in the specified language.
     * For example, querying _Praha, Czechia_ with language set to English (`en`) might return a feature with the `place_name` _Prague, Czechia_ and a `matching_place_name` of _Praha, Czechia_.
     */
    matching_place_name?: string;
};
type GeocodingSearchResult = {
    type: "FeatureCollection";
    /**
     * Array of features found
     */
    features: Array<GeocodingFeature>;
    /**
     * Tokenized search query
     */
    query: Array<string>;
    /**
     * Attribution of the result
     */
    attribution: string;
};
/**
 * Performs a forward geocoding query to MapTiler API.
 * Providing a human readable place name (of a city, country, street, etc.), the function returns
 * a list of candidate locations including longitude and latitude.
 *
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/geocoding/#search-by-name-forward
 *
 * @param query
 * @param options
 * @returns
 */
declare function forward(query: string, options?: GeocodingOptions): Promise<GeocodingSearchResult>;
/**
 * Perform a reverse geocoding query to MapTiler API.
 * Providing a longitude and latitude, this function returns a set of human readable information about this place (country, city, street, etc.)
 *
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/geocoding/#search-by-coordinates-reverse
 *
 * @param position
 * @param options
 * @returns
 */
declare function reverse(position: Position, options?: ReverseGeocodingOptions): Promise<GeocodingSearchResult>;
/**
 * Perform a geocoding query to MapTiler API to obtain fature by its ID.
 * Providing a feature ID, this function returns a feature which includes its full geometry.
 * Note that the feature ID is not stable and it changes when the database is re-indexed.
 *
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/geocoding/#search-by-feature-id
 *
 * @param id
 * @param options
 * @returns
 */
declare function byId(id: string, options?: ByIdGeocodingOptions): Promise<GeocodingSearchResult>;
/**
 * Perform a batch geocoding query to MapTiler API.
 * Provide multiple queries in the array. Each query can be forward, reverse or by feature ID.
 *
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/geocoding/#batch-geocoding
 *
 * @param queries
 * @param options
 * @returns
 */
declare function batch$1(queries: string[], options?: GeocodingOptions): Promise<GeocodingSearchResult[]>;
/**
 * The **geocoding** namespace contains asynchronous functions to call the [MapTiler Geocoding API](https://docs.maptiler.com/cloud/api/geocoding/).
 * The **Geocoding API** provides ways to get geographic coordinates from a human-readable search query of a place (forward geocoding)
 * and to get the location details (country, city, street, etc.) from a geographic coordinate (reverse geocoding);
 */
declare const geocoding: {
    forward: typeof forward;
    reverse: typeof reverse;
    byId: typeof byId;
    batch: typeof batch$1;
};

/**
 * Options that can be provided to get user data.
 */
type GeolocationInfoOptions = {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`
     */
    apiKey?: string;
    /**
     * Include elevation (in meters) in the results.
     * Default: `false`
     */
    elevation?: boolean;
};
type GeolocationResult = {
    /**
     * Name of the country
     * Example: Switzerland
     */
    country?: string;
    /**
     * Two-letter code of the country ISO 3166-1 alpha-2 codes
     * Example: CH
     */
    country_code?: string;
    /**
     * Bounds of the country in WGS84 degrees [west, south, east, north].
     * Example: [5.95538,45.818852,10.490936,47.809357]
     */
    country_bounds?: BBox;
    /**
     * Official country languages in ISO 639-1 format. ISO 639-1 codes
     * Example: ["de","fr","it"]
     */
    country_languages?: Array<string>;
    /**
     * Name of the continent
     * Example: Europe
     */
    continent?: string;
    /**
     * Two-letter code of the continent
     * Example: EU
     */
    continent_code?: string;
    /**
     * Indicated whether the country is part of the European Union.
     */
    eu?: boolean;
    /**
     * Name of the city
     * Example: Zurich
     */
    city?: string;
    /**
     * Latitude of the location
     * Example: 47.36667
     */
    latitude?: number;
    /**
     * Longitude of the location
     * Example: 8.55
     */
    longitude?: number;
    /**
     * Postal code
     * Example: 8000
     */
    postal?: string;
    /**
     * If known, the ISO 3166-2 name for the first level region. ISO 3166-2 codes
     * Example: Zurich
     */
    region?: string;
    /**
     * If known, the ISO 3166-2 code for the first level region. ISO 3166-2 codes
     * Example: ZH
     */
    region_code?: string;
    /**
     * Name of the timezone
     * Example: Europe/Zurich
     */
    timezone?: string;
    /**
     * Elevation of the location in meters
     * Example: 433
     */
    elevation?: number;
};
/**
 * Looks up geolocation details from IP address using MapTiler API.
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/geolocation/#ip-geolocation
 * @returns
 */
declare function info(options?: GeolocationInfoOptions): Promise<GeolocationResult>;
/**
 * The **geolocation** namespace contains an asynchronous function to call the [MapTiler Geolocation API](https://docs.maptiler.com/cloud/api/geolocation/).
 * The **Geolocation API** provides a way to retrieve the IP address as well as geographic informations of a machine performing the query (most likely: a user)
 */
declare const geolocation: {
    info: typeof info;
};

type CoordinatesSearchOptions = {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`
     */
    apiKey?: string;
    /**
     * Maximum number of results returned (default: 10)
     */
    limit?: number;
    /**
     *  Show detailed transformations for each CRS (default: false)
     */
    transformations?: boolean;
    /**
     * Show exports in WKT and Proj4 notations (default: false)
     */
    exports?: boolean;
};
type CoordinateId = {
    authority: string;
    code: BigInteger;
};
type CoordinateExport = {
    proj4: string;
    wkt: string;
};
type CoordinateGrid = {
    path: string;
};
type CoordinateTransformation = {
    id: CoordinateId;
    name: string;
    reversible: boolean;
    usable: boolean;
    deprecated: boolean;
    grids: Array<CoordinateGrid>;
    accuracy?: number;
    area?: string;
    bbox?: BBox;
    target_crs?: CoordinateId;
    unit?: string;
};
type CoordinateSearch = {
    id: CoordinateId;
    name: string;
    kind: string;
    deprecated: boolean;
    transformations?: Array<CoordinateTransformation | number>;
    accuracy?: number;
    unit?: string;
    area?: string;
    /**
     * Bounding box of the resource in [min_lon, min_lat, max_lon, max_lat] order.
     */
    bbox?: BBox;
    /**
     * Most suitable transformation for this CRS.
     */
    default_transformation?: DefaultTransformation;
    exports: CoordinateExport;
};
type DefaultTransformation = {
    authority: string;
    code: number;
};
type CoordinateSearchResult = {
    /**
     * The coordinate search results
     */
    results: Array<CoordinateSearch>;
    /**
     * The number of results
     */
    total: number;
};
/**
 * Search information about coordinate systems using MapTiler API.
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/coordinates/#search-coordinate-systems
 * @param query Can be any kind of CRS by name or code
 * @param options
 * @returns
 */
declare function search(query: string, options?: CoordinatesSearchOptions): Promise<CoordinateSearchResult>;
type XYZ = {
    x?: number;
    y?: number;
    z?: number;
};
type CoordinateTransformResult = {
    results: Array<XYZ>;
    /**
     * Transformations are selected using given ops parameter.
     * If no parameter is given, auto strategy is used.
     * If given, it may try to use a listed transformation,
     * then fallback to towgs84 patching, and finally boundcrs.
     */
    transformer_selection_strategy: string;
};
/**
 * Options that can be provided when transforming a coordinate from one CRS to another.
 */
type CoordinatesTransformOptions = {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`
     */
    apiKey?: string;
    /**
     * Source coordinate reference system (default: 4326)
     */
    sourceCrs?: number;
    /**
     * Target coordinate reference system (default: 4326)
     */
    targetCrs?: number;
    /**
     * List of codes of operations
     */
    operations?: number | Array<number>;
};
/**
 * Transforms coordinates from a source reference system to a target reference system using MapTiler API.
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/coordinates/#transform-coordinates
 * @param positions
 * @param options
 * @returns
 */
declare function transform(positions: Position | Array<Position>, options?: CoordinatesTransformOptions): Promise<CoordinateTransformResult>;
/**
 * The **coordinate** namespace contains asynchronous functions to call the [MapTiler Coordinate API](https://docs.maptiler.com/cloud/api/coordinates/).
 * The goal of the **Coordinate API* is query information about spatial coordinate reference system (CRS) as well as to transform coordinates from one CRS to another.
 */
declare const coordinates: {
    search: typeof search;
    transform: typeof transform;
};

/**
 * Options that can be provided to get user data.
 */
type GetDataOptions = {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`
     */
    apiKey?: string;
};
/**
 * Get user data and returns it as GeoJSON using the MapTiler API.
 * Learn more on the MapTiler API reference page: https://docs.maptiler.com/cloud/api/data/#geojson
 * @param dataId
 * @returns
 */
declare function get(dataId: string, options?: GetDataOptions): Promise<FeatureCollection>;
/**
 * The **data** namespace contains an asynchronous function to call the [MapTiler Data API](https://docs.maptiler.com/cloud/api/data/).
 * The **Data API** provides a way to retrieve user data in GeoJSON format.
 */
declare const data: {
    get: typeof get;
};

/**
 * Expand the map style provided as argument of the Map constructor
 * @param style
 * @returns
 */
declare function expandMapStyle(style: any): string;
/**
 * Type for object containing style details
 */
type MapStylePreset = {
    referenceStyleID: string;
    name: string;
    description: string;
    variants: Array<{
        deprecated?: boolean;
        id: string;
        name: string;
        variantType: string;
        description: string;
        imageURL: string;
    }>;
};
/**
 * An instance of MapStyleVariant contains information about a style to use that belong to a reference style
 */
declare class MapStyleVariant {
    /**
     * Human-friendly name
     */
    private name;
    /**
     * Variant name the variant is addressed to from its reference style: `MapStyle.REFERNCE_STYLE_NAME.VARIANT_TYPE`
     */
    private variantType;
    /**
     * MapTiler Cloud id
     */
    private id;
    /**
     * Reference map style, used to retrieve sibling variants
     */
    private referenceStyle;
    /**
     * Human-friendly description
     */
    private description;
    /**
     * URL to an image describing the style variant
     */
    private imageURL;
    /**
     * Whether this variant is deprecated or not
     */
    deprecated: boolean;
    constructor(
    /**
     * Human-friendly name
     */
    name: string, 
    /**
     * Variant name the variant is addressed to from its reference style: `MapStyle.REFERNCE_STYLE_NAME.VARIANT_TYPE`
     */
    variantType: string, 
    /**
     * MapTiler Cloud id
     */
    id: string, 
    /**
     * Reference map style, used to retrieve sibling variants
     */
    referenceStyle: ReferenceMapStyle, 
    /**
     * Human-friendly description
     */
    description: string, 
    /**
     * URL to an image describing the style variant
     */
    imageURL: string, 
    /**
     * Whether this variant is deprecated or not
     */
    deprecated?: boolean);
    /**
     * Get the human-friendly name
     * @returns
     */
    getName(): string;
    getFullName(): string;
    /**
     * Get the variant type (eg. "DEFAULT", "DARK", "PASTEL", etc.)
     * @returns
     */
    getType(): string;
    /**
     * Get the MapTiler Cloud id
     * @returns
     */
    getId(): string;
    /**
     * Get the human-friendly description
     */
    getDescription(): string;
    /**
     * Get the reference style this variant belongs to
     * @returns
     */
    getReferenceStyle(): ReferenceMapStyle;
    /**
     * Check if a variant of a given type exists for _this_ variants
     * (eg. if this is a "DARK", then we can check if there is a "LIGHT" variant of it)
     * @param variantType
     * @returns
     */
    hasVariant(variantType: string): boolean;
    /**
     * Retrieve the variant of a given type. If not found, will return the "DEFAULT" variant.
     * (eg. _this_ "DARK" variant does not have any "PASTEL" variant, then the "DEFAULT" is returned)
     * @param variantType
     * @returns
     */
    getVariant(variantType: string): MapStyleVariant;
    /**
     * Get all the variants for _this_ variants, except _this_ current one
     * @returns
     */
    getVariants(): Array<MapStyleVariant>;
    /**
     * Get the image URL that represent _this_ variant
     * @returns
     */
    getImageURL(): string;
    /**
     * Get the style as usable by MapLibre, a string (URL) or a plain style description (StyleSpecification)
     * @returns
     */
    getExpandedStyleURL(): string;
    warnIfDeprecated(variant?: MapStyleVariant): MapStyleVariant;
}
/**
 * An instance of reference style contains a list of StyleVariants ordered by relevance
 */
declare class ReferenceMapStyle {
    /**
     * Human-friendly name of this reference style
     */
    private name;
    /**
     * ID of this reference style
     */
    private id;
    /**
     * Variants that belong to this reference style, key being the reference type
     */
    private variants;
    /**
     * Variants that belong to this reference style, ordered by relevance
     */
    private orderedVariants;
    constructor(
    /**
     * Human-friendly name of this reference style
     */
    name: string, 
    /**
     * ID of this reference style
     */
    id: string);
    /**
     * Get the human-friendly name of this reference style
     * @returns
     */
    getName(): string;
    /**
     * Get the id of _this_ reference style
     * @returns
     */
    getId(): string;
    /**
     * Add a variant to _this_ reference style
     * @param v
     */
    addVariant(v: MapStyleVariant): void;
    /**
     * Check if a given variant type exists for this reference style
     * @param variantType
     * @returns
     */
    hasVariant(variantType: string): boolean;
    /**
     * Get a given variant. If the given type of variant does not exist for this reference style,
     * then the most relevant default variant is returned instead
     * @param variantType
     * @returns
     */
    getVariant(variantType: string): MapStyleVariant;
    /**
     * Get the list of variants for this reference style
     * @returns
     */
    getVariants(): Array<MapStyleVariant>;
    /**
     * Get the defualt variant for this reference style
     * @returns
     */
    getDefaultVariant(): MapStyleVariant;
}
/**
 * All the styles and variants maintained by MapTiler.
 */
type MapStyleType = {
    /**
     * Suitable for navigation, with high level of detail on urban areas, plenty of POIs and 3D buildings
     */
    STREETS: ReferenceMapStyle & {
        /**
         * Suitable for navigation, with high level of detail on urban areas, plenty of POIs and 3D buildings.
         */
        DEFAULT: MapStyleVariant;
        /**
         * Suitable for navigation, with high level of detail on urban areas, plenty of POIs and 3D buildings, in dark mode.
         */
        DARK: MapStyleVariant;
        /**
         * Suitable for navigation, with high level of detail on urban areas, plenty of POIs and 3D buildings, in light mode.
         */
        LIGHT: MapStyleVariant;
        /**
         * Suitable for navigation, with high level of detail on urban areas, plenty of POIs and 3D buildings, in blue night mode.
         */
        NIGHT: MapStyleVariant;
        /**
         * Suitable for navigation, with high level of detail on urban areas, plenty of POIs and 3D buildings, with a pastel color palette.
         */
        PASTEL: MapStyleVariant;
    };
    /**
     * Suitable for outdoor activities. With elevation isolines and hillshading.
     */
    OUTDOOR: ReferenceMapStyle & {
        /**
         * Suitable for outdoor activities. With elevation isolines and hillshading.
         */
        DEFAULT: MapStyleVariant;
        /**
         * Suitable for outdoor activities. With elevation isolines and hillshading, in dark mode.
         */
        DARK: MapStyleVariant;
    };
    /**
     * Suitabe for winter outdoor activities. With ski tracks, elevation isolines and hillshading.
     */
    WINTER: ReferenceMapStyle & {
        /**
         * Suitabe for winter outdoor activities. With ski tracks, elevation isolines and hillshading.
         */
        DEFAULT: MapStyleVariant;
        /**
         * Suitabe for winter outdoor activities. With ski tracks, elevation isolines and hillshading, in dark mode.
         */
        DARK: MapStyleVariant;
    };
    /**
     * High resolution imagery only, without any label.
     */
    SATELLITE: ReferenceMapStyle & {
        /**
         * High resolution imagery only, without any label.
         */
        DEFAULT: MapStyleVariant;
    };
    /**
     * High resolution imagery with labels, political borders and roads.
     */
    HYBRID: ReferenceMapStyle & {
        /**
         * High resolution imagery with labels, political borders and roads.
         */
        DEFAULT: MapStyleVariant;
    };
    /**
     * A minimalist street-oriented style without POI
     */
    BASIC: ReferenceMapStyle & {
        /**
         * A minimalist street-oriented style without POI
         */
        DEFAULT: MapStyleVariant;
        /**
         * A minimalist street-oriented style without POI, in dark mode
         */
        DARK: MapStyleVariant;
        /**
         * A minimalist street-oriented style without POI, in light mode
         */
        LIGHT: MapStyleVariant;
    };
    /**
     * A bright street-oriented style, a nice alternative to `streets`
     */
    BRIGHT: ReferenceMapStyle & {
        /**
         * A bright street-oriented style, a nice alternative to `streets`
         */
        DEFAULT: MapStyleVariant;
        /**
         * A bright street-oriented style, a nice alternative to `streets`, in dark mode
         */
        DARK: MapStyleVariant;
        /**
         * A bright street-oriented style, a nice alternative to `streets`, in light mode
         */
        LIGHT: MapStyleVariant;
        /**
         * A bright street-oriented style, a nice alternative to `streets`, with a soft pastel color palette
         */
        PASTEL: MapStyleVariant;
    };
    /**
     * Classic OpenStreetMap style
     */
    OPENSTREETMAP: ReferenceMapStyle & {
        DEFAULT: MapStyleVariant;
    };
    /**
     * A nice high-contrast, yet less saturated alternative to the `outdoor` style, with hillshading, 3D buildings and fairly high street details
     */
    TOPO: ReferenceMapStyle & {
        /**
         * A nice high-contrast, yet less saturated alternative to the `outdoor` style, with hillshading, 3D buildings and fairly high street details
         */
        DEFAULT: MapStyleVariant;
        /**
         * A nice high-contrast, yet less saturated alternative to the `outdoor` style, with hillshading, 3D buildings and fairly high street details, in dark mode
         */
        DARK: MapStyleVariant;
        /**
         * A nice high-contrast, and high saturation alternative to the `outdoor` style, with hillshading, 3D buildings and fairly high street details
         */
        SHINY: MapStyleVariant;
        /**
         * A nice low-contrast, alternative to the `outdoor` style, with hillshading, 3D buildings and fairly high street details, using a soft pastel color palette
         */
        PASTEL: MapStyleVariant;
        /**
         * A nice very high-contrast, yet less saturated alternative to the `outdoor` style, with hillshading, 3D buildings and fairly high street details
         */
        TOPOGRAPHIQUE: MapStyleVariant;
    };
    /**
     * A nice alternative to `streets` with a soft color palette
     */
    VOYAGER: ReferenceMapStyle & {
        /**
         * A nice alternative to `streets` with a soft color palette
         *
         */
        DEFAULT: MapStyleVariant;
        /**
         * A nice alternative to `streets`, in very dark mode
         */
        DARK: MapStyleVariant;
        /**
         * A nice alternative to `streets`, in light mode
         */
        LIGHT: MapStyleVariant;
        /**
         * A nice alternative to `streets` with a soft sepia color palette and vintage look
         */
        VINTAGE: MapStyleVariant;
    };
    /**
     * A bold very high contrast black and white (no gray!) style for the city
     */
    TONER: ReferenceMapStyle & {
        /**
         * A bold very high contrast black and white (no gray!) style for the city
         */
        DEFAULT: MapStyleVariant;
        /**
         * A bold very high contrast black and white (no gray!) style for the city, without any label
         */
        BACKGROUND: MapStyleVariant;
        /**
         * A bold very high contrast, yet faded, style for the city
         */
        LITE: MapStyleVariant;
        /**
         * A bold very high contrast black and white (no gray!) style for the city, with no building, only roads!
         */
        LINES: MapStyleVariant;
    };
    /**
     * Minimalist style, perfect for data visualization
     */
    DATAVIZ: ReferenceMapStyle & {
        /**
         *  Minimalist style, perfect for data visualization
         */
        DEFAULT: MapStyleVariant;
        /**
         *  Minimalist style, perfect for data visualization in dark mode
         */
        DARK: MapStyleVariant;
        /**
         *  Minimalist style, perfect for data visualization in light mode
         */
        LIGHT: MapStyleVariant;
    };
    /**
     * Explore deep see trenches and mountains, with isolines and depth labels
     */
    OCEAN: ReferenceMapStyle & {
        /**
         * Explore deep see trenches and mountains, with isolines and depth labels
         */
        DEFAULT: MapStyleVariant;
    };
    /**
     * Neutral greyscale style with hillshading suitable for colorful terrain-aware visualization
     */
    BACKDROP: ReferenceMapStyle & {
        /**
         *  Neutral greyscale style with hillshading suitable for colorful terrain-aware visualization
         */
        DEFAULT: MapStyleVariant;
        /**
         *  Dark greyscale style with hillshading suitable for colorful terrain-aware visualization
         */
        DARK: MapStyleVariant;
        /**
         *  Light greyscale style with hillshading suitable for colorful terrain-aware visualization
         */
        LIGHT: MapStyleVariant;
    };
    LANDSCAPE: ReferenceMapStyle & {
        /**
         *  Light terrain map for data overlays and visualisations
         */
        DEFAULT: MapStyleVariant;
        /**
         *  Dark terrain map for data overlays and visualisations
         */
        DARK: MapStyleVariant;
        /**
         *  Vivid terrain map for data overlays and visualisations
         */
        VIVID: MapStyleVariant;
    };
    /**
     *  Watercolor map for creative use
     */
    AQUARELLE: ReferenceMapStyle & {
        /**
         *  Watercolor map for creative use
         */
        DEFAULT: MapStyleVariant;
        /**
         *  Dark watercolor map for creative use
         */
        DARK: MapStyleVariant;
        /**
         *  Vivid watercolor map for creative use
         */
        VIVID: MapStyleVariant;
    };
};
declare const mapStylePresetList: Array<MapStylePreset>;
declare function styleToStyle(style: string | ReferenceMapStyle | MapStyleVariant | null | undefined): string;
/**
 * Contains all the reference map style created by MapTiler team as well as all the variants.
 * For example, `MapStyle.STREETS` and the variants:
 * - `MapStyle.STREETS.DARK`
 * - `MapStyle.STREETS.LIGHT`
 * - `MapStyle.STREETS.PASTEL`
 *
 */
declare const MapStyle: MapStyleType;

/**
 * Base set of options that can be provided to all the types of static maps
 */
type StaticMapBaseOptions = {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`
     */
    apiKey?: string;
    /**
     * Style of the map (not full style URL). Example: "winter", "streets-v2".
     * Default: `"streets-v2"`
     */
    style?: string | ReferenceMapStyle | MapStyleVariant;
    /**
     * Double the size of the static map image to support hiDPI/Retina monitors.
     * Default: `false`
     */
    hiDPI?: boolean;
    /**
     * Image format.
     * Default: `"png"`
     */
    format?: "png" | "jpg" | "webp";
    /**
     * Width of the output image. Maximum value: `2048`.
     * Default: `1024`
     */
    width?: number;
    /**
     * Height of the output image. Maximum value: `2048`.
     * Default: `1024`
     */
    height?: number;
    /**
     * Placement of the attribution. Can also be set to `false` to not show attribution.
     * Default: `"bottomright"`
     */
    attribution?: "bottomright" | "bottomleft" | "topleft" | "topright" | false;
    /**
     * A marker or list of markers to show on the map
     * Default: none provided
     */
    markers?: StaticMapMarker | Array<StaticMapMarker>;
    /**
     * URL of the marker image. Applies only if one or multiple markers positions are provided.
     * Default: none provided
     */
    markerIcon?: string;
    /**
     * Position of the marker regarding its coordinates. Applies only:
     * - with a custom icon provided with `markerIcon`
     * - if one or multiple markers positions are provided.
     * Default: `"bottom"`
     */
    markerAnchor?: "top" | "left" | "bottom" | "right" | "center" | "topleft" | "bottomleft" | "topright" | "bottomright";
    /**
     * Draw a path or polygon on top of the map. If the path is too long it will be simplified, yet remaining accurate.
     * Default: none provided
     */
    path?: Array<Position>;
    /**
     * Color of the path line. The color must be CSS compatible.
     * Examples:
     * - long form hex without transparency `"#FF0000"` (red)
     * - short form hex without transparency `"#F00"` (red)
     * - long form hex with transparency `"#FF000008"` (red, half opacity)
     * - short form hex with transparency `"#F008"` (red, half opacity)
     * - CSS color shorthands: `"red"`, `"chartreuse"`, etc.
     * - decimal RGB values without transparency: `"rgb(128, 100, 255)"`
     * - decimal RGB values with transparency: `"rgb(128, 100, 255, 0.5)"`
     * Default: `"blue"`
     */
    pathStrokeColor?: string;
    /**
     * Color of the filling, also works if the polygon is not closed. The color must be CSS compatible.
     * Examples:
     * - long form hex without transparency `"#FF0000"` (red)
     * - short form hex without transparency `"#F00"` (red)
     * - long form hex with transparency `"#FF000008"` (red, half opacity)
     * - short form hex with transparency `"#F008"` (red, half opacity)
     * - CSS color shorthands: `"red"`, `"chartreuse"`, etc.
     * - decimal RGB values without transparency: `"rgb(128, 100, 255)"`
     * - decimal RGB values with transparency: `"rgb(128, 100, 255, 0.5)"`
     * Default: none (transparent filling)
     */
    pathFillColor?: string;
    /**
     * Width of the path line in pixel. It can be floating point precision (ex: `0.5`)
     * Default: `1` if `hiDPI` is `false` and `2` if `hiDPI` is `true`.
     */
    pathWidth?: number;
};
/**
 * Options that can be provided to centered static maps
 */
type CenteredStaticMapOptions = StaticMapBaseOptions;
/**
 * Options that can be provided to bounded static maps
 */
type BoundedStaticMapOptions = StaticMapBaseOptions & {
    /**
     * Extra space added around the regio of interest, in percentage.
     * Default: `0.1` (for 10%)
     */
    padding?: number;
};
/**
 * Options that can be provided to automatic static maps
 */
type AutomaticStaticMapOptions = BoundedStaticMapOptions;
/**
 * Definition of a maker to show on a static map
 */
type StaticMapMarker = [
    /**
     * Longitude of the marker
     */
    number,
    /**
     * latitude of the marker
     */
    number,
    /**
     * Color of the marker with CSS syntax. Applies only if a custom `markerIcon` is not provided.
     */
    string
];
/**
 * Construct the URL for a static map centered on one point.
 * Note: this function does not fetch the binary content of the image since
 * the purpose of a static map is generally to have its URL as a `src` property of a <img/> element.
 * If a path is provided and is too long, it will be simplified in an accurate way.
 * @param center
 * @param zoom
 * @param options
 * @returns
 */
declare function centered(center: Position, zoom: number, options?: CenteredStaticMapOptions): string;
/**
 * Construct the URL for a static map using a bounding box
 * Note: this function does not fetch the binary content of the image since
 * the purpose of a static map is generally to have its URL as a `src` property of a <img/> element.
 * If a path is provided and is too long, it will be simplified in an accurate way.
 * @param boundingBox
 * @param options
 * @returns
 */
declare function bounded(boundingBox: BBox, options?: BoundedStaticMapOptions): string;
/**
 * Construct the URL for a static map automatically fitted around the provided path or markers.
 * Note: this function does not fetch the binary content of the image since
 * the purpose of a static map is generally to have its URL as a `src` property of a <img/> element.
 * If a path is provided and is too long, it will be simplified in an accurate way.
 * @param options
 * @returns
 */
declare function automatic(options?: AutomaticStaticMapOptions): string;
/**
 * The **staticMaps** namespace contains an synchronous function build image URL of static map, as specified by the [MapTiler Static Map API](https://docs.maptiler.com/cloud/api/static-maps/).
 * The URL of static maps can then be used within a `<img />` markup element, as the `src` property value.
 */
declare const staticMaps: {
    centered: typeof centered;
    bounded: typeof bounded;
    automatic: typeof automatic;
};

/**
 * A ServiceError is an Error that includes the HTTP response details
 */
declare class ServiceError extends Error {
    res: Response;
    constructor(res: Response, customMessage?: string);
}

/**
 * Convert a wgs84 longitude to web Mercator X (west-east axis), where westmost X is 0 and eastmost X is 1.
 */
declare function longitudeToMercatorX(lng: number): number;
/**
 * Convert a wgs84 latitude to web Mercator Y (north-south axis), where northmost Y is 0 and southmost Y is 1.
 */
declare function latitudeToMercatorY(lat: number): number;
/**
 * Convert a wgs84 position into a web Mercator position where north-west is [0, 0] and south-east is [1, 1]
 */
declare function wgs84ToMercator(position: Position): Position;
/**
 * Converts a mercator X (west-east axis in [0, 1]) to wgs84 longitude
 */
declare function mercatorXToLongitude(x: number): number;
/**
 * Converts a mercator Y (north-south axis in [0, 1]) to wgs84 latitude
 */
declare function mercatorYToLatitude(y: number): number;
/**
 * Converts a web Mercator position where north-west is [0, 0] and south-east is [1, 1] into a wgs84
 */
declare function mercatorToWgs84(position: Position): Position;
/**
 * Gives the distance in meters between two positions using the Haversine Formula.
 */
declare function haversineDistanceWgs84(from: Position, to: Position): number;
/**
 * Compute the cumulated distance for each position of an array of positions.
 * For I positions, there are I-1 distance, hence the distance at i corresponds
 * to the distance from the (i-1)th position to ith
 */
declare function haversineCumulatedDistanceWgs84(positions: Position[]): number[];
/**
 * Returns a position that has longitude in [-180, 180]
 */
declare function wrapWgs84(position: Position): Position;
declare function circumferenceAtLatitude(latitude: number): number;
/**
 * From a given mercator coordinate and a zoom level, computes the tile index
 */
declare function mercatorToTileIndex(
/**
 * Mercator coordinates (north-west is [0, 0], sourth-east is [1, 1])
 */
position: Position, 
/**
 * Zoom level
 */
zoom: number, 
/**
 * Returns integer tile indices if `true` or floating-point values if `false`
 */
strict?: boolean): Position;
/**
 * From a given wgs84 coordinate and a zoom level, computes the tile index
 */
declare function wgs84ToTileIndex(
/**
 * Wgs84 coordinates
 */
position: Position, 
/**
 * Zoom level
 */
zoom: number, 
/**
 * Returns integer tile indices if `true` or floating-point values if `false`
 */
strict?: boolean): Position;
/**
 * Converts a degree angle into a radian angle
 */
declare function toRadians(degrees: number): number;
/**
 * Converts a radian angle to a degree angle
 */
declare function toDegrees(radians: number): number;
/**
 * Compute an intermediate point between two reference points using the Haversine formula.
 * If ratio is `0`, the returned position is pos1.
 * If ratio is `1`, the returned position is pos2.
 * If ratio is `0.5`, the returned position is halfway pos1 pos2 in distance.
 */
declare function haversineIntermediateWgs84(pos1: Position, pos2: Position, ratio: number): Position;
declare const math: {
    EARTH_RADIUS: number;
    EARTH_CIRCUMFERENCE: number;
    longitudeToMercatorX: typeof longitudeToMercatorX;
    latitudeToMercatorY: typeof latitudeToMercatorY;
    wgs84ToMercator: typeof wgs84ToMercator;
    mercatorXToLongitude: typeof mercatorXToLongitude;
    mercatorYToLatitude: typeof mercatorYToLatitude;
    mercatorToWgs84: typeof mercatorToWgs84;
    haversineDistanceWgs84: typeof haversineDistanceWgs84;
    wrapWgs84: typeof wrapWgs84;
    circumferenceAtLatitude: typeof circumferenceAtLatitude;
    mercatorToTileIndex: typeof mercatorToTileIndex;
    wgs84ToTileIndex: typeof wgs84ToTileIndex;
    toRadians: typeof toRadians;
    toDegrees: typeof toDegrees;
    haversineIntermediateWgs84: typeof haversineIntermediateWgs84;
    haversineCumulatedDistanceWgs84: typeof haversineCumulatedDistanceWgs84;
};

type ElevationAtOptions = {
    /**
     * Custom MapTiler Cloud API key to use instead of the one in global `config`
     */
    apiKey?: string;
    /**
     * Zoom level to use for the terrain tileset in `client` mode.
     * If not provided, the highest zoom level will be used.
     */
    zoom?: number;
    /**
     * If set to `client`, the elevation will be computed from the terrain tiles on the client side.
     * If set to `server`, the elevation will be obtained from the MapTiler Elevation API.
     * Defaults to `server` for `at`, `batch`, and `client` for `fromLineString`, `fromMultiLineString` (in browser envs).
     */
    computeOn?: "client" | "server";
};
/**
 * Options for batch elevation lookup
 */
type ElevationBatchOptions = ElevationAtOptions & {
    /**
     * If provided, a median kernel of the given size will smooth the elevation
     * to reduce very small local variations
     */
    smoothingKernelSize?: number;
};
/**
 * Get the elevation at a given position.
 * The returned position is of form [longitude, latitude, altitude]
 */
declare function at(
/**
 * Wgs84 position as [longitude, latitude]
 */
position: Position, 
/**
 * Options
 */
options?: ElevationAtOptions): Promise<Position>;
/**
 * Perform a batch elevation request
 */
declare function batch(
/**
 * Wgs84 positions as [[lng0, lat0], [lng1, lat1], [lng2, lat2], ...]
 */
positions: Position[], 
/**
 * Options
 */
options?: ElevationBatchOptions): Promise<Position[]>;
/**
 * Creates a clone of a GeoJSON LineString (deep copy with structuredClone) that contains the computed elevation
 * as the third element of each position array ([lng, lat, alt])
 */
declare function fromLineString(
/**
 * A GeoJSON LineStriung feature
 */
ls: LineString, 
/**
 * Options
 */
options?: ElevationBatchOptions): Promise<LineString>;
/**
 * Creates a clone of a MultiLineString (deep copy with structuredClone) that contains the computed elevation
 * as the third element of each position array ([lng, lat, alt])
 */
declare function fromMultiLineString(
/**
 * A GeoJSON LineStriung feature
 */
ls: MultiLineString, 
/**
 * Options
 */
options?: ElevationBatchOptions): Promise<MultiLineString>;
declare const elevation: {
    at: typeof at;
    batch: typeof batch;
    fromLineString: typeof fromLineString;
    fromMultiLineString: typeof fromMultiLineString;
};

/**
 * From a generic GeoJSON object extract thepossibly nested LineString and MultiLineString features
 * it contains. The result is a flat array made of LineString and MultiLineString.
 */
declare function extractLineStrings(geoJson: GeoJsonObject): Array<LineString | MultiLineString>;
/**
 * Simplify a path made of a list of GeoJSON Positions, with a tolerance.
 */
declare function simplify(points: Array<Position>, tolerance: number): Array<Position>;
declare const misc: {
    extractLineStrings: typeof extractLineStrings;
    simplify: typeof simplify;
};

export { type AutomaticStaticMapOptions, type BoundedStaticMapOptions, type BufferToPixelDataFunction, type ByIdGeocodingOptions, type CenteredStaticMapOptions, ClientConfig, type CommonForwardAndReverseGeocodingOptions, type CoordinateExport, type CoordinateGrid, type CoordinateId, type CoordinateSearch, type CoordinateSearchResult, type CoordinateTransformResult, type CoordinateTransformation, type Coordinates, type CoordinatesSearchOptions, type CoordinatesTransformOptions, type DefaultTransformation, type ElevationAtOptions, type ElevationBatchOptions, type FeatureHierarchy, type FetchFunction, type GeocodingFeature, type GeocodingOptions, type GeocodingPlaceType, type GeocodingSearchResult, type GeolocationInfoOptions, type GeolocationResult, type GetDataOptions, ISOLanguage, Language, type LanguageGeocodingOptions, type LanguageInfo, MapStyle, type MapStylePreset, type MapStyleType, MapStyleVariant, NonISOLanguage, type PixelData, ReferenceMapStyle, type ReverseGeocodingOptions, ServiceError, type StaticMapBaseOptions, type StaticMapMarker, type TileJSON, type XYZ, areSameLanguages, bufferToPixelDataBrowser, canParsePixelData, circumferenceAtLatitude, config, coordinates, data, elevation, expandMapStyle, geocoding, geolocation, getAutoLanguage, getBufferToPixelDataParser, getLanguageInfoFromCode, getLanguageInfoFromFlag, getLanguageInfoFromKey, getTileCache, isLanguageInfo, mapStylePresetList, math, misc, staticMaps, styleToStyle, toLanguageInfo };

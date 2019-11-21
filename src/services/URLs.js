import env from '../../.env.local.json';
const NODE_ENV = process.env.NODE_ENV;
//
/********************************************************
 * URLs Frontend
 */
const httpProtocol = env[NODE_ENV].url.httpProtocol;
const appDomain = env[NODE_ENV].url.appDomain;
const serverDomain = env[NODE_ENV].url.serverDomain;

const urlApp = `${httpProtocol}${appDomain}`;
const urlServer = `${httpProtocol}${serverDomain}`;

/********************************************************
 * URLs Backend
 */
const dataFile = env[NODE_ENV].url.backEnd.dataFile;
const pathData = env[NODE_ENV].url.backEnd.pathData;
const baseURLServer = env[NODE_ENV].url.backEnd.baseURLServer;
//
const pathDataServer = `${baseURLServer}${dataFile}`;

export { dataFile, pathData, baseURLServer, urlApp, urlServer, pathDataServer };

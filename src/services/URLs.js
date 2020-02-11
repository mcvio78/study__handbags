import env from '../../.env.json';
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
const handbagsData = env[NODE_ENV].url.backEnd.handbagsData;
const handbagsPath = env[NODE_ENV].url.backEnd.handbagsPath;
const handbagsQuantityData = env[NODE_ENV].url.backEnd.handbagsQuantityData;
const usersData = env[NODE_ENV].url.backEnd.usersData;
const usersPath = env[NODE_ENV].url.backEnd.usersPath;
const userProfileData = env[NODE_ENV].url.backEnd.userProfileData;
const cartPath = env[NODE_ENV].url.backEnd.cartPath;
const userCartData = env[NODE_ENV].url.backEnd.userCartData;
const userHistoryData = env[NODE_ENV].url.backEnd.userHistoryData;
const baseURLServer = env[NODE_ENV].url.backEnd.baseURLServer;
//
const pathDataServer = `${baseURLServer}${handbagsData}`;

export {
	handbagsData,
	handbagsPath,
	handbagsQuantityData,
	usersData,
	usersPath,
	userProfileData,
	cartPath,
	userCartData,
	userHistoryData,
	baseURLServer,
	urlApp,
	urlServer,
	pathDataServer
};

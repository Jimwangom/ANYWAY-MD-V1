const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUFNYTRJN2NkYkVlK1UySkJvTzhEcWxtU2V6eDRud3JTbXg1YSs3VytFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnY2bVBYRXdtVjBtcEQ0T0taRVEzbVdqbzJWVFdTZHA3TkRnYnVqUWwyMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjUGpRZGkxZ2IrREs0TDk3blBNMlhVbzl3YVh1RHlqNDRDbTBMeXRqM1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2YnIrTi85NXpaWThobmMvMFkzQ2Y3Um96WGNSaWdCT0xUREh2L1EyYkdjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFBU1locXAzU3gxaCtFbWpZRElGeFA4MlJUMVdrM2FEMDRJQ1dKQkwxRXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik55RzZIWEx0S0Y3N3VDcGJqMmNKd3NYYktpeks1cHhYOU9sb1hmTTcxeHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUI3bzRBQW5pVmZQTzdCS1o2UWZzQ0tpZU9HRHVxSmNpVlNyUVFRcWZYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZLS0JrMjhXdGd5c0JPRWVVelF0ZENkNWtpcW9MUXBlaXZBcy9xNVJsQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikkyd3VmeTFYVi9ZUzFoeitPUFE5VUJqaGtiRFpkTzMvTXF2QXdLQmFsMGR0Q2xkamhNVXEvOE0vWC85NkpFRFpRUVV5L1laMS9hUVoxVEg1dzlmbWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTEsImFkdlNlY3JldEtleSI6Im1HQy9FNHNuaGN1cHFLZUpPNW9TOERpbEluN1BvYVIxcHlkUU16c25RTTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Im5yT0d1RG1YVGRhOWxrdVVHMTY2T0EiLCJwaG9uZUlkIjoiYWE0NDAzMTQtMGI2MC00OWU4LWIyNTYtNzJiMzQyZmFhZmE1IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijd5d2g4NUlJTEU5dzNXTjN1SHc2VElscjVoQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKTVRXQksvRG1WS0wvTVZCK2pJQzNRTXAwelk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiOENCWkE3S1giLCJtZSI6eyJpZCI6IjI1NTYyODQ3MDUwNzoyM0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTGliN3Y4RkVKN1owcndHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQXQ5Szg4RTJGL2EveEN0OXJBOSt4eFAybFVoWEpLTjRBL0tlbjg0enFGOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRTlNTE1yTmJRM1VvZ2pNc3N2cGNBVFU2dHMyVHJ1a3lPWUQ3SUdlTTZlc1VRcDZaTWhKM2JBR0M3L3NHTWl5NjJsVmFScmpvQmFvME0weWJseDRmQ2c9PSIsImRldmljZVNpZ25hdHVyZSI6Inl0eXdUQXY2TEVUSjFNUUN3RTkzdEVJT2ZodkRxTm5ISFhxY2F2ZWNlWC82cm1oSGFHTFRDRWZXTyt0VFJrelM3aWl4d2FrRnJZNWt4TG9LcU1GaWlnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NjI4NDcwNTA3OjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFMZlN2UEJOaGYydjhRcmZhd1Bmc2NUOXBWSVZ5U2plQVB5bnAvT002aGYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzc3OTY3ODAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUxTIn0=',
    PREFIXE: process.env.PREFIX || "=",
    OWNER_NAME: process.env.OWNER_NAME || "James",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " James",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
                  ANTIDELETE2 : process.env.ANTIDELETE2 || "yes",
                  ANTIDELETE1 : process.env.ANTIDELETE1 || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

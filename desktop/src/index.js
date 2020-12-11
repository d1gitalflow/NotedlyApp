const { app, BrowserWindow } = require('electron');
const { is, setContentSecurityPolicy } = require('electron-util');

//import config
const config = require('./config.js');



//evitar garbage collection, declarar windows como var mutavel
let window;

//detalhes do browser windows
function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //'false' - evitar riscos de segurança (devido correr localmente)
            nodeIntegration: false
        }
    })

    
    //se estiver em development mode, abre chrome devtools
    if (is.development) {
        window.loadURL(config.LOCAL_WEB_URL);
    } else {
        window.loadURL(config.PRODUCTION_WEB_URL);
    }

    //true em development abre chrome devtools
    if (is.development) {
        window.webContents.openDevTools();
    }

    //CSP em production, true se nao estiver development
    if (!is.development) {
        setContentSecurityPolicy(`
            default-src 'none';
            script-src 'self';
            img-src 'self' https://www.gravatar.com;
            style-src 'self' 'unsafe-inline';
            font-src 'self';
            connect-src 'self' ${config.PRODUCTION_API_URL};
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
        `);
    }

    //quando se fecha window, reset ao window obj
    window.on('closed', () => {
        window = null;
    });

}

//quando electron estiver pronto, passar fn createWindow
app.on('ready', createWindow)

//quit quando todas as janelas estiverem fechadas
app.on("window-all-closed",()=>{
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

app.on('activate',()=>{
    if(window === null){
        createWindow();
    }
});
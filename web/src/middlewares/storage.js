import DeviceStorage from 'react-device-storage';

let _instance = null;
class BrowserStorage {
    constructor() {
        this.deviceStorage = new DeviceStorage({
            cookieFallback: true,
            cookie: {
                secure: true
            }
        });
    }

    static getInstance() {
        if (_instance === null) {
            _instance = new BrowserStorage();
        }
        return _instance;
    }

    getUserSession() {
        const session = this.getSession('tpip_user_session');
        return session;
    }

    getArtifactSession() {
        const session = this.getSession('tpip_artifact_session');
        return session;
    }

    setUserSession(session) {
        this.addToSession('tpip_user_session', session);
    }

    setArtifactSession(session) {
        this.addToSession('tpip_artifact_session', session);
    }

    getLoggedUser() {
        const session = this.getUserSession();
        if (session == null) return null;

        return session.loggedUser;
    }

    getArtifacts() {
        const session = this.getArtifactSession();
        if (session == null) return null;

        return session;
    }

    getFromStorage(key) {
        const { deviceStorage } = this;
        const localData = deviceStorage.localStorage().read(key);
        const sessionData = deviceStorage.sessionStorage().read(key);
        return localData ? localData : sessionData;
    }

    addToStorage(key, value) {
        const { deviceStorage } = this;
        deviceStorage.localStorage().save(key, value);
        deviceStorage.sessionStorage().save(key, value);
    }

    getSession(key) {
        const { deviceStorage } = this;
        return deviceStorage.sessionStorage().read(key);
    }

    addToSession(key, value) {
        const { deviceStorage } = this;
        deviceStorage.sessionStorage().save(key, value);
    }
}

export default BrowserStorage;

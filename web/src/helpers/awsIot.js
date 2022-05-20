import awsIot from 'aws-iot-device-sdk';
import { Modal } from 'antd';
import _ from 'lodash';
// import _ from 'lodash';
import BrowserStorage from '../middlewares/storage';
import ConnectApi from '../middlewares/connectApi';
const { detect } = require('detect-browser');
const browser = detect();

export default class AwsIotSingleton {
    //singleton socket instance
    static socket = null;
    //object structure = { topic: 'subscibed-topic', callback: reference-to-callback}
    static callbackEvents = [];

    //returns the iot device reference
    static initializeIotDevice() {
        //only need it come once
        //AwsIotSingleton.forceUserRefresh = _.once(AwsIotSingleton.forceUserRefresh);
        // AwsIotSingleton.attemptRenewSessionToken = _.throttle(
        //   AwsIotSingleton.attemptRenewSessionToken,
        //   1000 * 60 * 30 // 30 minutes
        // );
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        const { region, keyId, key, sessionToken, iotEndpoint } = loggedUser.iotDetails;
        if (!AwsIotSingleton.socket) {
            const iotDevice = awsIot.device({
                region: region,
                protocol: 'wss',
                accessKeyId: keyId,
                secretKey: key,
                sessionToken: sessionToken,
                port: 443,
                host: iotEndpoint,
                debug: false,
                keepalive: browser && browser.name === 'safari' ? 50 : 5, // its always safari. socket disconnects when idle in safari if timeout is not increased
                maximumReconnectTimeMs: 5000 //in milliseconds
            });
            iotDevice.on('connect', function() {
                console.log('iot connected');
                AwsIotSingleton.runAllReconnectHandlers();
            });
            iotDevice.on('reconnect', () => {
                AwsIotSingleton.attemptRenewSessionToken();
            });
            iotDevice.on('offline', () => {
                console.log('iot is offline');
                //AwsIotSingleton.forceUserRefresh();
            });

            iotDevice.on('message', (topic, payload) => {
                // console.log('message', topic, payload.toString());
                AwsIotSingleton.messageRecevied(topic, payload);
            });

            AwsIotSingleton.socket = iotDevice;
            return;
        }
        console.log('socket already initialized');
    }

    static forceUserRefresh = () => {
        Modal.destroyAll();
        const { info } = Modal;
        info({
            title: 'Lost Connection!',
            content: 'Lost connection to the server. Click OK to refresh.',
            onOk() {
                window.location.reload();
            }
        });
    };

    static messageRecevied(topic, payload) {
        const callbackEvents = AwsIotSingleton.callbackEvents.filter(callback => callback.topic === topic);
        // console.log(callbackEvents);
        callbackEvents.forEach(callbackEvent => {
            if (callbackEvent) {
                callbackEvent.callback({ payload: JSON.parse(payload), topic });
                return;
            }
        });
        if (callbackEvents.length <= 0) return;

        // console.log(`callback not registered for topic ${topic}`);
    }

    static async getPayloadFromSocket(topic, callback, reconnectHandler) {
        AwsIotSingleton.initializeIotDevice();
        AwsIotSingleton.socket.subscribe(topic);
        AwsIotSingleton.callbackEvents.push({
            topic,
            callback,
            reconnectHandler
        });
    }

    static async unsubscribeSocket(userTopic) {
        if (AwsIotSingleton.socket) {
            AwsIotSingleton.socket.unsubscribe(userTopic);
            AwsIotSingleton.callbackEvents = AwsIotSingleton.callbackEvents.filter(
                callback => callback.topic !== userTopic
            );
        }
    }

    static async endConnection() {
        console.log('disconnecting socket');
        if (!AwsIotSingleton.socket) return;
        AwsIotSingleton.socket.end();
        AwsIotSingleton.socket = null;
        AwsIotSingleton.callbackEvents = [];
        console.log('socket disconnected');
    }

    static async publishPayloadWithinSocket(userTopic, message) {
        AwsIotSingleton.initializeIotDevice();
        AwsIotSingleton.socket.publish(userTopic, JSON.stringify(message), 0);
    }

    static async attemptRenewSessionToken() {
        const loggedUser = BrowserStorage.getInstance().getLoggedUser();
        const createdTime = _.get(loggedUser, 'iotDetails.createdTime');
        if (!createdTime) return;
        let thirutyMinutes = 1000 * 60 * 30;
        if (new Date().getTime() - createdTime < thirutyMinutes) return;

        // console.log(
        //   `iot token does not need renewal yet. diff : ${new Date().getTime() - createdTime}`
        // );
        // console.log('renewing aws iot session token');
        let newSessionToken = await ConnectApi.renewAwsSessionToken();
        newSessionToken = newSessionToken.data.content;
        let { secretAccessKey, accessKeyId, sessionToken } = newSessionToken;
        let userSession = BrowserStorage.getInstance().getUserSession();
        userSession.loggedUser.iotDetails.sessionToken = newSessionToken.sessionToken;
        userSession.loggedUser.iotDetails.createdTime = newSessionToken.createdTime;
        userSession.loggedUser.iotDetails.keyId = accessKeyId;
        userSession.loggedUser.iotDetails.key = secretAccessKey;
        BrowserStorage.getInstance().setUserSession(userSession);
        AwsIotSingleton.updateAwsIotCred(accessKeyId, secretAccessKey, sessionToken, null);
    }

    static updateAwsIotCred(accessKeyId, secretKey, sessionToken, expiration) {
        // console.log('updating aws iot');
        AwsIotSingleton.socket.updateWebSocketCredentials(accessKeyId, secretKey, sessionToken, expiration);
    }

    static runAllReconnectHandlers() {
        AwsIotSingleton.callbackEvents.forEach(tp => {
            if (tp.reconnectHandler) {
                tp.reconnectHandler();
                // console.log(`running reconnect handler for ${tp.topic}`);
            }
        });
    }
}

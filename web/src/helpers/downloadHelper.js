import config from 'appConfig';
import { saveAs } from 'file-saver';

import NotificationHelper from './NotificationHelper';
import connectApi from '../middlewares/connectApi';

export const readFile = async data => {
    const { url, file, bucket } = data;

    return new Promise(async (resolve, reject) => {
        let fileSource = null;
        if (url) {
            let _url = url.trim();
            _url = _url.replace(/ /g, '_');
            const bucketName = bucket;

            const { data } = await connectApi.getDownloadUrl({ bucketName, filePath: `${_url}` });
            const resource = await connectApi.getResource(data.content.url);
            fileSource = resource.data;
        }

        if (file) fileSource = file;

        if (!fileSource) reject('No file source found');

        const reader = new FileReader();
        reader.onerror = function onerror(ev) {
            reject(ev.target.error);
        };
        reader.onload = function onload(ev) {
            resolve(ev.target.result);
        };

        fileSource && reader.readAsArrayBuffer(fileSource);
    });
};

export const downloadFile = async (data, errorSystemMessage, downloadedCallBack) => {
    const { fileName, location, bucket } = data;

    try {
        const file = await readFile({ url: `${location}${fileName}`, bucket });
        saveAs(new Blob([file], { type: 'application/octet-stream' }), fileName);
        if (downloadedCallBack) {
            downloadedCallBack();
        }
    } catch (error) {
        if (errorSystemMessage) {
            NotificationHelper.getInstance().error(errorSystemMessage);
        }
    }
};

export const directDownloadFile = async (file, fileName) => {

    try {
        saveAs(new Blob([file], { type: 'application/octet-stream' }), fileName);
    } catch (error) {
    }
};

export const getSignedURL = async ({ url, bucket }) => {
    return new Promise(async (resolve, reject) => {
        let _url = url.trim();
        _url = _url.replace(/ /g, '_');
        const bucketName = bucket;

        try {
            const { data } = await connectApi.getDownloadUrl({ bucketName, filePath: `${_url}` });
            resolve({ status: 'success', data });
        } catch (e) {
            reject({ status: 'error' });
        }
    });
};

export const checkFileAvailability = async param => {
    const { url, bucketNameProp } = param;
    const bucketName = bucketNameProp;
    try {
        const { data } = await connectApi.checkFileAvailability({ bucketName, dirName: url });

        if (data && data.result) return true;
        return false;
    } catch (error) {
        return false;
    }
};

export const convertFile = async param => {
    const { url, bucketNameProp } = param;
    const bucketName = bucketNameProp;

    try {
        const fileName = url.split(`/`).pop();
        const s3pathurl = url.split(`/${fileName}`)[0];

        const { data } = await connectApi.convertDocumentRequest({
            tenant: 'LGIM',
            s3bucketurl: bucketName,
            s3pathurl,
            fileName
        });

        if (data && data.result) {
            const exist = await checkFileAvailability({ url, bucketNameProp: bucketName });
            if (exist) return url;
        }
        return false;
    } catch (error) {
        return false;
    }
};

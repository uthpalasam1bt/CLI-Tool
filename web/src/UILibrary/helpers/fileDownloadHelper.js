import React, { Component } from 'react';
import { saveAs } from 'file-saver';

export const readFile = async data => {
    const { url, bucketNameProp, api } = data;

    return new Promise(async (resolve, reject) => {
        let fileSource = null;
        if (url) {
            let _url = url.trim();
            _url = _url.replace(/ /g, '_');
            const bucketName = bucketNameProp;

            const { data } = await api.getDownloadUrl({ bucketName, filePath: `${_url}` });
            const resource = await api.getResource(data.content.url);
            fileSource = resource.data;
        }

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

export const downloadFile = async (data) => {
    try {
        const { url } = data;
        if (!url) return;
        const chunks = url.split('/');
        let fileName = chunks[chunks.length - 1];
        fileName = fileName ? fileName.trim().replace(/ /g, '__') : fileName;
        const file = await readFile(data);
        saveAs(new Blob([file], { type: 'application/octet-stream' }), fileName);

    } catch (error) {
    }
}
var hash = require('object-hash');

const SYSTEM = 'TPIP_NAVIGATOR';
const FOR = 'EXCUBED_UNITED_KINGDOM';
const FROM = 'AUXENTA_PRIVATE_LIMITED_COLOMBO';

const firstHash1 = hash(SYSTEM);
const firstHash2 = hash(FOR);
const firstHash3 = hash(FROM);

const secondHash1 = hash(firstHash1 + firstHash2 + firstHash3);

export const encryptUrl = email => {
    const hashAll = hash(secondHash1);
    return hashAll;
};

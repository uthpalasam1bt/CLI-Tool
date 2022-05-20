import BrowserStorage from '../middlewares/storage';

export const getSystemArtifacts = () => {
    const systemArtifacts = BrowserStorage.getInstance().getArtifacts();
    return (systemArtifacts && systemArtifacts.artifacts) || {};
};

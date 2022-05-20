export const convertArtifacts = (rawString, artifacts = {}) => {
    const transformedString = rawString.replace(
        /\$\w+\$/g,
        placeholder => artifacts[placeholder.replace(/\$/g, '')] || placeholder
    );
    return transformedString;
};

export function getCloudinaryConfig() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME
    const apiKey = process.env.CLOUDINARY_API_KEY
    const apiSecret = process.env.CLOUDINARY_API_SECRET

    if (!cloudName || !apiKey || !apiSecret) {
        return null;
    }

    return {
        cloudName,
        apiKey,
        apiSecret
    }
}


export function isCloudinaryConfigured() {
    const config = getCloudinaryConfig();
    return config !== null;
}

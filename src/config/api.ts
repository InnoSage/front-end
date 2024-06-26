export function getApiUrl()  {
    const url = process.env.API_URL as string;
    if (url.endsWith("/")) {
        return url.slice(0, -1);
    }
    return url;
}

export function getAiApiUrl() {
    const url = process.env.AI_API_URL as string;
    if (url.endsWith("/")) {
        return url.slice(0, -1);
    }
    return url;
}

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

export function isEmailFormat(s: string) {
    return EMAIL_REGEX.test(s);
}

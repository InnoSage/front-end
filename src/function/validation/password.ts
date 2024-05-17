const PASSWORD_REGEX = /[^a-zA-Z\\d`~!@#$%^&*()-_=+]/;

export default function isValidPassword(s: string) {
    const has = PASSWORD_REGEX.exec(s);

    if (!has) {
        return true;
    }

    return has.length <= 0;
}

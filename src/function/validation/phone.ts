const PHONE_NUMBER_REGEX = /^(01[016789])-?[0-9]{3,4}-?[0-9]{4}$/;

export default function isPhoneNumber(s: string) {
    return PHONE_NUMBER_REGEX.test(s);
}

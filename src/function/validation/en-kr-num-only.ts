const EN_KR_NUM_REGEX = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9_]/;

export default function isOnlyEnKrNum(s: string) {
    const has = EN_KR_NUM_REGEX.exec(s);

    if (!has) {
        return true;
    }

    return has.length <= 0;
}

import { cookies } from "next/headers";

export default function getCookie(key: string) {
    const store = cookies();
    const target = store.get(key);

    return store.get(key)?.value;
}

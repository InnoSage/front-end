import { createHash } from "crypto";

export function generateColor(seed: string) {
    const hash = createHash("md5").update(seed)
        .digest("hex");
    return "#" + hash.slice(0, 6);
}

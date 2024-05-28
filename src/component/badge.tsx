import { Badge } from "@mantine/core";
import { generateColor } from "@/function/random";

type DotColoredBadgeProps = {
    value: string
};

export function DotColoredBadge({ value }: Readonly<DotColoredBadgeProps>) {
    const color = generateColor(value);

    return <Badge variant="dot" radius="sm" mx="0.1rem" color={ color } tt="none">{value}</Badge>;
}

export function OutlineColoredBadge({ value }: Readonly<DotColoredBadgeProps>) {
    const color = generateColor(value);

    return <Badge variant="outline" radius="sm" mx="0.1rem" color={ color } tt="none">{value}</Badge>;
}

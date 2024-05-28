"use server";

import { addAttribute as apiAddAttribute, AddAttributeProps } from "@/function/api/attribute";
import { addOption } from "@/function/api/option";

export async function addAttribute(sheetId: number, token: string, props: AddAttributeProps) {
    const result = await apiAddAttribute(sheetId, token, props);
    if (!result.success) return;

    const newAttribute = result.value;

    if (props.dataType == "SELECT" || props.dataType == "MULTISELECT") {
        const { options } = (props.data as { options: string[] });

        const optionResults = await Promise.all(options.map(async (o) => {
            const res = await addOption(sheetId, result.value.attributeId, o, token);
            if (res.success) return { ...res.value, name: o };
        }).filter((o) => o));

        const createdOptions = optionResults.map((o) =>
            o
                ? ({
                    optionId: o.optionId,
                    optionName: o.name
                })
                : null)
            .filter((o) => o);
        newAttribute.data = { options: createdOptions };
    }

    return newAttribute;
}

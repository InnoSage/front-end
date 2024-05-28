"use client";

import { Grid } from "@mantine/core";
import Notes from "@/component/note/notes";
import { AttributeType } from "@/function/table/type";
import Attributes from "@/component/note/attributes";

type NotePageBodyProps = {
    dealId: number,
    attributes: {
        attributeId: number,
        attributeName: string,
        dataType: AttributeType,
        value: unknown
    }[],
    notes: {
        noteId: number,
        title: string
    }[]
};

export default function NotePageBody({ dealId, attributes, notes }: Readonly<NotePageBodyProps>) {
    return <Grid h="92vh" align="stretch">
        <Grid.Col h="92vh" span={ { xs: 12, md: 8 } }>
            <Notes dealId={ dealId } notes={ notes } />
        </Grid.Col>
        <Grid.Col h="92vh" span={ { xs: 12, md: 4 } }>
            <Attributes attributes={ attributes } />
        </Grid.Col>
    </Grid>;
}

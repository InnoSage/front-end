import { notFound } from "next/navigation";
import Table from "@/component/view/table";
import { sheetToTable } from "@/function/table/deal";
import { Container } from "@mantine/core";
import ViewHeader from "@/component/view/header";
import TableControl from "@/component/view/table-control";
import { Sheet } from "@/function/table/type";

type DealIdPageProps = {
    params: {
        sheetId: string
    }
};

async function fetchSheet(sheetId: number): Promise<Sheet> {
    // return dummy sheet
    // TODO: fetch deal view data from real API

    return {
        sheetName: "시트 이름",
        attributes: [
            {
                attributeId: 1,
                attributeName: "TEXT 속성",
                dataType: "TEXT"
            },
            {
                attributeId: 2,
                attributeName: "NUMBER 속성",
                dataType: "NUMBER"
            },
            {
                attributeId: 3,
                attributeName: "SELECT 속성",
                dataType: "SELECT",
                options: [
                    { optionId: 1, value: "옵션 1" },
                    { optionId: 2, value: "옵션 2" },
                    { optionId: 3, value: "옵션 3" }
                ]
            },
            {
                attributeId: 4,
                attributeName: "MULTISELECT 속성",
                dataType: "MULTISELECT",
                options: [
                    { optionId: 1, value: "옵션 1" },
                    { optionId: 2, value: "옵션 2" },
                    { optionId: 3, value: "옵션 3" }
                ]
            },
            {
                attributeId: 5,
                attributeName: "CURRENCY 속성",
                dataType: "CURRENCY",
                currency: "KRW"
            },
            {
                attributeId: 6,
                attributeName: "DATE 속성",
                dataType: "DATE"
            },
            {
                attributeId: 7,
                attributeName: "CHECKBOX 속성",
                dataType: "CHECKBOX"
            },
            {
                attributeId: 8,
                attributeName: "USER 속성",
                dataType: "USER",
                users: [
                    { userEmail: "some@example.com", userName: "사용자1" },
                    { userEmail: "email@example.com", username: "사용자2" }
                ]
            }
        ],
        sort: [
            { targetAttributeId: 2, order: "ASC" },
            { targetAttributeId: 5, order: "DESC" }
        ],
        filter: [
            { targetAttributeId: 2, operation: "BT", value: 1 },
            { targetAttributeId: 1, operation: "CONTAINS", value: "텍스트" }
        ],
        companies: [
            { id: 1, name: "회사 1" },
            { id: 2, name: "회사 2" },
            { id: 3, name: "회사 3" },
            { id: 4, name: "회사 4" },
            { id: 5, name: "회사 5" }
        ],
        deals: [
            {
                id: 1,
                companyId: 1,
                values: [
                    { attributeId: 1, value: "텍스트 1" },
                    { attributeId: 2, value: 1234 },
                    { attributeId: 3, value: 1 },
                    { attributeId: 4, value: [ 1, 2 ] },
                    { attributeId: 5, value: 12345 },
                    { attributeId: 6, value: 1715133032 },
                    { attributeId: 7, value: true },
                    { attributeId: 8, value: "some@example.com" }
                ]
            },
            {
                id: 2,
                companyId: 2,
                values: [
                    { attributeId: 1, value: "텍스트 2" },
                    { attributeId: 2, value: 12345 },
                    { attributeId: 3, value: 2 },
                    { attributeId: 4, value: [ 1, 2, 3 ] },
                    { attributeId: 5, value: 123456 },
                    { attributeId: 6, value: 1715134032 },
                    { attributeId: 7, value: false },
                    { attributeId: 8, value: "some@example.com" }
                ]
            },
            {
                id: 3,
                companyId: 3,
                values: [
                    { attributeId: 1, value: "텍스트 3" },
                    { attributeId: 2, value: 12349 },
                    { attributeId: 3, value: 3 },
                    { attributeId: 4, value: [ 1, 3 ] },
                    { attributeId: 5, value: 1345 },
                    { attributeId: 6, value: 1715133992 },
                    { attributeId: 7, value: true },
                    { attributeId: 8, value: "email@example.com" }
                ]
            },
            {
                id: 4,
                companyId: 2,
                values: [
                    { attributeId: 1, value: "TEXT 1" },
                    { attributeId: 2, value: 11234 },
                    { attributeId: 3, value: 1 },
                    { attributeId: 4, value: [ 1 ] },
                    { attributeId: 5, value: 112345 },
                    { attributeId: 6, value: 1715033032 },
                    { attributeId: 7, value: true },
                    { attributeId: 8, value: "email@example.com" }
                ]
            }
        ]
    } as Sheet;
}

export default async function SheetIdPage({ params }: Readonly<DealIdPageProps>) {
    const sheetId = Number(params.sheetId);

    if (isNaN(sheetId)) {
        return notFound();
    }

    const sheet = await fetchSheet(sheetId);
    const table = sheetToTable(sheet);

    return <>
        <Container h="5vh" my="xs" fluid>
            <ViewHeader id={ sheetId } name={ sheet.sheetName } />
        </Container>

        <Container h="5vh" mb="xs" fluid>
            <TableControl />
        </Container>

        <div style={ { height: "88vh", width: "100%" } }>
            <Table
                attributes={ table.attributes }
                data={ table.data }
            />
        </div>
    </>;
}

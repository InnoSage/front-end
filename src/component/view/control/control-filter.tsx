import { Button, ComboboxItem, Flex, Modal, OptionsFilter, Select, TextInput } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import { useSheetStore } from "@/store/sheet";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { getAttributeName } from "@/function/table/type";
import { FilterConditionName, FilterConditionNameMap } from "@/component/view/control/filter/condition";
import { useUserStore } from "@/store/user";
import addFilter from "@/component/view/control/filter/filter-add.action";


export default function ControlFilter() {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const [ opened, { open, close } ] = useDisclosure(false);
    const [ rawSelectedTarget, setRawSelectedTarget ] = useState<string>("");
    const [ rawSelectedCondition, setRawSelectedCondition ] = useState("");
    const [ rawValue, setRawValue ] = useState("");

    const getCurrentSelectedFilterTarget = () => {
        if (rawSelectedTarget == "" || rawSelectedTarget == "-1") {
            return "COMPANY";
        } else {
            return sheet.attributes.find((f) => f.id == Number(rawSelectedTarget))?.dataType ?? "COMPANY";
        }
    };

    const getCurrentCondition = () => FilterConditionNameMap[getCurrentSelectedFilterTarget()];


    const filterTargetSelectFilter: OptionsFilter = ({ options, search }) => {
        return options.filter((o) => (o as ComboboxItem).label.includes(search));
    };

    const onFilterAdd = async () => {
        const result = await addFilter(
            sheet.sheetId, Number(rawSelectedTarget), rawSelectedCondition, rawValue, user.token
        );

        if (result != -1) {
            sheet.addFilter({
                id: result,
                targetAttributeId: Number(rawSelectedTarget),
                filterType: rawSelectedCondition,
                keyword: rawValue
            });
        }

        close();
    };

    return <>
        <Button variant="filled" mr="xs" leftSection={ <IconFilter size={ 14 } /> } onClick={ open }>필터 추가</Button>
        <Modal opened={ opened } onClose={ close } title="필터 추가" centered>
            <Select searchable label="필터 타겟" placeholder="필터링할 속성을 선택해 주세요."
                filter={ filterTargetSelectFilter }
                data={ [
                    { label: "회사명", value: "-1" },
                    ...sheet.attributes.map((a) => ({ label: `${a.name} [${getAttributeName(a.dataType)}]`, value: a.id.toString() }))
                ] }
                onChange={ (value, option) => setRawSelectedTarget(option?.value ?? "") }
            />

            <Select my="xs" label="필터 조건" placeholder="필터링 조건을 선택해 주세요" disabled={ rawSelectedTarget == "" }
                data={
                    Object.keys(getCurrentCondition()).map((k) =>
                        ({ label: `${getCurrentCondition()[k as keyof typeof FilterConditionName]} [${k}]`, value: k }))
                }
                onChange={ (value, option) => setRawSelectedCondition(option?.value ?? "") }
            />

            <TextInput label="필터 조건 값" placeholder="필터링할 값을 입력해 주세요" disabled={ rawSelectedCondition == "" }
                onChange={ (e) => setRawValue(e.target.value) }
                value={ rawValue }
            />

            <Flex justify="flex-end" mt="xs">
                <Button variant="outline" color="gray" mr="xs" onClick={ close }>취소</Button>
                <Button
                    onClick={ onFilterAdd }
                    disabled={ rawSelectedTarget == "" || rawSelectedCondition == "" || rawValue == "" }
                >
                    필터 추가
                </Button>
            </Flex>

        </Modal>
    </>;

}

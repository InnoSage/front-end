import { Button, Combobox, Divider, Flex, Modal, TextInput, useCombobox } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useSheetStore } from "@/store/sheet";
import { newDeal as addNewDeal, newDealWithNewCompany } from "@/component/view/control/new-deal.action";
import { useUserStore } from "@/store/user";

type ControlDealProps = {
    companies: string[]
};

export default function ControlDeal({ companies }: Readonly<ControlDealProps>) {
    const sheet = useSheetStore((s) => s);
    const user = useUserStore((s) => s);
    const [ dealOpened, { open, close } ] = useDisclosure(false);
    const combobox = useCombobox();
    const [ inputCompanyName, setInputCompanyName ] = useState("");
    const [ currentSelected, setCurrentSelected ] = useState("");

    const filtered = sheet.companies?.filter((c) => c.name.toLowerCase()
        .includes(inputCompanyName.toLowerCase()));

    const isNewCompanyAddable = () => {
        return !sheet.companies.find((c) => c.name == inputCompanyName);
    };

    const onSubmit = (e: string) => {
        setCurrentSelected(e);

        if (e != "NEW") {
            setInputCompanyName(sheet.companies.find((c) => c.id == Number(e))?.name as string);
        }

        combobox.closeDropdown();
    };

    const newDeal = async () => {
        if (currentSelected == "NEW" && !sheet.companies.find((c) => c.name == inputCompanyName)) {
            const result = await newDealWithNewCompany(sheet.sheetId, inputCompanyName, user.token);

            if (result.deal != -1 && result.company != -1) {
                sheet.addCompany({
                    id: result.company,
                    name: inputCompanyName
                });
                sheet.addDeal({
                    id: result.deal,
                    companyId: result.company,
                    values: []
                });
            }
        } else if (currentSelected == "NEW" && sheet.companies.find((c) => c.name == inputCompanyName)) {
            const companyId = sheet.companies.find((c) => c.name == inputCompanyName)?.id as number;
            const result = await addNewDeal(sheet.sheetId, companyId, user.token);
            if (result != -1) {
                sheet.addDeal({
                    id: result,
                    companyId: Number(currentSelected),
                    values: []
                });
            }
        } else {
            const result = await addNewDeal(sheet.sheetId, Number(currentSelected), user.token);
            if (result != -1) {
                sheet.addDeal({
                    id: result,
                    companyId: Number(currentSelected),
                    values: []
                });
            }
        }

        combobox.closeDropdown();
        close();
    };

    return <>
        <Modal opened={ dealOpened } onClose={ close } title="거래 추가" centered>
            <Combobox store={ combobox } onOptionSubmit={ onSubmit }>
                <Combobox.Target>
                    <TextInput
                        label="회사" placeholder="회사명을 입력해주세요."
                        rightSection={ <IconSearch size={ 16 } /> }
                        value={ inputCompanyName } onChange={ (e) => {
                            combobox.openDropdown();
                            setInputCompanyName(e.target.value);
                            combobox.updateSelectedOptionIndex();
                        } }
                        onClick={ () => combobox.openDropdown() } onFocus={ () => combobox.openDropdown() }
                        onBlur={ () => combobox.closeDropdown() }
                    />
                </Combobox.Target>
                <Combobox.Dropdown>
                    <Combobox.Options>
                        {
                            !filtered || filtered.length < 1
                                ? <Combobox.Empty>
                                    검색 결과가 없습니다.
                                </Combobox.Empty>
                                : filtered.map((company) =>
                                    <Combobox.Option
                                        pl="xl"
                                        value={ String(company.id) } key={ company.id }
                                    >
                                        {company.name}
                                    </Combobox.Option>)
                        }
                        <Divider my="xs" />
                        <Combobox.Option value="NEW" key="NEW" disabled={
                            !isNewCompanyAddable() || inputCompanyName.replaceAll(" ", "").length == 0
                        }
                        >
                            <Flex h="100%" w="100%" align="center">
                                <IconPlus size={ 14 } />&nbsp; "{inputCompanyName}" 추가하기
                            </Flex>
                        </Combobox.Option>
                        {
                            isNewCompanyAddable()
                                ? (
                                    inputCompanyName.replaceAll(" ", "").length == 0
                                        ? <Combobox.Option pl="xl" c="red" disabled value="NEW" key="NEW">
                                            [회사명은 1자 이상이어야 합니다.]
                                        </Combobox.Option>
                                        : null
                                )
                                : <Combobox.Option pl="xl" c="red" disabled value="NEW" key="NEW">
                                    [이미 존재하는 회사입니다]
                                </Combobox.Option>
                        }
                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>

            <Flex justify="flex-end">
                <Button size="sm" mt="sm" variant="filled" leftSection={ <IconPlus size={ 14 } /> }
                    onClick={ newDeal }
                    disabled={ currentSelected == "" }
                >
                    추가
                </Button>
            </Flex>

        </Modal>
        <Button variant="filled" mr="xs" leftSection={ <IconPlus size={ 14 } /> }
            onClick={ open }
        >
            거래 추가
        </Button>
    </>;
}

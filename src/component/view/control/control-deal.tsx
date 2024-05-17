import { Button, Flex, Kbd, Modal, Select } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { KeyboardEvent, useState } from "react";

type ControlDealProps = {
    companies: string[]
};

export default function ControlDeal({ companies }: Readonly<ControlDealProps>) {
    const [ dealOpened, { open, close } ] = useDisclosure(false);
    const [ inputCompanyName, setInputCompanyName ] = useState("");

    const addNewDeal = () => {
        if (companies.find((c) => c === inputCompanyName)) {
            // when exist company name
        } else {
            // when new company name
        }
        close();
    };

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addNewDeal();
        }
    };

    return <>
        <Modal opened={ dealOpened } onClose={ close } title="거래 추가" centered>
            <Select
                label="회사"
                data={ companies }
                onSearchChange={ setInputCompanyName } searchValue={ inputCompanyName }
                rightSection={ <IconPlus size={ 14 } /> }
                onKeyDown={ onKeyDown }
                clearable searchable nothingFoundMessage={
                    <div dir="ltr">
                        <Kbd>Enter ⏎</Kbd> 키를 눌러 "{inputCompanyName}" 추가하기
                    </div>
                }
            />

            <Flex justify="flex-end">
                <Button size="sm" mt="sm" variant="filled" leftSection={ <IconPlus size={ 14 } /> }
                    onClick={ addNewDeal }
                >추가</Button>
            </Flex>

        </Modal>
        <Button variant="filled" mr="xs" leftSection={ <IconPlus size={ 14 } /> } onClick={ open }>거래 추가</Button>
    </>;
}

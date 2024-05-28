"use client";

import {
    ActionIcon,
    Button,
    Center,
    Divider,
    Flex,
    Modal,
    Table,
    Text,
    Textarea,
    TextInput,
    Title
} from "@mantine/core";
import { IconNote, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import newNote from "@/component/note/new-note.action";
import { useUserStore } from "@/store/user";
import getNote from "@/component/note/get-note.action";
import deleteNote from "@/component/note/delete-note.action";

type NotesProps = {
    dealId: number,
    notes: {
        noteId: number,
        title: string
    }[]
};

export default function Notes({ dealId, notes }: Readonly<NotesProps>) {
    const [ noteList, setNoteList ] = useState(notes);
    const userStore = useUserStore((s) => s);
    const [ opened, { close, open } ] = useDisclosure(false);
    const [ currentOpenedNote, setCurrentOpenedNote ] = useState(-1);
    const [ currentOpenedNoteContents, setCurrentOpenedNoteContents ] = useState("");
    const [ deleteOpened, deleteModalControl ] = useDisclosure(false);
    const [ currentDeleteNote, setCurrentDeleteNote ] = useState(0);
    const [ newNoteOpened, newNoteModalControl ] = useDisclosure(false);
    const [ newNoteTitle, setNewNoteTitle ] = useState("");
    const [ newNoteContent, setNewNoteContent ] = useState("");

    const onNewNoteClick = async () => {
        const result = await newNote(dealId, newNoteTitle, newNoteContent, userStore.token);
        if (result == -1) {
            close();
            newNoteModalControl.close();
        } else {
            close();
            setNoteList([ ...noteList, { noteId: result, title: newNoteTitle } ]);
            newNoteModalControl.close();
            setNewNoteTitle("");
            setNewNoteContent("");
        }
    };

    const openNote = async (noteId: number) => {
        setCurrentOpenedNote(noteId);
        const res = await getNote(dealId, noteId, userStore.token);
        if (!res) setCurrentOpenedNoteContents("노트를 불러오는 중 오류가 발생했습니다.");
        else setCurrentOpenedNoteContents(res);
        open();
    };

    const onDeleteClick = async () => {
        const result = await deleteNote(dealId, currentDeleteNote, userStore.token);

        if (result) {
            setNoteList(noteList.filter((n) => n.noteId != currentDeleteNote));
        }
        deleteModalControl.close();
        close();
    };

    return <>
        <Flex align="center" justify="space-between" mx="xs">
            <Title order={ 3 }>노트</Title>
            <Button size="xs" leftSection={ <IconNote size={ 14 } /> } onClick={ newNoteModalControl.open }> 새 노트 작성</Button>
        </Flex>
        <Divider my="xs" />

        {
            !noteList || noteList.length < 1
                ? <Center><Text>노트가 없습니다.</Text></Center>
                : <Table.ScrollContainer minWidth="100px" h="80vh">
                    <Table highlightOnHover={ true }>
                        <Table.Tbody>
                            {
                                noteList.map((note, i) =>
                                    <Table.Tr key={ i }>
                                        <Table.Td w="90%" onClick={ () => openNote(note.noteId) }>
                                            {note.title}
                                        </Table.Td>
                                    </Table.Tr>)
                            }
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
        }

        <Modal
            centered size="70%" withCloseButton={ false }
            opened={ opened } onClose={ close }
        >
            <Flex align="center" justify="space-between">
                <Title order={ 2 }>
                    {
                        !noteList || noteList.length == 0 || currentOpenedNote == -1
                            ? ""
                            : noteList.find((n) => n.noteId == currentOpenedNote)?.title
                    }
                </Title>
                <ActionIcon variant="outline" color="red"
                    onClick={ () => {
                        setCurrentDeleteNote(currentOpenedNote);
                        deleteModalControl.open();
                    } }
                >
                    <IconTrash size={ 18 } />
                </ActionIcon>
            </Flex>

            <Divider my="xs" />
            <Text h="70vh">
                {currentOpenedNoteContents}
            </Text>
        </Modal>

        <Modal opened={ deleteOpened } onClose={ deleteModalControl.close } centered title="노트 삭제">
            정말 "{
                !noteList || noteList.length == 0 || currentOpenedNote == -1
                    ? ""
                    : noteList.find((n) => n.noteId == currentDeleteNote)?.title
            }" 노트를 삭제하시겠습니까?
            <Flex justify="flex-end" mt="xs">
                <Button mr="xs" variant="outline" color="gray" onClick={ deleteModalControl.close }>취소</Button>
                <Button color="red" onClick={ onDeleteClick }>삭제</Button>
            </Flex>
        </Modal>

        <Modal
            title="새 노트 작성" centered size="70%"
            opened={ newNoteOpened } onClose={ newNoteModalControl.close }
        >

            <TextInput
                variant="unstyled" size="xl" placeholder="제목을 입력해주세요." mb="xs"
                value={ newNoteTitle }
                onChange={ (e) => setNewNoteTitle(e.currentTarget.value) }
            />

            <Textarea
                variant="unstyled" placeholder="내용을 입력해주세요." rows={ 20 }
                value={ newNoteContent }
                onChange={ (e) => setNewNoteContent(e.currentTarget.value) }
            />

            <Flex justify="flex-end" mt="xs">
                <Button leftSection={ <IconNote size={ 16 } /> } onClick={ onNewNoteClick }>작성</Button>
            </Flex>
        </Modal>
    </>;
}

"use client";

import { ChangeEventHandler, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Anchor, Button, Checkbox, Group, Paper, PasswordInput, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { isEmailFormat } from "@/function/validation/email";
import { doLoginAction, DoLoginActionState } from "@/component/login/action";

type InputState = {
    isValid: boolean,
    isEmpty: boolean
};

const inputInitialState: InputState = {
    isValid: true,
    isEmpty: true
};

const formInitialState: DoLoginActionState = {
    isFirst: true,
    isValidUser: false
};

export default function LoginForm() {
    const router = useRouter();

    const [ emailState, setEmailState ] = useState(inputInitialState);
    const [ passwordState, setPasswordState ] = useState(inputInitialState);

    // server action hook.
    // see next.js server action docs: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#server-side-validation-and-error-handling
    const [ formState, formAction ] = useFormState(doLoginAction, formInitialState);

    // forward to app page if user is valid
    if (formState.isValidUser) {
        router.push("/app");
    }

    // email input handler for email format validation
    const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentInput = e.target.value;
        setEmailState({ isValid: isEmailFormat(currentInput), isEmpty: currentInput.length == 0 });
    };

    // password input handler for password length validation
    const onPasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentInput = e.target.value;

        // temporally password length validation disabled. it should be 12
        setPasswordState({ isValid: currentInput.length > 1, isEmpty: currentInput.length == 0 });
    };

    const isButtonDisabled = () => !emailState.isValid || emailState.isEmpty
        || !passwordState.isValid || passwordState.isEmpty;

    return <Paper component="form" action={ formAction } withBorder p={ 30 } mt={ 30 } shadow="md" radius="md">

        <div style={ { height: "4.5rem" } }>
            <TextInput label="이메일" name="email" required
                onChange={ onEmailChange }
                error={ !emailState.isValid && !emailState.isEmpty ? "이메일 형식이 아닙니다." : null }
            />
        </div>

        <div style={ { height: "4.5rem" } }>
            <PasswordInput label="비밀번호" name="password" required mt="md"
                onChange={ onPasswordChange }
                error={ !passwordState.isValid && !passwordState.isEmpty ? "비밀번호는 12자 이상이어야 합니다." : null }
            />
        </div>

        <Group justify="space-between" mt="lg">
            <Checkbox label="자동 로그인" name="auto-login" />
            <Anchor component={ Link } size="sm" href="/password-reset">
                비밀번호를 잊으셨나요?
            </Anchor>
        </Group>

        <Group justify="center" mt="md" mb="xs" h={ "1em" }>
            <Text size="xs" c="red">{!formState.isFirst && !formState.isValidUser ? "이메일 혹은 비밀번호가 틀렸습니다." : null}</Text>
        </Group>

        <Button type="submit" fullWidth mt="xs" disabled={ isButtonDisabled() }>
            로그인
        </Button>

    </Paper>;
}

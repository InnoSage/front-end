"use client";

import { Button, Flex, Paper, TextInput, Text, PasswordInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import EmailVerify from "@/component/signup/email-verify";
import { useSignupStore } from "@/store/signup";
import isOnlyEnKrNum from "@/function/validation/en-kr-num-only";
import isPassword from "@/function/validation/password";
import { ChangeEvent, useState } from "react";
import isPhoneNumber from "@/function/validation/phone";
import signUp from "@/component/signup/signup.action";
import loginOnSuccess from "@/component/signup/login-on-success.action";


export default function SignUpForm() {
    const router = useRouter();

    const store = useSignupStore((s) => s);
    const [ isValidUsername, setIsValidUsername ] = useState(false);
    const [ isValidPassword, setIsValidPassword ] = useState(false);
    const [ pwAgain, setPwAgain ] = useState("");
    const [ isPwSame, setIsPwSame ] = useState(false);
    const [ isValidPhone, setIsValidPhone ] = useState(false);
    const [ isSignUpSent, setIsSignUpSent ] = useState(false);
    const [ isSignUpSuccess, setIsSignUpSuccess ] = useState(true);

    const onUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        store.setUsername(value);
        setIsValidUsername(
            isOnlyEnKrNum(value)
            && value.length >= 4
            && value.length <= 24
        );
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        store.setPassword(value);
        setIsValidPassword(
            isPassword(value)
            && value.length >= 12
            && value.length <= 48
        );
    };

    const onPwAgainChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPwAgain(value);
        setIsPwSame(store.password === value);
    };

    const onPhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        store.setPhoneNumber(value);
        setIsValidPhone(isPhoneNumber(value));
    };

    const onSignUpClick = async () => {
        setIsSignUpSent(true);
        const { email, username, password, phoneNumber } = store;
        const safePhone = phoneNumber.replaceAll("-", "");
        const result = await signUp(email, username, password, safePhone);

        if (result) {
            await loginOnSuccess(email, password);
        } else {
            setIsSignUpSuccess(false);
            setIsSignUpSent(false);
        }
    };

    if (store.isEmailVerified) {
        return <Paper withBorder p={ 30 } mt={ 30 } shadow="md" radius="md">
            <div style={ { height: "4.5rem" } }>
                <TextInput label="이메일" placeholder="이메일 주소를 입력해 주세요." required
                    value={ store.email } disabled
                />
            </div>
            <div style={ { height: "5.5rem" } }>
                <TextInput label="사용자명" placeholder="사용자명을 입력해 주세요." required
                    value={ store.username }
                    onChange={ onUsernameChange }
                    error={
                        store.username.length > 0 && !isValidUsername
                            ? "4~24자 / 한글, 영어, 숫자 및 언더바(_)만 사용 가능합니다."
                            : undefined
                    }
                />
            </div>
            <div style={ { height: "5.5rem" } }>
                <PasswordInput label="비밀번호" placeholder="비밀번호를 입력해 주세요." required type="password"
                    value={ store.password }
                    onChange={ onPasswordChange }
                    error={
                        store.password.length > 0 && !isValidPassword
                            ? "12~48자 / 영어, 숫자, 특수문자만 사용 가능합니다."
                            : undefined
                    }
                />
            </div>
            <div style={ { height: "5.5rem" } }>
                <PasswordInput label="비밀번호 확인" placeholder="비밀번호를 다시 입력해 주세요" required type="password"
                    value={ pwAgain }
                    onChange={ onPwAgainChange }
                    error={
                        pwAgain.length > 0 && !isPwSame
                            ? "비밀번호가 일치하지 않습니다."
                            : undefined
                    }
                />
            </div>
            <div style={ { height: "5.5rem" } }>
                <TextInput label="전화번호" placeholder="전화번호를 입력해 주세요." required
                    value={ store.phoneNumber }
                    onChange={ onPhoneNumberChange }
                    error={
                        store.phoneNumber.length > 0 && !isValidPhone
                            ? "잘못된 전화번호 형식입니다."
                            : undefined
                    }
                />
            </div>
            <Flex justify="flex-end" align="center">
                <Text size="xs" c="red" mr="xs">
                    {isSignUpSuccess ? undefined : "회원가입에 실패했습니다. 다시 시도해 주세요."}
                </Text>
                <Button
                    mt="xs" size="xs"
                    disabled={
                        !isValidUsername || !isValidPassword  || !isPwSame || !isValidPhone
                        || isSignUpSent
                    }
                    onClick={ onSignUpClick }
                >
                    회원가입
                </Button>
            </Flex>
        </Paper>;
    } else {
        return <Paper withBorder p={ 30 } mt={ 30 } shadow="md" radius="md">
            <EmailVerify />
        </Paper>;
    }
}

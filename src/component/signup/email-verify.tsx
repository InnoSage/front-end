import { Button, Flex, Text, TextInput } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import { useTimer } from "react-timer-hook";
import { isEmailFormat } from "@/function/validation/email";
import { sendCode, verifyCode } from "@/component/signup/email-verify.action";
import { useSignupStore } from "@/store/signup";


type InputState = {
    isValid: boolean,
    isEmpty: boolean
};

const inputInitialState: InputState = {
    isValid: true,
    isEmpty: true
};

export default function EmailVerify() {
    const store = useSignupStore((s) => s);

    const [ emailState, setEmailState ] = useState(inputInitialState);
    const [ sentEmail, setSentEmail ] = useState("");
    const [ isCodeSent, setIsCodeSent ] = useState(false);
    const [ isCodeSentSuccess, setIsCodeSentSuccess ] = useState(false);

    const [ code, setCode ] = useState("");
    const [ isVerifySent, setIsVerifySent ] = useState(false);
    const [ isVerified, setIsVerified ] = useState(true);

    const timer = useTimer({
        expiryTimestamp: new Date(),
        autoStart: false
    });

    // email input handler for email format validation
    const onEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const currentInput = e.target.value;
        store.setEmail(currentInput);
        setEmailState({ isValid: isEmailFormat(currentInput), isEmpty: currentInput.length == 0 });
    };

    const onSendClick = async () => {
        timer.restart(new Date(new Date().valueOf() + (1000 * 60)), true);
        const success = await sendCode(store.email);
        if (success) {
            setIsCodeSent(true);
            setIsCodeSentSuccess(true);
            setSentEmail(store.email);
        } else {
            timer.restart(new Date(), true);
            setIsCodeSent(false);
            setIsCodeSentSuccess(false);
        }
    };

    const onVerifyClick = async () => {
        setIsVerifySent(true);
        const success = await verifyCode(sentEmail, code);
        if (success) {
            store.setEmail(sentEmail);
            store.setIsEmailVerified(true);
        } else {
            setIsVerified(false);
        }
    };

    return <>
        <div style={ { height: "4.5rem" } }>
            <TextInput label="이메일" placeholder="이메일 주소를 입력해 주세요." required
                onChange={ onEmailChange }
                error={ !emailState.isEmpty && !emailState.isValid ? "이메일 형식이 아닙니다." : null }
            />
        </div>
        <Flex justify="flex-end" align="center" mb="sm">
            <Text mx="md" size="xs" c="dimmed">
                {timer.seconds > 0 ? `인증 코드 전송 대기 시간: ${timer.seconds}초` : undefined}
            </Text>
            <Button size="xs" disabled={ timer.seconds > 0 || !emailState.isValid } onClick={ onSendClick }>인증 코드 전송</Button>
        </Flex>
        {
            isCodeSent && isCodeSentSuccess
                ? <>
                    <TextInput label="인증 코드" description={ `${sentEmail}로 보내진 인증 코드를 입력해 주세요.` }
                        placeholder="인증 코드를 입력해 주세요." inputWrapperOrder={ [ "label", "input", "description" ] } required
                        value={ code } onChange={ (e) => setCode(e.target.value) }
                    />
                    <Flex mt="xs" justify="flex-end" align="center">
                        {
                            isVerifySent && !isVerified
                                ? <Text mx="md" size="xs" c="red">
                                    잘못된 코드입니다. 다시 시도해 주세요.
                                </Text>
                                : undefined
                        }
                        <Button size="xs" disabled={ code == "" } onClick={ onVerifyClick }>인증하기</Button>
                    </Flex>


                </>
                : undefined
        }
    </>;
}

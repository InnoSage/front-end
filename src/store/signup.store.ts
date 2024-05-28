import { createStore } from "zustand/vanilla";

export type SignupState = {
    email: string,
    isEmailVerified: boolean,
    username: string,
    password: string,
    phoneNumber: string
};

export type SignupAction = {
    setEmail: (email: string)=>  void,
    setIsEmailVerified: (isEmailVerified: boolean)=>  void,
    setUsername: (username: string)=>  void,
    setPassword: (password: string)=>  void,
    setPhoneNumber: (phoneNumber: string)=>  void
};

export type SignupStore = SignupState & SignupAction;

export const defaultUserState: SignupState = {
    email: "",
    isEmailVerified: false,
    username: "",
    password: "",
    phoneNumber: ""
};

export const createSignupStore = (initialState: SignupState = defaultUserState) =>
    createStore<SignupStore>()((set) => ({
        ...initialState,
        setEmail: (email) => set({ email }),
        setIsEmailVerified: (isEmailVerified) => set({ isEmailVerified }),
        setUsername: (username) => set({ username }),
        setPassword: (password) => set({ password }),
        setPhoneNumber: (phoneNumber) => set({ phoneNumber })
    }));

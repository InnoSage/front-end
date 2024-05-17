import { createStore } from "zustand/vanilla";

export type UserState = {
    token: string,
    refreshToken: string,
    username: string,
    userId: number,
    currentOrganizationId: number,
    currentOrganizationName: string
};

export type UserAction = {
    setUser: (user: UserState)=> void,
    setCurrentOrganization: (organizationId: number, organizationName: string)=> void
};

export type UserStore = UserState & UserAction;

export const defaultUserState: UserState = {
    token: "",
    refreshToken: "",
    username: "",
    userId: -1,
    currentOrganizationId: -1,
    currentOrganizationName: ""
};

export const createUserStore = (initialState: UserState = defaultUserState) => createStore<UserStore>()((set) => ({
    ...initialState,
    setUser: (user) => set(user),
    setCurrentOrganization: (organizationId, organizationName) => set((u) => ({
        ...u,
        currentOrganizationId: organizationId,
        currentOrganizationName: organizationName
    }))
}));

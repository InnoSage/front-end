"use server";

export type DoLoginActionState = {
    isFirst: boolean,
    isValidUser: boolean
};

export async function doLoginAction(
    prevState: DoLoginActionState,
    formData: FormData
) {
    const email = formData.get("email");
    const password = formData.get("password");
    const autoLogin = formData.get("auto-login");

    if (!email || !password) {
        return {
            isFirst: false,
            isValidUser: false
        };
    }

    // TODO: check is valid user from server
    // TODO: set token to cookie if valid user

    return {
        isFirst: false,
        isValidUser: true
    };

}

export interface BaseApiResponse<T> {
    isSuccess: boolean,
    code: string,
    message: string,
    data: T,
    createdAt: Date
}

export class ApiError extends Error {
    public constructor(
        private readonly res: BaseApiResponse<unknown>
    ) {
        super(res.message);
    }

    public get response() {
        return this.res;
    }
}

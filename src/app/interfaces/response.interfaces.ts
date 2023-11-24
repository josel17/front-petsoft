export interface Response<T> {
    status:       boolean;
    data:         T;
    message:      string;
    statusCode:   number;
    errorMessage: string;
}


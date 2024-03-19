export const getLogMessage = (
    message: string,
    httpStatusCode: number,
    exceptionType?: string,
) => {
    return exceptionType
        ? `[${exceptionType}] ${message} | HTTP_STATUS_CODE: ${httpStatusCode}`
        : `${message} | HTTP_STATUS_CODE: ${httpStatusCode}`;
};

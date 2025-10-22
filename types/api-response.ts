export type ApiResponse<T> = {
    data?: T;
    error?: Error & { traceId?: string; data?: any };
};

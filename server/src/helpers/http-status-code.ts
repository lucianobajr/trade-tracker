class HttpStatusCodes {
    // 2xx Success
    public static readonly OK = 200;
    public static readonly CREATED = 201;
    public static readonly ACCEPTED = 202;
    public static readonly NO_CONTENT = 204;

    // 4xx Client Errors
    public static readonly BAD_REQUEST = 400;
    public static readonly UNAUTHORIZED = 401;
    public static readonly FORBIDDEN = 403;
    public static readonly NOT_FOUND = 404;
    public static readonly METHOD_NOT_ALLOWED = 405;
    public static readonly CONFLICT = 409;
    public static readonly UNPROCESSABLE_ENTITY = 422;

    // 5xx Server Errors
    public static readonly INTERNAL_SERVER_ERROR = 500;
    public static readonly NOT_IMPLEMENTED = 501;
    public static readonly BAD_GATEWAY = 502;
    public static readonly SERVICE_UNAVAILABLE = 503;
    public static readonly GATEWAY_TIMEOUT = 504;
}

export { HttpStatusCodes }
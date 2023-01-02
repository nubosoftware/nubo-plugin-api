import * as http from 'http'
import * as url from 'url'


export type RequestHandler = (req: Request, res: Response, next: Next) => any;
export type RequestHandlerType = RequestHandler | RequestHandler[];
export interface Next {
    (err?: any): void;
}

export interface Request extends http.IncomingMessage {
    /**
     * Builds an absolute URI for the request.
     */
    absoluteUri(path: string): string;

    /**
     * checks if the accept header is present and has the value requested.
     * e.g., req.accepts('html');
     * @param    types an array of accept type headers
     */
    accepts(types: string | string[]): boolean;

    /**
     * checks if the request accepts the encoding types.
     * @param    types an array of accept type headers
     */
    acceptsEncoding(types: string | string[]): boolean;

    /**
     * gets the content-length header off the request.
     */
    getContentLength(): number;

    /**
     * pass through to getContentLength.
     */
    contentLength(): number;

    /**
     * gets the content-type header.
     */
    getContentType(): string;

    /**
     * pass through to getContentType.
     */
    contentType(): string;

    /**
     * retrieves the complete URI requested by the client.
     */
    getHref(): string;

    /**
     * pass through to getHref.
     */
    href(): string;

    /**
     * retrieves the request uuid. was created when the request was setup.
     */
    getId(): string;

    /**
     * pass through to getId.
     */
    id(): string;

    /**
     * retrieves the cleaned up url path.
     * e.g., /foo?a=1  =>  /foo
     */
    getPath(): string;

    /**
     * pass through to getPath.
     */
    path(): string;

    /**
     * returns the raw query string
     */
    getQuery(): string;

    // /**
    //  * pass through to getQuery.
    //  * @public
    //  * @function query
    //  * @returns {String}
    //  */
    // query(): string;

    /**
     * returns ms since epoch when request was setup.
     */
    time(): number;

    /**
     * returns a parsed URL object.
     */
    getUrl(): url.Url;

    /**
     * returns the accept-version header.
     */
    getVersion(): string;

    /**
     * pass through to getVersion.
     */
    version(): string;

    /**
     * returns the version of the route that matched.
     */
    matchedVersion(): string;

    /**
     * Get the case-insensitive request header key,
     * and optionally provide a default value (express-compliant).
     * Returns any header off the request. also, 'correct' any
     * correctly spelled 'referrer' header to the actual spelling used.
     * @param key - the key of the header
     * @param defaultValue - default value if header isn't found on the req
     */
    header(key: string, defaultValue?: string): string;

    /**
     * returns any trailer header off the request. also, 'correct' any
     * correctly spelled 'referrer' header to the actual spelling used.
     * @param    name  the name of the header
     * @param    defaultValue default value if header isn't found on the req
     */
    trailer(name: string, defaultValue?: string): string;

    /**
     * Check if the incoming request contains the Content-Type header field, and
     * if it contains the given mime type.
     * @param    type  a content-type header value
     */
    is(type: string): boolean;

    /**
     * Check if the incoming request is chunked.
     */
    isChunked(): boolean;

    /**
     * Check if the incoming request is kept alive.
     */
    isKeepAlive(): boolean;

    /**
     * Check if the incoming request is encrypted.
     */
    isSecure(): boolean;

    /**
     * Check if the incoming request has been upgraded.
     */
    isUpgradeRequest(): boolean;

    /**
     * Check if the incoming request is an upload verb.
     */
    isUpload(): boolean;

    /**
     * toString serialization
     */
    toString(): string;

    /**
     * retrieves the user-agent header.
     */
    userAgent(): string;

    /**
     * Start the timer for a request handler function. You must explicitly invoke
     * endHandlerTimer() after invoking this function. Otherwise timing information
     * will be inaccurate.
     * @param       handlerName The name of the handler.
     */
    startHandlerTimer(handlerName: string): void;

    /**
     * Stop the timer for a request handler function.
     * @param       handlerName The name of the handler.
     */
    endHandlerTimer(handlerName: string): void;

    /**
     * returns the connection state of the request. current valid values are
     * 'close' and 'aborted'.
     */
    connectionState(): string;


    /** available when queryParser plugin is used. */
    query?: any;

    /** available when bodyParser plugin is used. */
    body?: any;

    /** available when bodyParser plugin is used. */
    rawBody?: any;

    /** available when queryParser or bodyParser plugin is used with mapParams enabled. */
    params?: any;

    /** available when multipartBodyParser plugin is used. */
    files?: { [name: string]: File | undefined; } | undefined;

    /** available when authorizationParser plugin is used */
    username?: string | undefined;
}

export interface CacheOptions {
    maxAge: number;
}

export interface Response extends http.ServerResponse {
    /**
     * sets the cache-control header. `type` defaults to _public_,
     * and options currently only takes maxAge.
     * @param    type    value of the header
     * @param    [options] an options object
     * @returns          the value set to the header
     */
    cache(type: string, options?: CacheOptions): string;

    /**
     * sets the cache-control header. `type` defaults to _public_,
     * and options currently only takes maxAge.
     * @param    [options] an options object
     * @returns          the value set to the header
     */
    cache(options?: CacheOptions): string;

    /**
     * turns off all cache related headers.
     * @returns  self, the response object
     */
    noCache(): Response;

    /**
     * Appends the provided character set to the response's Content-Type.
     * e.g., res.charSet('utf-8');
     * @param    type char-set value
     * @returns  self, the response object
     */
    charSet(type: string): Response;

    /**
     * retrieves a header off the response.
     * @param    name the header name
     */
    get(name: string): string;

    /**
     * retrieves all headers off the response.
     */
    getHeaders(): any;

    /**
     * pass through to getHeaders.
     */
    headers(): any;

    /**
     * sets headers on the response.
     * @param    key  the name of the header
     * @param    value the value of the header
     */
    header(key: string, value?: any): any;

    /**
     * short hand method for:
     *     res.contentType = 'json';
     *     res.send({hello: 'world'});
     * @param    code    http status code
     * @param    body    value to json.stringify
     * @param    [headers] headers to set on the response
     */
    json(code: number, body: any, headers?: { [header: string]: string }): any;

    /**
     * short hand method for:
     *     res.contentType = 'json';
     *     res.send({hello: 'world'});
     * @param    body    value to json.stringify
     * @param    [headers] headers to set on the response
     */
    json(body: any, headers?: { [header: string]: string }): any;

    /**
     * sets the link heaader.
     * @param    key   the link key
     * @param    value the link value
     * @returns      the header value set to res
     */
    link(key: string, value: string): string;

    /**
     * sends the response object. pass through to internal __send that uses a
     * formatter based on the content-type header.
     * @param    [code] http status code
     * @param    [body] the content to send
     * @param    [headers]  any add'l headers to set
     * @returns  the response object
     */
    send(code?: number, body?: any, headers?: { [header: string]: string }): any;

    /**
     * sends the response object. pass through to internal __send that uses a
     * formatter based on the content-type header.
     * @param    [body] the content to send
     * @param    [headers]  any add'l headers to set
     * @returns  the response object
     */
    send(body?: any, headers?: { [header: string]: string }): any;

    /**
     * sends the response object. pass through to internal __send that skips
     * formatters entirely and sends the content as is.
     * @param    [code] http status code
     * @param    [body] the content to send
     * @param    [headers]  any add'l headers to set
     * @returns  the response object
     */
    sendRaw(code?: number, body?: any, headers?: { [header: string]: string }): any;

    /**
     * sends the response object. pass through to internal __send that skips
     * formatters entirely and sends the content as is.
     * @param    [body] the content to send
     * @param    [headers]  any add'l headers to set
     * @returns  the response object
     */
    sendRaw(body?: any, headers?: { [header: string]: string }): any;

    /**
     * sets a header on the response.
     * @param    name name of the header
     * @param    val  value of the header
     * @returns       self, the response object
     */
    set(name: string, val: string): Response;

    /**
     * sets a header on the response.
     * @param    val  object of headers
     * @returns       self, the response object
     */
    set(headers?: { [header: string]: string }): Response;

    /**
     * sets the http status code on the response.
     * @param    code http status code
     * @returns      the status code passed in
     */
    status(code: number): number;

    /**
     * toString() serialization.
     */
    toString(): string;

    /**
     * redirect is sugar method for redirecting.
     * res.redirect(301, 'www.foo.com', next);
     * `next` is mandatory, to complete the response and trigger audit logger.
     * @param    code the status code
     * @param    url to redirect to
     * @param    next - mandatory, to complete the response and trigger audit logger
     * @emits    redirect
     */
    redirect(code: number, url: string, next: Next): void;



    /** HTTP status code. */
    code: number;

    /** short hand for the header content-length. */
    contentLength: number;

    /** short hand for the header content-type. */
    contentType: string;

    /** A unique request id (x-request-id). */
    id: string;
}
export interface Server extends http.Server {
    

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    del(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    get(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    head(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    opts(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    post(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    put(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Mounts a chain on the given path against this HTTP verb
     *
     * @param   opts if string, the URL to handle.
     *                                 if options, the URL to handle, at minimum.
     * @returns                the newly created route.
     */
    patch(opts: string | RegExp, handler: RequestHandler): void;

    /**
     * Minimal port of the functionality offered by Express.js Route Param
     * Pre-conditions
     * @link http://expressjs.com/guide.html#route-param%20pre-conditions
     *
     * This basically piggy-backs on the `server.use` method. It attaches a
     * new middleware function that only fires if the specified parameter exists
     * in req.params
     *
     * Exposes an API:
     *   server.param("user", function (req, res, next) {
     *     // load the user's information here, always making sure to call next()
     *   });
     *
     * @param      name The name of the URL param to respond to
     * @param    fn   The middleware function to execute
     * @returns         returns self
     */
    param(name: string, fn: RequestHandler): Server;

    /**
     * Installs a list of handlers to run _before_ the "normal" handlers of all
     * routes.
     *
     * You can pass in any combination of functions or array of functions.
     * @returns returns self
     */
    use(...handlers: RequestHandlerType[]): Server;

    /**
     * Gives you hooks to run _before_ any routes are located.  This gives you
     * a chance to intercept the request and change headers, etc., that routing
     * depends on.  Note that req.params will _not_ be set yet.
     * @returns returns self
     */
    pre(...pre: RequestHandlerType[]): Server;


   
}
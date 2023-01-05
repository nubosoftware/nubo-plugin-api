import { Server, Request, Response, RequestHandler } from './server';
import { CoreModule } from './coreModule';
import { Login } from './login';

export type StaticPlugIn = {
  staticFolder: string;
  path: string;
};

export type ServerMount = {
  method: "get" | "post" | "put" | "del" | "head" | "opts";
  path: string;
  handler: RequestHandler;
}

export type PluginTriggerHandler = (objectType: string, action: string, ...params: any[]) => any;

export type PluginTrigger = {
  objectType: string;
  action: string;
  handler: PluginTriggerHandler;
}
export type PluginInitResponse = {
  staticFoldersPlugins?: StaticPlugIn[];
  publicServerHandlers?: ServerMount[];
  triggers?: PluginTrigger[];
}

export interface PluginModule {
  init: (coreModule: CoreModule) => PluginInitResponse;
  deinit?: () => void;
  // addPublicServerHandlers?: (server: Server) => void;
  handleRestApiRequest?: (
    objectType: string,
    arg1: string,
    arg2: string,
    arg3: string,
    perms: any,
    adminLogin: Login,
    req: Request,
    res: Response,
  ) => boolean;
  // getStaticFoldersPlugins?: () => StaticPlugIn[];
}

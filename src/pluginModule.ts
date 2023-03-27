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

export type PluginConfigurationDesciption = {
  key: string;
  name: string;
  dataType: "string" | "number" | "boolean" | "object" | "array";
  defaultValue: any;
}


export type PluginInitResponse = {
  staticFoldersPlugins?: StaticPlugIn[];
  publicServerHandlers?: ServerMount[];
  triggers?: PluginTrigger[];
  sessionType?: string | string[];
}

export interface PluginModule {
  getConfDesciptions?: () => PluginConfigurationDesciption[];
  init: (coreModule: CoreModule, configuration?: any) => PluginInitResponse;
  deinit?: () => void;
  handleMessage?: (message: any) => void;
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

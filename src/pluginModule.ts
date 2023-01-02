import { Server, Request, Response } from './server';
import { CoreModule } from './coreModule';
import { Login } from './login';

export type StaticPlugIn = {
  staticFolder: string;
  path: string;
};

export interface PluginModule {
  init: (coreModule: CoreModule) => void;
  deinit?: () => void;
  addPublicServerHandlers?: (server: Server) => void;
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
  getStaticFoldersPlugins?: () => StaticPlugIn[];
}

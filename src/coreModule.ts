import { Common, RedisClient, PluginInterface } from './common';
import { Login, GetLogin } from './login';




export interface CoreModule {
  pluginId: string;
  pluginName: string;
  pluginVersion: string;
  Common: Common;
  Login: Login;
  GetLogin: GetLogin;
  redis: RedisClient;
  plugin: PluginInterface;
  
}

/*
var params = {
    Common: null,
    Login: null,
    Otp: null,
    CommonUtils: null,
    UserUtils: null,
    User: null,
    Session: null,
    Settings: null,
    nubocronAPI: null,
    nuboCronJobs: null,
    AddProfilesToGroup: null,
    RemoveProfilesFromGroup: null,
    DeleteGroups: null,
    Notifications: null,
    updateSecurityPolicy: null,
    DaemonTools: null,
    FrontEndService: null,
    StartSession: null,
    Service: null,
}

*/

import  { DataTypes, ModelAttributes, ModelOptions, Model, ModelStatic }  from  'sequelize';

export interface Common {
  STATUS_OK: 1;
  STATUS_ERROR: 0;
  STATUS_EXPIRED_LOGIN_TOKEN: 2;
  STATUS_INVALID_PLAYER_VERSION: 3;
  STATUS_PASSWORD_LOCK: 4;
  STATUS_CHANGE_URL: 301;
  STATUS_DISABLE_USER_DEVICE: 5;
  STATUS_DISABLE_USER: 6;
  STATUS_EXPIRED_PASSCODE: 7;
  STATUS_DATA_CENTER_UNAVALIBLE: 8;
  STATUS_INVALID_RESOURCE: 10;
  STATUS_OTP_MAX_TRIES: 30;
  STATUS_OTP_TIMEOUT: 31;
  STATUS_PASSWORD_NOT_MATCH: 32;
  STATUS_PASSWORD_NOT_INCLUDE_NUMBER: 33;
  STATUS_PASSWORD_NOT_INCLUDE_LETTER: 34;
  STATUS_PASSWORD_NOT_INCLUDE_SPECIAL_CHAR: 35;
  STATUS_INVALID_CREDENTIALS: 36;
  STATUS_RESET_PASSCODE_PENDING: 100;
  STATUS_RESET_BIOMETRIC_PENDING: 101;
  STATUS_RESET_OTP_PENDING: 102;
  STATUS_ADMIN_ACTIVATION_PENDING: 200;
  STATUS_ADMIN_ACTIVATION_VALID: 201;
  STATUS_ADMIN_RESET_PENDING: 202;
  STATUS_NOTIF_EMPTY: 50;
  ACTION_RESET_PASSCODE: 1;
  ACTION_CANCEL_RESET_PASSCODE: 2;
  ACTION_WIPE_RESET_PASSCODE: 3;
  ACTION_RESET_BIOMETRIC: 4;
  ACTION_RESET_OTP: 5;

  CLIENT_AUTH_TYPE_NONE: 0;
  CLIENT_AUTH_TYPE_PASSWORD: 1;
  CLIENT_AUTH_TYPE_BIOMETRIC_OTP: 2;
  CLIENT_AUTH_TYPE_PASSWORD_AND_BIOMETRIC_OTP: 3;
  CLIENT_AUTH_TYPE_PASSWORD_OR_BIOMETRIC_OTP: 4;

  SECOND_AUTH_METHOD_BIOMETRIC: 1;
  SECOND_AUTH_METHOD_OTP: 2;
  SECOND_AUTH_METHOD_BIOMETRIC_OR_OTP: 3;

  EDITION_COMMUNITY: 'community';
  EDITION_ENTERPRISE: 'enterprise';

  minUXIPVersion: 1;

  dcURL: string;
  serverurl: string;
  internalurl: string;
  // nodemailer : require("nodemailer"),
  // redis: require("redis"),

  nfshomefolder: string;
  sessionTimeout: number;

  platformType: string;

  dcName: string;
  singleDataCenter: boolean; // this mean that we do not use another datacenter with the same database
  dcInternalURL: string;

  activationTimeoutPeriod: number;

  platformParams: {
    poolStrategy: 'calculated' | 'fixed';
    concurrency: number;
    concurrencyDelay: number;
    platformPoolSize: number;
    explatformPoolSize: number;
    upperCapacityLevel: number;
    bottomCapacityLevel: number;
    maxCapacity: number;
    usersPerPlatform: number;
    choosePool: number;
    maxFailed: number;
    maxFails: number;
    fixedPool: boolean;
    restartPlatformSessionsThreshold: number;
    cleanPlatformsMode: boolean;
  };
  logLevel: 'verbose' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

  // smsHandler : false,

  defaultLocale: 'en';
  defaultTimeZone: 'Etc/UTC';
  defaultAppName: 'Nubo';

  otpTimeout: number;
  otpMaxTries: number;
  isDaemonProcess: boolean;

  emailSender: {
    senderEmail: string;
    senderName: string;
  };
  rootDir: string;
  isEnterpriseEdition: () => boolean;
  isMobile: () => boolean;
  isDesktop: () => boolean;
  getEdition: () => 'community' | 'enterprise';
  getDeviceTypes: () => DeviceType[];
  getLogger: (fileName: string) => Logger;
  logger: Logger;
}

export type DeviceType = 'desktop' | 'mobile';
export interface Logger {
  error: (text: string, err?: Error) => void;
  info: (text: string, err?: Error) => void;
  warn: (text: string) => void;
  debug: (text: string) => void;
}

export interface RedisClient {
  sendCommand: (command: string, ...args: any[]) => Promise<any>;
}

export interface PluginInterface {
  sendMessageToPlugin: (pluginId: string, message: any) => Promise<any>;
  defineDBModel: (modelName: string, modelDefinition: ModelAttributes, options?: ModelOptions) => ModelStatic<any>;
}


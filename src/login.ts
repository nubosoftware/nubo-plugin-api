export interface Login {
  loginToken: string;
  loginParams: {
    isLogin: boolean;
    isValidPassword: boolean;
    email: string;
    userName: string;
    imUserName: string;
    isAdmin: boolean;
    isActive: boolean;
    mainDomain: string;
    platformDomain: string;
    adminPermissions: string;
    adminLogin: number;
    siteAdmin: boolean;
    activationKey: string;
    authenticationRequired: boolean;
    passcodeActivationRequired: boolean;
    deviceID: string;
    deviceType: string;
    deviceName: string;
    isValidSecondAuth: boolean;
    clientauthtype: string;
    secondauthmethod: string;
    secondAuthType: string;
    otpTriesCounter: number;
    firstLogin: boolean;
  };
  save: (callback: (err: Error | null, login: Login | null) => void) => void;
  delete: (callback: (err: Error | null) => void) => void;
  setValidLogin: (isLogin: boolean) => void;
  isValidLogin: () => boolean;
}

export type GetLogin = new (loginToken: string, callback: (err: Error | null, login: Login | null) => void) => void;

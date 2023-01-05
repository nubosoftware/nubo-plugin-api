import { CoreModule, PluginModule, Server, Login, GetLogin } from "../src/index";
import { Logger } from "../src/common";
import { PluginInitResponse } from "../src/pluginModule";
import { Request, Response } from "../src/server";



class MyModule implements PluginModule {
    coreModule!: CoreModule;
    logger!: Logger;
    initizalized = false;

    init(_coreModule: CoreModule) : PluginInitResponse  {
        this.coreModule = _coreModule;               
        this.logger = this.coreModule.Common.getLogger("MyTestModule");
        this.initizalized = true;
        return {
            publicServerHandlers: [
                {
                    method: "get",
                    path: "/mytest",
                    handler: (req: Request, res: Response) => {
                        this.logger.info("[MyTestModule] Got request to /mytest");
                        res.send("Hello World!");
                    }
                }
            ]
        }
        this.logger.info("[MyTestModule] initialized!");
    }
    deinit() {
        if (this.initizalized) {
            this.initizalized = false;
            this.coreModule = undefined!;
            this.logger.info("[MyTestModule] deinitialized!");
        }
    }
    // addPublicServerHandlers(server: Server) {
    //     this.logger.info("[MyTestModule] Adding public server handlers!");
    //     server.get("/mytest", (req, res) => {
    //         this.logger.info("[MyTestModule] Got request to /mytest");
    //         res.send("Hello World!");
    //     });
    // }

    handleRestApiRequest(objectType: string, arg1: string, arg2: string, arg3: string, perms: any, adminLogin: Login, req: Request, res: Response): boolean {
        this.logger.info("[MyTestModule] Got request to /restapi/" + objectType + "/" + arg1 + "/" + arg2 + "/" + arg3);
        if (objectType === "mytest") {
            // this.logger.info("[MyTestModule] calling httpsTest...");
            // this.httpsTest(req,res);
            res.send({
                status: 1,
                message: "Hello World!",                          
            });
            // this.logger.info("[MyTestModule] after calling httpsTest. returning true..");
            return true;
        }
        return false;       
    }
    

}

const myModule = new MyModule();

function getPluginModule(): PluginModule {
    return myModule;
}


function getCoreModule(): CoreModule {
    if (!myModule.initizalized) {
        throw new Error("Module not initialized!");
    }
    return myModule.coreModule;
}


// basic test without initialization of coreModule
test('Basic Test', () => {
    expect(myModule).toBeDefined();
    expect(myModule.init).toBeDefined();
});



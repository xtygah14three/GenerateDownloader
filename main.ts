import * as Async from 'async'
import {ConfigManager} from './ConfigManager'
import {DownloadManager} from "./DownloadManager"
import {UploadManager} from "./UploadManager"
import * as process from 'process'

class Main{
    manager:ConfigManager;
    operation:RegExp = /^[A-Z]+\s/;
    constructor(){
        this.manager = ConfigManager.getInstance();
        this.manager.Init(process.platform);
        this.manager.on("onCommand",(cmd)=>{
            if(this.operation.test(cmd)){
                switch(this.operation.exec(cmd)[0]){
                    //！！！ 操作符判定后面要加一个空格，因为正则表达式的原因
                    case "EXIT ":
                        process.exit(0);
                    break;
                    case "DOWNLOAD ":
                        DownloadManager.getInstance().HandleCommand(cmd);
                    break;
                    case "UPLOAD ":
                        UploadManager.getInstance().HandleCommand(cmd);
                    break;
                }
            }
            //console.log(this.operation.exec(cmd))
        })
    }
    protected start(){
        console.log("hello world")
    }
}
let main = new Main();


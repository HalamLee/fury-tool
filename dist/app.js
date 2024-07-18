#!/usr/bin/env node
"use strict";var X=Object.create;var H=Object.defineProperty;var tt=Object.getOwnPropertyDescriptor;var et=Object.getOwnPropertyNames;var rt=Object.getPrototypeOf,it=Object.prototype.hasOwnProperty;var ot=(r,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of et(t))!it.call(r,o)&&o!==e&&H(r,o,{get:()=>t[o],enumerable:!(i=tt(t,o))||i.enumerable});return r};var f=(r,t,e)=>(e=r!=null?X(rt(r)):{},ot(t||!r||!r.__esModule?H(e,"default",{value:r,enumerable:!0}):e,r));var Q=require("commander");var u=class{Prompt;Logger;Spinner;Launcher;CommonUtil;FileUtil;constructor({prompt:t,logger:e,spinner:i,launcher:o,utils:c}){this.Prompt=t,this.Logger=e,this.Spinner=i,this.Launcher=o,this.CommonUtil=c.CommonUtil,this.FileUtil=c.FileUtil}async invoke(){try{await this.prepare(),await this.execute(),await this.finalize()}catch(t){let e=t;this.Logger.errorD(e),await this.rollback()}}};var Y=f(require("moment")),p=class r{static instance;logLevel;constructor(t){let e={error:0,info:1,warn:2,debug:3,trace:4};this.logLevel=t?e[t]:2}static getInstance(t){return r.instance?this.instance.debug("Get Logger Instance"):(r.instance=new r(t),this.instance.debug("New Logger Instance"),this.instance.debug(`Level: ${t}`)),r.instance}formatMessage(t,e,i){return`${(0,Y.default)().format("YYYY.MM.DD HH:mm:ss")} | ${t}${e}\x1B[0m | ${i}`}debug(t){this.logLevel>=3&&(typeof t=="object"&&(t=JSON.stringify(t,null,2)),console.log(this.formatMessage("\x1B[36m","DEBUG",t)))}info(t){this.logLevel>=1&&console.info(this.formatMessage("\x1B[32m","INFO",t))}warn(t){this.logLevel>=2&&console.warn(this.formatMessage("\x1B[33m","WARN",t))}error(t){this.logLevel>=0&&console.error(this.formatMessage("\x1B[31m","ERROR",t))}errorD(t){this.logLevel>=4&&console.error(this.formatMessage("\x1B[31m","ERROR_D",`{
  type: '${t.title}'
  reason: '${t.context}'
}`))}system(t){this.logLevel>=0&&console.log(t)}space(){console.log()}logo(){console.log(`
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E0\u28E4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u280F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u28FF\u28FF\u284F\u2840\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2803\u2800\u28C0\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2880\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28F8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28FE\u28FF\u28FF\u28D7\u2800\u2800\u2880\u28E0\u28F6\u28FF\u28FF\u2847\u2800\u2800\u2880\u28FE\u28FE\u28FE\u28FE\u28FE\u28FE\u2802\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u285E\u2801\u28FD\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28FE\u28FF\u28FF\u28FF\u283F\u280F\u2801\u2800\u2800\u28B8\u28FF\u28FF\u2809\u2809\u2809\u2809\u28A0\u28E4\u28E4\u2800\u2800\u28E4\u28E4\u2844\u2800\u28E0\u28E4\u28C4\u28E0\u28E4\u28A0\u28E4\u28E4\u2800\u2800\u28E4\u28E4\u2844\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u2805\u2828\u28FF\u28FF\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u2808\u2818\u28FB\u28FF\u2809\u2808\u2800\u2800\u2800\u2800\u2800\u2800\u28FD\u28FF\u28FF\u28FE\u28FE\u284E\u2800\u28FC\u28FF\u28DF\u2800\u2890\u28FF\u28FF\u2803\u2880\u28FF\u28FF\u283F\u281B\u2813\u2898\u28FF\u28FF\u2800\u28B0\u28FF\u285F\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28E7\u28C0\u2819\u2821\u28FF\u28FF\u28FF\u284F\u28FF\u28FF\u287F\u2801\u2800\u2880\u28FD\u28FF\u28E7\u28C0\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u28FF\u2801\u2801\u2801\u2801\u2880\u28FF\u28FF\u2847\u2800\u28FC\u28FF\u28DF\u2800\u28B0\u28FF\u28FF\u2801\u2800\u2800\u2800\u28FF\u28FF\u28E0\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28CD\u28C9\u28C1\u28C0\u28E4\u28FE\u28FF\u287F\u283F\u280B\u2800\u2800\u2800\u2800\u2800\u28FE\u28FF\u286F\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u287F\u287F\u28BB\u28FF\u28DF\u2800\u28FD\u28FF\u284F\u2800\u2800\u2800\u2800\u28FB\u28FF\u28FF\u280F\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u281B\u281B\u281F\u283F\u283F\u283B\u281F\u283F\u283B\u283B\u281B\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28F4\u28FE\u287F\u2803\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2839\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800
`)}};var d=require("fs"),T=require("path");var s=class{logger;title;message;context;constructor(t,e,i){this.logger=p.getInstance(),this.title=`${t}Exception`,this.message=e,this.context=i}};var st="NoData",n=class extends s{constructor(t){super(st,t,new Error(`${t} is undefined`)),this.logger.error(`${this.convertMessage(t)} is not exist.`)}convertMessage(t){return{projectName:"[Project Name] value",packageManager:"[Package Manager] value",useTypescript:"[Use Typescript] value",useFramework:"[Use Framework] value",useGit:"[Use Git] value",usePrettier:"[Use Prettier] value",useEslint:"[Use Eslint] value",frameworkType:"[Framework Type] value",remoteUrl:"[Remote URL] value"}[t]}};var nt="OperationFail",y=class extends s{constructor(t,e){super(nt,t,e),this.logger.error(`${this.convertMessage(t)} Failed.`)}convertMessage(t){return{projectBuild:"Project Build",createDirectory:"Create Project Directory"}[t]}};var at="Git",m=class extends s{constructor(t){super(at,t,t),this.logger.error(`${this.convertMessage(t)}.`)}convertMessage(t){return{init:"Not a git repository (.git)",notInstall:"Git is not installed",remoteNotExist:"This branch is not exist"}[t]}};var ct="AlreadyExist",v=class extends s{constructor(t){super(ct,"",t),this.logger.error(`${t} is already exist.`)}};var h=class r{constructor(){}static makePath(t,e){return(0,T.join)(t,e)}static async checkExist(t){return(0,d.existsSync)(t)}static async createDirectory(t,e,i){try{let o=(0,T.join)(t,e);return(0,d.mkdirSync)(o,{recursive:i!=null&&i.recursive?i.recursive:!1}),await this.checkExist(o),o}catch(o){throw new y("createDirectory",o)}}static async createFile(t,e,i){let o=(0,T.join)(t,e);return(0,d.writeFileSync)(o,i),this.checkExist(o)}static async createStructure(t,e){for(let i in t){let o=t[i];typeof o=="string"&&await this.createFile(e,`${i}.${o}`,""),typeof o=="object"&&(await this.createDirectory(e,i),await r.createStructure(o,this.makePath(e,i)))}}};var b=class{constructor(){}static validateRequireFields(t,e){e.forEach(i=>{if(t[i]===void 0)throw new n(i);return!0})}};var a=class{logger;FileUtil;projectInfo;sWorkDir;constructor(t){this.logger=p.getInstance(),this.FileUtil=h,this.projectInfo=t,this.sWorkDir=process.cwd()}setWorkDir(t){this.sWorkDir=t}};var $={name:"moduleName",version:"1.0.0",description:"JavaScript Project setup from fury",main:"src/index.js",scripts:{dev:"node src/index.js"},keywords:[],author:"",license:"ISC",dependencies:{}};var _={name:"moduleName",version:"1.0.0",description:"TypeScript Project setup from fury",main:"dist/index.js",scripts:{build:"npx tsc",dev:"ts-node src/index.ts"},keywords:[],author:"",license:"ISC",devDependencies:{"@types/node":"^20.12.7","ts-node":"^10.9.2",typescript:"^5.4.5"}};var A={compilerOptions:{target:"ES2020",module:"commonjs",outDir:"./dist",rootDir:"./src",esModuleInterop:!0,declaration:!0}};var R={default:{src:{index:"js",utils:{projectUtil:"js"}}},typescript:{src:{index:"ts",utils:{projectUtil:"ts"}}}};var J=`
# {{projectName}}

> Write your project description here

- point1
- point2
- point3

## Installation

\`\`\`bash
# npm
npm install {{projectName}}

# yarn
yarn add {{projectName}}

# pnpm
pnpm install {{projectName}}
\`\`\`

## Usage

\`\`\`bash
# Write your project usage here
\`\`\`

## Document

- Write your document link and preview here

## Authors

- Write your name - Write your role (ex. Project initial and development)

## Version History

- 0.0.1
  - Write your version history here

## License

Write your license info here (ex. This project is licensed under the [MIT] License)
`;var x=class extends a{constructor(t){super(t)}async setup(){let t=await this.FileUtil.createDirectory(this.sWorkDir,this.projectInfo.projectName),e=this.projectInfo.useTypescript?_:$,i=this.projectInfo.useTypescript?R.typescript:R.default;e.name=this.projectInfo.projectName,await this.FileUtil.createFile(t,"package.json",JSON.stringify(e,null,2)),this.projectInfo.useTypescript&&await this.FileUtil.createFile(t,"tsconfig.json",JSON.stringify(A,null,2)),await this.FileUtil.createStructure(i,t),this.setWorkDir(t)}getWorkDir(){return this.sWorkDir}getFactory(){var t;switch((t=this.projectInfo)==null?void 0:t.frameworkType){case"react":return new w(this.projectInfo);case"vue":return new j(this.projectInfo);case"express":return new I(this.projectInfo);default:return this}}};var w=class extends a{async setup(){}getWorkDir(){return""}};var j=class extends a{async setup(){}getWorkDir(){return""}};var I=class extends a{async setup(){}getWorkDir(){return""}};var W=[{type:"text",name:"projectName",message:"Enter the project name:",initial:"demo"},{type:"select",name:"packageManager",message:"Select a package manager:",choices:[{title:"\x1B[31mnpm\x1B[0m",value:"npm"},{title:"\x1B[36myarn\x1B[0m",value:"yarn"},{title:"\x1B[33mpnpm\x1B[0m",value:"pnpm"}]},{type:"toggle",name:"useTypescript",message:"Use TypeScript?",initial:!1},{type:"toggle",name:"useFramework",message:"Use Framework?",initial:!1},{type:"toggle",name:"useGit",message:"Use Git?",initial:!1},{type:"toggle",name:"usePrettier",message:"Use Prettier?",initial:!1},{type:"toggle",name:"useEslint",message:"Use ESLint?",initial:!1}],N=[{type:"select",name:"frameworkType",message:"Select a framework:",choices:[{title:"\x1B[34mReact\x1B[0m",value:"react"},{title:"\x1B[32mVue\x1B[0m",value:"vue"}]}],O=[{type:"text",name:"remoteUrl",message:"Enter the remote repo URL:",validate:r=>{let t=new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/);return r===""?!1:!!t.test(r)}}];var M=[{type:"select",name:"subCommand",message:"Select the action you want: ",choices:[{title:"Init",value:"init"},{title:"Commit & Push",value:"push"},{title:"Pull",value:"pull"},{title:"Merge",value:"merge"},{title:"Branch Manage",value:"branch",disabled:!0}]}],G=[{type:"text",name:"remoteUrl",message:"Enter the remote repo URL:",validate:r=>{let t=new RegExp(/https:\/\/github\.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]/);return r===""?!1:!!t.test(r)}},{type:"confirm",name:"useFirstCommit",message:"Do you want to initial commit?",initial:!0}],B=[{type:"select",name:"commitType",message:"Select a type of commit: ",choices:[{title:"\u{1F6A7} - Work in Progress",value:":construction:"},{title:"\u2728 - New Feature",value:":sparkles:"},{title:"\u{1F41B} - Bug Fix",value:":bug:"},{title:"\u{1F528} - Refactor Code",value:":hammer:"},{title:"\u26A1\uFE0F - Performance",value:":zap:"},{title:"\u{1F484} - Style",value:":lipstick:"},{title:"\u2795 - New Dependency",value:":heavy_plus_sign:"},{title:"\u{1F4DD} - Documentation",value:":memo:"},{title:"\u2705 - Tests",value:":white_check_mark:"},{title:"\u{1F3D7}\uFE0F  - Build",value:":building_construction:"},{title:"\u{1F680} - Deploying",value:":rocket:"},{title:"\u{1F477} - CI/CD",value:":construction_worker:"},{title:"\u{1F40C} - Chore",value:"\u{1F40C}"}]},{type:"text",name:"commitMessage",message:"Enter commit message: ",validate:r=>r!==""},{type:"toggle",name:"pushPermission",active:"yes",inactive:"no",initial:!0,message:"Do you want to push to remote repo?: "}],P=[{type:"select",name:"targetBranch",message:"Select the target branch: ",choices:[]}];var k=class extends u{projectInfo={};sWorkDir="";async prepare(){let t=await this.Prompt.call(W);Object.assign(this.projectInfo,t);let e=W.map(i=>String(i.name));if(this.CommonUtil.validateRequireFields(this.projectInfo,e),this.projectInfo.useFramework){let i=await this.Prompt.call(N);this.CommonUtil.validateRequireFields(i,N.map(o=>String(o.name))),Object.assign(this.projectInfo,i)}if(this.projectInfo.useGit){let i=await this.Prompt.call(O);this.CommonUtil.validateRequireFields(i,O.map(o=>String(o.name))),Object.assign(this.projectInfo,i)}this.Logger.space()}async execute(){let t=this.Spinner.start("Creating project..."),e=new x(this.projectInfo).getFactory();await e.setup(),this.sWorkDir=e.getWorkDir(),this.Spinner.success(t,`\u2728 Creating project \x1B[35min\x1B[0m ${this.sWorkDir}`),this.Logger.space()}async finalize(){let t=this.Spinner.start("\u{1F4DD}  Write README.md...");try{await this.FileUtil.createFile(this.sWorkDir,"README.md",J.replace(/{{projectName}}/g,this.projectInfo.projectName)),this.Spinner.success(t,"\u{1F4DD}  Write README.md")}catch(o){t.fail(),this.Logger.error(o.message)}if(this.projectInfo.useGit){let o=this.Spinner.start("\u{1F334}  Setup Git...");await this.FileUtil.createFile(this.sWorkDir,".gitignore","node_modules");try{await this.Launcher.run("git",["init"],this.sWorkDir),await this.Launcher.run("git",["remote","add","origin",this.projectInfo.remoteUrl],this.sWorkDir),this.Spinner.success(o,"\u{1F334}  Setup Git")}catch(c){o.fail(),this.Logger.error(c.message)}}if(this.projectInfo.usePrettier){let o=this.Spinner.start("\u{1F3A8}  Setup Prettier...");await this.FileUtil.createFile(this.sWorkDir,".prettierrc.yaml",""),this.Spinner.success(o,"\u{1F3A8}  Setup Prettier")}let e=this.Spinner.start("\u{1F4E6}  Installing dependencies..."),i=await this.Launcher.run(this.projectInfo.packageManager,["install"],this.sWorkDir);this.Spinner.success(e,`\u{1F4E6}  Install dependencies
`),this.Logger.system(i),this.Logger.space(),this.Logger.system(`\u{1F389}  Successfully created project \x1B[33m${this.projectInfo.projectName}\x1B[0m.`),this.Logger.system(`\u{1F449}  Get started with the following commands:
    $ \x1B[33mcd\x1B[0m ${this.projectInfo.projectName}
    $ code .`)}async rollback(){}};var L=class extends u{gitInfo={};sWorkDir=process.cwd();async prepare(){let t=await this.Prompt.call(M);this.CommonUtil.validateRequireFields(t,M.map(e=>String(e.name))),Object.assign(this.gitInfo,t),this.gitInfo.subCommand!=="init"&&await this.checkValidation()}async execute(){switch(this.gitInfo.subCommand){case"init":{await this.initGit();break}case"push":{await this.pushGit();break}case"pull":{await this.pullGit();break}case"merge":{await this.mergeGit();break}case"branch":{await this.branchManage();break}}}async finalize(){}async rollback(){}async checkValidation(){try{await this.Launcher.run("git",["-v"])}catch{throw new m("notInstall")}let t=this.FileUtil.makePath(this.sWorkDir,".git");if(!await this.FileUtil.checkExist(t))throw new m("init")}async initGit(){try{await this.Launcher.run("git",["-v"])}catch{throw new m("notInstall")}let t=this.FileUtil.makePath(this.sWorkDir,".git");if(await this.FileUtil.checkExist(t))throw new v(".git");await this.Launcher.run("git",["init"],this.sWorkDir);let e=await this.Prompt.call(G);this.CommonUtil.validateRequireFields(e,G.map(i=>String(i.name))),Object.assign(this.gitInfo,e),this.Launcher.run("git",["remote","add","origin",this.gitInfo.remoteUrl],this.sWorkDir),this.gitInfo.useFirstCommit&&(await this.Launcher.run("git",["add","."],this.sWorkDir),await this.Launcher.run("git",["commit","-m",":sparkles: Project Initial"],this.sWorkDir),await this.Launcher.run("git",["push","-u","origin","master"],this.sWorkDir))}async pushGit(){let t=await this.Prompt.call(B);this.CommonUtil.validateRequireFields(t,B.map(i=>String(i.name))),Object.assign(this.gitInfo,t),this.Logger.space();let e=this.Spinner.start("\u{1F4E4}  Push Commit to Remote Repo...");await this.Launcher.run("git",["add","."],this.sWorkDir),await this.Launcher.run("git",["commit","-m",`${this.gitInfo.commitType} ${this.gitInfo.commitMessage}`,this.sWorkDir]),this.gitInfo.pushPermission&&await this.Launcher.run("git",["push","-u","origin"],this.sWorkDir),this.Spinner.success(e,"\u{1F4E4}  Push Commit to Remote Repo")}async pullGit(){let e=(await this.Launcher.run("git",["branch"],this.sWorkDir)).split(`
`).find(l=>l.includes("*")).replace("*","").trim();if(e===void 0)throw new n("currentBranch");if(!(await this.Launcher.run("git",["branch","-a"],this.sWorkDir)).split(`
`).some(l=>{if(l.split("/").length>1){let C=l.split("/");if(C[C.length-1]===e)return!0}}))throw new m("remoteNotExist");let c=this.Spinner.start("\u{1F4E9}  Pulling changes...");await this.Launcher.run("git",["pull","origin",e],this.sWorkDir),this.Spinner.success(c,"\u{1F4E9}  Pull changes")}async mergeGit(){if((await this.Launcher.run("git",["branch"],this.sWorkDir)).split(`
`).find(g=>g.includes("*")).replace("*","").trim()===void 0)throw new n("currentBranch");let i=await this.Launcher.run("git",["branch","-a"],this.sWorkDir),o=[];i.split(`
`).forEach(g=>{if(g.includes("->"))return;let q=g.replace("*","").trim();o.push({title:q,value:q})}),P[0].choices=o;let c=await this.Prompt.call(P);this.CommonUtil.validateRequireFields(c,P.map(g=>String(g.name))),Object.assign(this.gitInfo,c);let l=this.gitInfo.targetBranch.split("/").pop();this.gitInfo.targetBranch.includes("remotes")&&await this.Launcher.run("git",["pull","origin",`${l}`],this.sWorkDir);let C=await this.Launcher.run("git",["merge",`${l}`]);this.Logger.debug(C)}async branchManage(){}};var F=class{constructor(){}static async call(t){let{default:e}=await import("update-notifier"),i=e({pkg:t,updateCheckInterval:0});i.update&&i.notify({message:`New Version! \x1B[31m{currentVersion}\x1B[0m \u2192 \x1B[32m{latestVersion}\x1B[0m.
 \x1B[35mChangelog:\x1B[0m https://github.com/jujoycode/fury-tool

 Run "{updateCommand}" to update.`})}};var z=f(require("prompts"));var E=class{prompt;constructor(){this.prompt=z.default}async call(t){return await this.prompt(t,{onCancel:()=>{console.error("User Cancel Exception")}})}};var Z=f(require("os"));var S=class r{static instance;ora=null;constructor(){import("ora").then(t=>{this.ora=t.default({spinner:"arc"})}).catch(t=>{throw new n(t.message)})}static getInstance(){return r.instance||(r.instance=new r),r.instance}get(){if(!this.ora)throw new n("Spinner instance is not initialized yet.");return this.ora}start(t){return this.get().start(t)}success(t,e){Z.default.type()==="Windows_NT"?t.stopAndPersist({symbol:"\x1B[32m\u221A\x1B[0m",text:e}):t.succeed(e)}};var D=class r{static instance;execa=null;constructor(){import("execa").then(t=>{this.execa=t})}static getInstance(){return r.instance||(r.instance=new r),r.instance}async run(t,e,i){if(!this.execa)throw new Error("Launcher instance is not initialized yet.");let{stdout:o}=await this.execa.execa(t,e,{cwd:i});return o}};var K="trace";var U={name:"fury-tool",version:"0.1.1",description:"Tool that helps developers in a variety of tasks",main:"dist/app.js",bin:{fury:"dist/app.js"},types:"types/app.d.ts",scripts:{exportType:"npx tsc",build:"rm -rf dist && rm -rf types && pnpm exportType && node ./scripts/build.mjs",dev:"node ./dist/app.js",test:"pnpm build && pnpm dev"},keywords:["cli","git","Node","JavaScript","tool"],repository:{type:"git",url:"git+https://github.com/jujoycode/fury-tool.git"},author:"_jujoycode",license:"MIT",bugs:{url:"https://github.com/jujoycode/fury-tool/issues"},homepage:"https://github.com/jujoycode/fury-tool?tab=readme",devDependencies:{"@types/node":"^20.12.7","@types/prompts":"^2.4.9","@types/update-notifier":"^6.0.8","ts-node":"^10.9.2",typescript:"^5.4.5"},dependencies:{commander:"^12.1.0",esbuild:"^0.22.0",execa:"^9.3.0",moment:"^2.30.1",ora:"^8.0.1",prompts:"^2.4.2","update-notifier":"^7.0.0"}};var V=class{program;prompt;spinner;launcher;logger;constructor(){this.program=new Q.Command,this.prompt=new E,F.call(U),this.spinner=S.getInstance(),this.launcher=D.getInstance(),this.logger=p.getInstance(K),this.configureCommands()}configureCommands(){this.program.name(U.name).option("no option","Start create project").option("-g, --git","Start git management",!1).option("-m, --migration","Start migration data",!1).option("-s, --setting","Edit fury setting",!1).version(U.version).description(U.description).action(async t=>{let e=this.getCommand(t);e&&(console.time("\u{1F525}"),await e.invoke(),this.logger.space(),console.timeEnd("\u{1F525}"))})}getCommand(t){let e={prompt:this.prompt,logger:this.logger,spinner:this.spinner,launcher:this.launcher,utils:{CommonUtil:b,FileUtil:h}};switch(!0){case t.git:return new L(e);case t.migration:return;case t.setting:return;default:return new k(e)}}run(){this.logger.logo(),this.program.parse(process.argv)}};new V().run();

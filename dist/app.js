#!/usr/bin/env node
"use strict";var O=Object.create;var w=Object.defineProperty;var R=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var S=Object.getPrototypeOf,L=Object.prototype.hasOwnProperty;var M=(r,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of k(t))!L.call(r,o)&&o!==e&&w(r,o,{get:()=>t[o],enumerable:!(i=R(t,o))||i.enumerable});return r};var j=(r,t,e)=>(e=r!=null?O(S(r)):{},M(t||!r||!r.__esModule?w(e,"default",{value:r,enumerable:!0}):e,r));var E=require("commander");var c=class{constructor({prompt:t,logger:e}){this.prompt=t,this.logger=e,this.sWorkDir=process.cwd()}async invoke(){try{await this.prepare(),await this.execute(),await this.finalize()}catch(t){let e=t;this.logger.errorD(e),await this.rollback()}}setWorkDir(t){this.sWorkDir=t}};var F=j(require("moment")),n=class r{constructor(){}static getInstance(){return r.instance?this.instance.debug("Get Logger Instance"):(r.instance=new r,this.instance.debug("New Logger Instance")),r.instance}formatMessage(t,e,i){let o="\x1B[0m",v=(0,F.default)().format("YYYY.MM.DD HH:mm:ss"),T=process.pid;return`${v} | ${t}${e}${o} | ${i}`}debug(t){typeof t=="object"&&(t=JSON.stringify(t,null,2)),console.log(this.formatMessage("\x1B[36m","DEBUG",t))}info(t){console.info(this.formatMessage("\x1B[32m","INFO",t))}warn(t){console.warn(this.formatMessage("\x1B[33m","WARN",t))}error(t){console.error(this.formatMessage("\x1B[31m","ERROR",t))}errorD(t){console.error(this.formatMessage("\x1B[31m","ERROR DEBUG",`{
  type: '${t.title}'
  reason: '${t.message}'
}`))}space(){console.log()}};var s=class{constructor(t){this.logger=n.getInstance(),this.projectInfo=t}};var m=class extends s{constructor(t){super(t)}async build(){this.logger.info("Build Start (Default)")}getFactory(){var t;switch((t=this.projectInfo)==null?void 0:t.frameworkType){case"react":return new g(this.projectInfo);case"vue":return new l(this.projectInfo);case"express":return new f(this.projectInfo);default:return this}}};var g=class extends s{async build(){}};var l=class extends s{async build(){}};var f=class extends s{async build(){}};var p=class{constructor(t,e){this.logger=n.getInstance(),this.title=`${t}Exception`,this.message=e}};var C="OperationFail",u=class extends p{constructor(t){super(C,t),this.logger.error(`${t} \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.`)}convertMessage(){}};var d=class{constructor(){}static validateRequireFields(t,e){e.forEach(i=>{if(!t[i])throw new u(i);return!0})}};var h=[{type:"text",name:"projectName",message:"Enter the project name:",initial:"demo"},{type:"confirm",name:"useTypescript",message:"Use TypeScript?",initial:!0},{type:"confirm",name:"useFramework",message:"Use Framework?",initial:!0},{type:"confirm",name:"usePrettier",message:"Use Prettier?",initial:!0},{type:"confirm",name:"useEslint",message:"Use ESLint?",initial:!0}],x=[{type:"select",name:"frameworkType",message:"Select a framework:",choices:[{title:"\x1B[34mReact\x1B[0m",value:"react"},{title:"\x1B[32mVue\x1B[0m",value:"vue"}]}];var b=class extends c{constructor(){super(...arguments);this.projectInfo={}}async prepare(){this.logger.space();let e=await this.prompt.call(h);Object.assign(this.projectInfo,e);let i=h.map(o=>String(o.name));if(d.validateRequireFields(this.projectInfo,i),this.projectInfo.useFramework){let o=await this.prompt.call(x);d.validateRequireFields(o,x.map(v=>String(v.name))),Object.assign(this.projectInfo,o)}}async execute(){await new m(this.projectInfo).getFactory().build()}async finalize(){}async rollback(){}};var P=j(require("prompts"));var y=class{constructor(){this.prompt=P.default}async call(t){return await this.prompt(t)}};var a={name:"fury",version:"0.0.2",description:"CLI tool for JavaScript developers",main:"dist/app.js",bin:{fury:"./dist/app.js"},scripts:{build:"rm -rf dist && npx tsc && rm -rf types && node ./scripts/build.mjs",dev:"node ./dist/app.js"},keywords:[],author:"",license:"ISC",devDependencies:{"@types/node":"^20.12.7","@types/prompts":"^2.4.9","@types/update-notifier":"^6.0.8","ts-node":"^10.9.2",typescript:"^5.4.5"},dependencies:{commander:"^12.1.0",esbuild:"^0.22.0",moment:"^2.30.1",prompts:"^2.4.2","update-notifier":"^7.0.0"}};var I=class{constructor(){this.program=new E.Command,this.prompt=new y,this.logger=n.getInstance(),this.configureCommands()}async configureCommands(){this.program.name(a.name).option("no option","Start create project").option("-g, --git","Start git management",!1).version(a.version).description(a.description).action(async t=>{let{default:e}=await import("update-notifier");e({pkg:a}).notify(),this.logger.debug(e({pkg:a}).update);let i=this.getCommand(t);i&&await i.invoke()})}getCommand(t){let e={prompt:this.prompt,logger:this.logger};switch(!0){case t.git:return;default:return new b(e)}}run(){this.logger.info("Starting application..."),this.program.parse(process.argv)}};new I().run();

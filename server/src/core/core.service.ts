import { Injectable, OnApplicationBootstrap, Inject } from "@nestjs/common";
import { DiscoveryService, DiscoveredMethodWithMeta } from "@nestjs-plus/discovery";
import { MESSAGE_HANDLER_METADATA, MessageHandlerParamsTypes, MESSAGE_HANDLER_PARAMS_METADATA, CORE_MODULE_OPTIONS } from "./constants";
import { NlpService } from "./nlp/nlp.service";
import { CoreModuleOptions } from "./core.module";
import { Observable } from "rxjs";

@Injectable()
export class CoreService implements OnApplicationBootstrap {
  instancesMap = new Map<string, any>();
  nextCallback: Function | null = null;

  constructor(
    private nlpService: NlpService,
    private discovery: DiscoveryService,
    @Inject(CORE_MODULE_OPTIONS) private coreModuleOptions: CoreModuleOptions,
  ) {}

  async onApplicationBootstrap() {
    const methods = await this.discovery.providerMethodsWithMetaAtKey(MESSAGE_HANDLER_METADATA);
    methods.forEach(method => this.registerMessageHandler(method));
    await this.nlpService.train();
  }

  registerMessageHandler(method: DiscoveredMethodWithMeta<unknown>) {
    const { methodName, parentClass } = method.discoveredMethod;
    const intentName = `${parentClass.name}.${methodName}`;
    if (Array.isArray(method.meta)) {
      method.meta.forEach((utterance: string) => {
        this.nlpService.addDocument(utterance, intentName);
      });
    } else if (typeof method.meta === 'string') {
      this.nlpService.addDocument(method.meta, intentName);
    }

    Reflect.getMetadata(
      MESSAGE_HANDLER_PARAMS_METADATA,
      parentClass.instance,
      methodName,
     )?.forEach((paramMetadata: { type: MessageHandlerParamsTypes, data: any }) => {
       const { type, data } = paramMetadata;
       if (type === MessageHandlerParamsTypes.TRIM_ENTITY) {
         this.nlpService.addTrimEntity(data.name, data.options)
       }
     }); 

    this.instancesMap.set(parentClass.name, parentClass.instance);
  }

  async runMessageHandler(text: string): Promise<string | Observable<string>> {
    if (this.nextCallback) {
      const response = await this.nextCallback(text);
      this.nextCallback = null;
      return this.getResponseText(response);
    }
    const nlpResult = await this.nlpService.process(text);
    console.log('new message', {
      message: text,
      intent: nlpResult.intent,
    });
    const [instanceName, methodName] = nlpResult.intent.split('.');
    const instance = this.instancesMap.get(instanceName);
    if (!instance) {
      return this.dontKnowWhatToSay(text);
    }

    const args = Reflect.getMetadata(
      MESSAGE_HANDLER_PARAMS_METADATA,
      instance,
      methodName,
    )?.map((param: any) => {
      switch (param.type as MessageHandlerParamsTypes) {
        case MessageHandlerParamsTypes.MESSAGE_TEXT:
          return text;
        case MessageHandlerParamsTypes.TRIM_ENTITY:
          return nlpResult.entities.find(item => (
            item.type === 'trim' &&
            item.entity === param.data?.name
          ))?.utteranceText;
      }
    }) || [];

    const response = await instance[methodName](...args);

    if (response instanceof Observable) {
      return response;
    }

    if (Array.isArray(response) || typeof response === 'string') {
      return this.getResponseText(response);
    }

    if (response.text && response.nextCallback) {
      this.nextCallback = response.nextCallback;
      return response.text;
    }
  }
  
  getResponseText(response: string | string[]) {
    if (typeof response === 'string') {
      return response;
    }
    return response[ Math.floor(Math.random() * response.length) ];
  }

  dontKnowWhatToSay(text: string) {
    if (text.slice(-1) === '?') {
      return this.coreModuleOptions.notKnowMessage;
    }
    return this.coreModuleOptions.notUnderstandMessage;
  }
}

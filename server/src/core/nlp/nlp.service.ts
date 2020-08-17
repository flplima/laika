import { Injectable, Inject } from "@nestjs/common";
import { NlpManager } from 'node-nlp';

import { NlpResult, TrimEntityOptions } from "./nlp.types";
import { CORE_MODULE_OPTIONS } from "../constants";
import { CoreModuleOptions } from "../core.module";

@Injectable()
export class NlpService {
  nlpManager: any;
  language: string;

  constructor(
    @Inject(CORE_MODULE_OPTIONS) options: CoreModuleOptions,
  ) {
    this.language = options.language;
    this.nlpManager = new NlpManager({ languages: [this.language] });
  }

  addTrimEntity(name: string, options: TrimEntityOptions): void {
    if (options.after) {
      this.nlpManager.addAfterCondition(this.language, name, options.after);
    } else if (options.afterFirst) {
      this.nlpManager.addAfterFirstCondition(this.language, name, options.afterFirst);
    } else if (options.afterLast) {
      this.nlpManager.addAfterLastCondition(this.language, name, options.afterLast);
    } else if (options.before) {
      this.nlpManager.addBeforeCondition(this.language, name, options.before);
    } else if (options.beforeFirst) {
      this.nlpManager.addBeforeFirstCondition(this.language, name, options.beforeFirst);
    } else if (options.beforeLast) {
      this.nlpManager.addBeforeLastCondition(this.language, name, options.beforeLast);
    } else if (options.between) {
      this.nlpManager.addBetweenCondition(this.language, name, options.between[0], options.between[1]);
    }
  }

  addDocument(utterance: string, intent: string): void {
    this.nlpManager.addDocument(this.language, utterance, intent);
  }

  train(): Promise<void> {
    return this.nlpManager.train();
  }

  process(utterance: string): Promise<NlpResult> {
    return this.nlpManager.process(this.language, utterance);
  }
}

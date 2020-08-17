import { MESSAGE_HANDLER_METADATA, MESSAGE_HANDLER_PARAMS_METADATA, MessageHandlerParamsTypes } from "./constants";
import { TrimEntityOptions } from './nlp/nlp.types';

export function MessageHandler<T = string | string[]>(message: T): MethodDecorator {
  return function (
    target: object,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    Reflect.defineMetadata(MESSAGE_HANDLER_METADATA, message, descriptor.value);
    return descriptor;
  };
};

function getMessageHandlerParamsMetadata(
  target: any,
  key: string | symbol,
): Array<{ type: MessageHandlerParamsTypes, data?: any }> {
  return Reflect.getOwnMetadata(
    MESSAGE_HANDLER_PARAMS_METADATA,
    target,
    key,
  ) || [];
}

export function MessageText(): ParameterDecorator {
  return function(
    target: any,
    key: string | symbol,
    parameterIndex: number,
  ) {
    const params = getMessageHandlerParamsMetadata(target, key);
    params[parameterIndex] = {
      type: MessageHandlerParamsTypes.MESSAGE_TEXT,
    };
    Reflect.defineMetadata(
      MESSAGE_HANDLER_PARAMS_METADATA,
      params,
      target,
      key,
    );
  }
}

export function TrimEntity(
  name: string,
  options: TrimEntityOptions,
): ParameterDecorator {
  return (
    target: any,
    key: string | symbol,
    parameterIndex: number,
  ) => {
    const params = getMessageHandlerParamsMetadata(target, key);
    params[parameterIndex] = {
      type: MessageHandlerParamsTypes.TRIM_ENTITY,
      data: { name, options },
    };
    Reflect.defineMetadata(
      MESSAGE_HANDLER_PARAMS_METADATA,
      params,
      target,
      key,
    );
  }
}

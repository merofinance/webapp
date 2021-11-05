export declare type SendReturnResult = {
  result: any;
};
export declare type SendReturn = any;
export declare type Send = (
  method: string,
  params?: any[]
) => Promise<SendReturnResult | SendReturn>;
export declare type SendOld = ({
  method,
}: {
  method: string;
}) => Promise<SendReturnResult | SendReturn>;

export interface Ethereum {
  send: unknown;
  enable: () => Promise<string[]>;
  on?: (method: string, listener: (...args: any[]) => void) => void;
  removeListener?: (method: string, listener: (...args: any[]) => void) => void;
}

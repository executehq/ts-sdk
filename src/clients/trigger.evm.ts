import Chains from "../types/chains";
enum ethTriggerTypes {
  EVENT = "event",
  METHOD = "method",
}
export default class actionClient {
  chain: Chains;
  constructor(chain: Chains) {
    this.chain = chain;
  }

  onEvent(contractAddress: string, event: string, abi: any) {
    return {
      value: {
        platform: this.chain,
        trigger: ethTriggerTypes.EVENT,
        address: contractAddress,
        name: event,
        abi: abi,
      },
    };
  }
}

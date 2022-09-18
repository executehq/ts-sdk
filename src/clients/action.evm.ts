import Chains from "../types/chains";

enum evmActionTypes {
  CONTRACT_INTERACTION = "contract",
}
export default class actionClient {
  chain: Chains;
  constructor(chain: Chains) {
    this.chain = chain;
  }

  callContract(contractAddress: string, method: string, params: any[]) {
    return {
      value: {
        platform: this.chain,
        action: evmActionTypes.CONTRACT_INTERACTION,
        address: contractAddress,
        method: method,
        params: params,
      },
      response: {
        address: "string",
      },
    };
  }
}

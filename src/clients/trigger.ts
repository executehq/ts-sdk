import Chains from "../types/chains";
import evmTriggers from "./trigger.evm";
export default class triggerClient {
  eth: evmTriggers;
  polygon: evmTriggers;
  constructor() {
    this.eth = new evmTriggers(Chains.ETHEREUM);
    this.polygon = new evmTriggers(Chains.POLYGON);
  }

  OnWebhook(apiKey?: string) {
    return {
      value: {
        platform: "webhook",
        trigger: "webhook",
        apiKey: apiKey,
      },
    };
  }
}

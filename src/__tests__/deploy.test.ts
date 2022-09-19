import executeSdk from "../";
describe("deploy", () => {
  test("should deploy", async () => {
    const { execute, triggers, actions } = new executeSdk();
    const app = execute.new();
    await app
      .addTrigger(
        triggers.eth.onEvent(
          "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          "Transfer",
          [
            {
              constant: true,
              inputs: [],
              name: "name",
              outputs: [
                {
                  name: "",
                  type: "string",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              constant: false,
              inputs: [
                {
                  name: "_spender",
                  type: "address",
                },
                {
                  name: "_value",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  name: "",
                  type: "bool",
                },
              ],
              payable: false,
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              constant: true,
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  name: "",
                  type: "uint256",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              constant: false,
              inputs: [
                {
                  name: "_from",
                  type: "address",
                },
                {
                  name: "_to",
                  type: "address",
                },
                {
                  name: "_value",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  name: "",
                  type: "bool",
                },
              ],
              payable: false,
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              constant: true,
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  name: "",
                  type: "uint8",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              constant: true,
              inputs: [
                {
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  name: "balance",
                  type: "uint256",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              constant: true,
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  name: "",
                  type: "string",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              constant: false,
              inputs: [
                {
                  name: "_to",
                  type: "address",
                },
                {
                  name: "_value",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  name: "",
                  type: "bool",
                },
              ],
              payable: false,
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              constant: true,
              inputs: [
                {
                  name: "_owner",
                  type: "address",
                },
                {
                  name: "_spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  name: "",
                  type: "uint256",
                },
              ],
              payable: false,
              stateMutability: "view",
              type: "function",
            },
            {
              payable: true,
              stateMutability: "payable",
              type: "fallback",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
          ]
        )
      )
      .addAction(
        actions.callApi(
          "https://httpdump.app/dumps/b3cf2c7b-7bb9-4fea-b6b2-d155bac61f10",
          "POST",
          {
            hi: "there",
          }
        )
      )
      .deploy();
  });
});

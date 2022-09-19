import executeSdk from "../";
describe("deploy", () => {
  test("should deploy", async () => {
    const { execute, triggers, actions } = new executeSdk(
      "42475e1d-8aa0-47de-95e3-fea89990e170",
      "$2b$10$18a8yZvdcks7uiAaOslIxO"
    );
    const app = execute.new();
    await app
      .addTrigger(
        triggers.polygon.onEvent(
          "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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
          "https://httpdump.app/dumps/82b8b312-3c46-459c-ae08-28e1884815b7",
          "POST",
          {
            hi: "there",
          }
        )
      )
      .deploy();
  });
});

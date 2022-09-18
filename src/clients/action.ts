import Chains from "../types/chains";
import ethActions from "./action.evm";

enum apiCallMethods {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

enum customCodeLanguages {
  JAVASCRIPT = "javascript",
}

export default class actions {
  eth: ethActions;
  polygon: ethActions;

  constructor() {
    this.eth = new ethActions(Chains.ETHEREUM);
    this.polygon = new ethActions(Chains.POLYGON);
  }

  sendWebhook(url: string) {
    return {
      value: {
        platform: "webhook",
        action: "webhook",
        url: url,
      },
    };
  }

  callApi(
    url: string,
    method: string,
    body: any = {},
    headers: any = {},
    query: any = {}
  ) {
    return {
      value: {
        platform: "api",
        action: "api",
        endpoint: url,
        method: method,
        body: body,
        headers: headers,
        query: query,
      },
    };
  }

  sendNotification(body: string, dest: string) {
    if (
      dest.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/
      )
    ) {
      if (dest.includes("discord.com")) {
        if (
          dest.match(
            `^(?:http(s)?:\\/\\/)(discord)[.](com)\\/api\\/webhooks\\/[0-9]+\\/[A-Z, a-z, 0-9, _, -]+`
          )
        ) {
        } else {
          return {
            error: "INVALID_DISCORD_WEBHOOK",
          };
        }
      } else if (dest.includes("hooks.slack.com")) {
        if (
          dest.match(
            `^(?:http(s)?:\\/\\/)(hooks)[.](slack)[.](com)\\/services\\/T[0-9, A-Z]+\\/B[0-9, A-Z]+\\/[a-z,A-Z,0-9]+`
          )
        ) {
        } else {
          return {
            error: "INVALID_SLACK_WEBHOOK",
          };
        }
      } else if (dest.includes("api.telegram.org")) {
        if (
          /^(?:http(s)?:\/\/)(api)[.](telegram)[.](org)\/bot[0-9]+:[A-Z,a-z,0-9]+\/sendMessage\?chat_id\=[0-9]+/gm.exec(
            dest
          )
        ) {
        } else {
          return {
            error: "INVALID_TELEGRAM_WEBHOOK",
          };
        }
      }
    } else if (dest.match(`^\\w+([.-]?\\w+)*@\\w+([.-]?\\w+)*\\.\\w{2,3}`)) {
    } else {
      return {
        error: "INVALID_DESTINATION",
      };
    }
    return {
      value: {
        platform: "notification",
        action: "notification",
        body: body,
        channel: dest,
      },
    };
  }

  // runCustomCode(
  // COMING SOON ;)
  // }
}

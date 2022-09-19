/* eslint-disable turbo/no-undeclared-env-vars */
import { Chains } from "./types";
import { actionClient, triggerClient, apiClient } from "./clients";
import { ExecuteError } from "./errors";
interface metaData {
  name: string;
}
interface ExecuteOptions {
  log?: boolean;
}
interface initialOptions {
  accessKey?: string;
  secretKey?: string;
  log?: boolean;
}
interface finalOption {
  accessKey: string;
  secretKey: string;
  log: boolean;
}

class raidClient {
  private apiKey: string;
  private secretKey: string;

  constructor(apiKey: string, secretKey: string) {
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  new() {
    return new raidApp(this.apiKey, this.secretKey);
  }
}

class raidApp {
  private api: apiClient;
  triggers: any[] = [];
  actions: any[] = [];
  errors: any = [];

  constructor(apiKey: string, secretKey: string) {
    this.api = new apiClient(apiKey, secretKey);
  }

  addAction(action: any) {
    const { error, value } = action;
    if (error) {
      this.errors.push(error);
    } else {
      this.actions.push(value);
    }
    return this;
  }

  addTrigger(trigger: any) {
    const { error, value } = trigger;
    if (error) {
      this.errors.push(error);
    } else {
      this.triggers.push(value);
    }
    return this;
  }

  async deploy(metadata?: metaData) {
    if (this.actions.length === 0) {
      this.errors.push("NOACTION");
    }
    if (this.triggers.length === 0) {
      this.errors.push("NOTRIGGER");
    }
    if (this.errors.length > 0) {
      throw new ExecuteError(this.errors, "deploy");
    }

    const { error, value } = await this.api.post("apps", null, {
      metadata,
      triggers: this.triggers,
      actions: this.actions,
    });
    if (error) {
      throw new ExecuteError(["APIERROR"], "deploy");
    }

    return { ...value };
  }
}

class sdk {
  execute: raidClient;
  actions: actionClient;
  triggers: triggerClient;
  constructor(
    accessKey?: string,
    secretKey?: string,
    options?: ExecuteOptions
  ) {
    const finalOption = this.optionInjector({
      accessKey,
      secretKey,
      ...options,
    });
    const x = new raidClient(finalOption.accessKey, finalOption.secretKey);
    this.execute = x;
    this.actions = new actionClient();
    this.triggers = new triggerClient();
  }

  private optionInjector(options: initialOptions): finalOption {
    const x: any = {};
    x.accessKey =
      options.accessKey || (process.env.EXECUTE_ACCESS_KEY as string) || "";
    x.secretKey =
      options.secretKey || (process.env.EXECUTE_SECRET_KEY as string) || "";

    x.log = options.log || true;
    if (!x.accessKey || !x.secretKey) {
      throw new ExecuteError(["NOKEY"], "optionInjector");
    }
    return x;
  }
}

export { Chains };
export default sdk;

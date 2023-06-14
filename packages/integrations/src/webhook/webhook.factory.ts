import { and } from '@undb/domain'
import type { WebhookSpecification } from './specifications/index.js'
import {
  WithWebhookEnabled,
  WithWebhookId,
  WithWebhookMethod,
  WithWebhookTarget,
  WithWebhookURL,
} from './specifications/index.js'
import { Webhook } from './webhook.js'
import type { IUnsafeCreateWebhook } from './webhook.type.js'

export class WebhookFactory {
  static create(...specs: WebhookSpecification[]): Webhook {
    return and(...specs)
      .unwrap()
      .mutate(Webhook.empty())
      .unwrap()
  }

  static unsafeCreate(input: IUnsafeCreateWebhook): Webhook {
    return this.create(
      WithWebhookId.fromString(input.id),
      WithWebhookURL.fromString(input.url),
      WithWebhookTarget.from(input.target),
      new WithWebhookEnabled(input.enabled),
      WithWebhookMethod.fromString(input.method),
    )
  }
}

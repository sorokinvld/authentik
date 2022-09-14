import { PFSize } from "@goauthentik/elements/Spinner";
import "@goauthentik/elements/Spinner";
import { AggregateCard } from "@goauthentik/elements/cards/AggregateCard";

import { TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { until } from "lit/directives/until.js";

@customElement("ak-aggregate-card-promise")
export class AggregatePromiseCard extends AggregateCard {
    @property({ attribute: false })
    promise?: Promise<Record<string, unknown>>;

    promiseProxy(): Promise<TemplateResult> {
        if (!this.promise) {
            return new Promise<TemplateResult>(() => html``);
        }
        return this.promise.then((s) => {
            return html`<i class="fa fa-check-circle"></i>&nbsp;${s.toString()}`;
        });
    }

    renderInner(): TemplateResult {
        return html`<p class="center-value">
            ${until(this.promiseProxy(), html`<ak-spinner size="${PFSize.Large}"></ak-spinner>`)}
        </p>`;
    }
}

import { html, LitElement } from '@polymer/lit-element/lit-element';
import { TemplateResult } from 'lit-html/lit-html';

const DEFAULT_STAGE_WIDTH: string = '640px';

export class ImageGallery extends LitElement {
    public activityTitle: string = 'Hello World';
    public position: number = 0;
    private itemCount: number = 0;

    static get properties(): { [key: string]: string | object } {
        return {
            position: Number,
            itemCount: Number,
            activityTitle: String
        };
    }

    public get stageWidth(): string {
        return getComputedStyle(this as any).getPropertyValue('--stage-width') || DEFAULT_STAGE_WIDTH;
    }

    public get styles(): TemplateResult {
        return html`
            .flex {
                margin-left: ${-(this.position % this.itemCount) * parseInt(this.stageWidth)}px;
            }`;
    }

    public _firstRendered() {
        setInterval(() => this.position++, 2000);
    }

    protected _render({ activityTitle }: ImageGallery): TemplateResult {
        const style: TemplateResult = html`<style>${this.styles}</style>`;

        return html`
            <link rel="stylesheet" type="text/css" href="/dist/css/image-gallery.css">
            ${style}
            <h3>${activityTitle}</h3>
            <div class="stage">
                <div class="flex">
                    <slot name="items" on-slotchange="${(e: Event) => this.slotChanged(e)}"></slot>
                </div>
            </div>`;
    }

    /**
     * Update the UI whenever nodes are added or removed from the slot
     *
     * @param event
     */
    private slotChanged(event: Event) {
        const slot: HTMLSlotElement = event.srcElement as HTMLSlotElement;
        const nodes: Node[] = slot.assignedNodes();
        if (slot) {
            this.itemCount = nodes.length;
            for (const el of nodes as HTMLElement[]) {
                el.removeAttribute('hidden');
                const img: HTMLImageElement = el.querySelector('img');
                if (img) {
                    el.querySelector('img').style.height = 'inherit';
                }
            }
        }
    }
}

customElements.define('image-gallery', ImageGallery);

import { html, LitElement } from '@polymer/lit-element/lit-element';
import { TemplateResult } from 'lit-html/lit-html';

export class ImageGallery extends LitElement {
    public position: number = 0;
    public statement: string = 'Hello World';
    private slideCount: number = 0;

    static get properties(): { [key: string]: string | object } {
        return {
            position: Number,
            slideCount: Number,
            stageHeight: Number,
            stageWidth: Number,
            statement: String
        };
    }

    public styles(position: number, slideCount: number): TemplateResult {
        const stageWidth = getComputedStyle(this as any).getPropertyValue('--stage-width');

        return html`
            .flex {
                display: flex;
                align-items: center; 
                margin-left: ${-(position % slideCount) * parseInt(stageWidth)}px;
                transition: margin-left 1s ease-in-out;
            }

            .stage {
                width: var(--stage-width, 100%);
                height: var(--stage-height,100vh);
                overflow: hidden;
            }

            ::slotted(figure){
                margin: 0;
                padding: auto;
                height: var(--stage-height,100vh);
                min-width: var(--stage-width, 100%);
            }`;
    }

    public _firstRendered() {
        console.log('calling first rendered');
        const slot: HTMLSlotElement = this.shadowRoot.querySelector('slot');
        const nodes: Node[] = slot.assignedNodes();

        for (const el of nodes as HTMLElement[]) {
            el.removeAttribute('hidden');
            el.querySelector('img').style.height = 'inherit';
        }

        setInterval(() => this.position++, 2000);
    }

    protected _render({ statement, position, slideCount }: ImageGallery): TemplateResult {
        const style: TemplateResult = html`<style>${this.styles(position, slideCount)}</style>`;

        return html`
            ${style}
            <h3>${statement}</h3>
            <div class="stage">
                <div class="flex">
                    <slot name="items" on-slotchange="${(e: Event) => this.slotChanged(e)}"></slot>
                </div>
            </div>`;
    }

    private slotChanged(event: Event) {
        const slot: HTMLSlotElement = event.srcElement as HTMLSlotElement;
        if (slot) {
            this.slideCount = slot.assignedNodes().length;
        }

        console.log('SLOT CHANGED', this.slideCount);
    }
}

customElements.define('image-gallery', ImageGallery);

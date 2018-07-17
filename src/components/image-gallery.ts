import { html, LitElement } from '@polymer/lit-element/lit-element';
import { TemplateResult } from 'lit-html/lit-html';

export class ImageGallery extends LitElement {
    public slide: number = 0;
    public stageHeight: number;
    public stageWidth: number;
    public statement: string = 'Hello World';
    private slideCount: number = 0;

    static get properties(): { [key: string]: string | object } {
        return {
            slide: Number,
            slideCount: Number,
            stageHeight: Number,
            stageWidth: Number,
            statement: String
        };
    }

    public _firstRendered() {
        console.log('calling first rendered');
        const slot: HTMLSlotElement = this.shadowRoot.querySelector('slot');

        const nodes: Node[] = slot.assignedNodes();

        for (const el of nodes as HTMLElement[]) {
            el.removeAttribute('hidden');
            el.querySelector('img').style.height = 'inherit';
        }

        this.slideCount = nodes.length;
        setInterval(() => this.slide++, 2000);
    }

    protected _render({ statement, stageWidth, stageHeight, slide, slideCount }: ImageGallery): TemplateResult {
        const css: TemplateResult = html`
        .flex {
            display: flex;
            align-items: center; 
            margin-left: ${-(slide % slideCount) * stageWidth}px;
            transition: margin-left 1s ease-in-out;
        }

        .stage {
            width: ${stageWidth}px;
            height: ${stageHeight}px;
            overflow: hidden;
        }

        ::slotted(figure){
            margin: 0;
            padding: 0;
            height: ${stageHeight}px;
            min-width: ${stageWidth}px;
        }`;

        const style: TemplateResult = html`<style>${css}</style>`;

        return html`
            ${style}
            <h3>${statement}</h3>
            <div class="stage">
                <div class="flex">
                    <slot name="items"></slot>
                </div>
            </div>`;
    }
}

customElements.define('image-gallery', ImageGallery);

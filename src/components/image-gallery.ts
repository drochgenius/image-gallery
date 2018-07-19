import { html, LitElement } from '@polymer/lit-element/lit-element';
import { TemplateResult } from 'lit-html/lit-html';

const DEFAULT_DELAY: number = 2000;
const DEFAULT_STAGE_WIDTH: string = '640px';

export class ImageGallery extends LitElement {
    public autoPlay: boolean = false;
    public activityTitle: string = 'Hello World';
    public position: number = 0;
    private itemCount: number = 0;
    private interval: NodeJS.Timer;

    static get properties(): { [key: string]: string | object } {
        return {
            autoPlay: Boolean,
            position: Number,
            itemCount: Number,
            activityTitle: String
        };
    }

    public get stageWidth(): string {
        return getComputedStyle(this as any).getPropertyValue('--stage-width') || DEFAULT_STAGE_WIDTH;
    }

    public get styles(): TemplateResult {
        return html`.flex { margin-left: ${-this.position * parseInt(this.stageWidth)}px; }`;
    }

    /**
     * Play the slideshow, switching automatically after the specified delay
     *
     * @param delay : time to wait before switching to the next slide
     * @param reverse : reverse playback direction
     */
    public play(delay: number = DEFAULT_DELAY, reverse: boolean = false): void {
        this.pause();
        this.interval = setInterval(() => (reverse ? this.prev() : this.next()), delay);
    }

    public pause(): void {
        clearInterval(this.interval);
    }

    public next(): ImageGallery {
        this.position = (this.position + 1) % this.itemCount;
        return this;
    }

    public prev(): ImageGallery {
        this.position = (this.itemCount + (this.position - 1)) % this.itemCount;
        return this;
    }

    public goto(position: number = 0): void {
        if (Math.abs(position) > this.itemCount) {
            position = 0;
        }

        if (position >= 0) {
            this.position = position % this.itemCount;
        } else {
            this.position = (this.itemCount + position) % this.itemCount;
        }
    }

    public _firstRendered(): void {
        if (this.autoPlay) {
            this.play();
        }
    }

    protected _render({ activityTitle }: ImageGallery): TemplateResult {
        console.log('POSITION IS', this.position);
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
    private slotChanged(event: Event): void {
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

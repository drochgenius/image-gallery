import { html, LitElement } from '../../node_modules/@polymer/lit-element/lit-element.js';
import { TemplateResult } from '../../node_modules/lit-html/lit-html.js';

const DEFAULT_DELAY: number = 2000;
const DEFAULT_STAGE_WIDTH: string = '640px';

class ImageGallery extends LitElement {
    public autoPlay: boolean = false;
    public activityTitle: string = 'Hello World';
    public position: number = 0;
    private count: number = 0;
    private interval: NodeJS.Timer;

    static get properties(): { [key: string]: string | object } {
        return {
            autoPlay: Boolean,
            count: Number,
            position: Number,
            activityTitle: String
        };
    }

    public get stageWidth(): string {
        return getComputedStyle(this as any).getPropertyValue('--stage-width') || DEFAULT_STAGE_WIDTH;
    }

    public get styles(): TemplateResult {
        return html`.carousel { margin-left: ${-this.position * parseInt(this.stageWidth)}px; }`;
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
        this.position = this.count ? (this.position + 1) % this.count : 0;
        return this;
    }

    public prev(): ImageGallery {
        this.position = this.count ? (this.count + (this.position - 1)) % this.count : 0;
        return this;
    }

    public goto(position: number = 0): void {
        if (Math.abs(position) > this.count) {
            position = 0;
        }

        if (position >= 0) {
            this.position = this.count ? position % this.count : 0;
        } else {
            this.position = this.count ? (this.count + position) % this.count : 0;
        }
    }

    public _firstRendered(): void {
        if (this.autoPlay) {
            this.play();
        }

        const nodes = (this as LitElement).shadowRoot.querySelector('slot').assignedNodes();
        for (const el of nodes as HTMLElement[]) {
            el.removeAttribute('hidden');
        }
    }

    protected _render({ activityTitle, count, position }: ImageGallery): TemplateResult {
        const style: TemplateResult = html`<style>${this.styles}</style>`;

        return html`
            <link rel="stylesheet" type="text/css" href="/dist/css/image-gallery.css">
            <link rel="stylesheet" type="text/css" href="/node_modules/@material/button/dist/mdc.button.css">
            ${style}
            <main>
                <h3>${activityTitle}</h3>
                <section class="stage">
                    <div class="carousel">
                        <slot name="items" on-slotchange="${(e: Event) => this.slotChanged(e)}"></slot>
                    </div>
                </section>
                <nav>
                    <button class="mdc-button" on-click="${() => this.prev()}" disabled="${position <= 0}">previous</button>
                    <span>${count > 0 ? position + 1 : 0} of ${count}</span>
                    <button class="mdc-button" on-click="${() => this.next()}" disabled="${position >= count - 1}">next</button>
                </nav>
            </main>
            `;
    }

    /**
     * Update the UI whenever nodes are added or removed from the slot
     *
     * @param event
     */
    private slotChanged(event: Event): void {
        const slot: HTMLSlotElement = event.srcElement as HTMLSlotElement;
        if (slot) {
            const nodes: Node[] = slot.assignedNodes();
            if (nodes) {
                this.count = nodes.length;
                for (const el of nodes as HTMLElement[]) {
                    const img: HTMLImageElement = el.querySelector('img');
                    if (img) {
                        el.querySelector('img').style.height = 'inherit';
                    }
                }
            }
        }
    }
}

customElements.define('image-gallery', ImageGallery);

import { loadFixture } from './test-fixture.js';

declare const describe: any;
declare const chai: any;
declare const it: any;
declare const mocha: any;

const expect: any = chai.expect;
const tagName: string = 'image-gallery';

describe(`<${tagName}>`, (): void => {
    it('should be true', (): void => {
        const value: boolean = false;
        expect(value).to.be.true;
    });

    it('should show default activity title', (): void => {
        loadFixture('default');
        const el: HTMLElement = document.querySelector(tagName);
        expect(el.shadowRoot).not.to.be.undefined;
        const title: HTMLHeadingElement = el.shadowRoot.querySelector('h3');
        expect(title.textContent).to.equal('Hello World');
    });

    it('should show custom activity title', (): void => {
        loadFixture('activity-title');
        const el: HTMLElement = document.querySelector(tagName);
        expect(el.shadowRoot).not.to.be.undefined;
        const title: HTMLHeadingElement = el.shadowRoot.querySelector('h3');
        expect(title.textContent).to.equal('custom activity title');
    });

    it('should display child node in the stage area', (): void => {
        loadFixture('single-item');
        const el: HTMLElement = document.querySelector(tagName);
        expect(el.shadowRoot).not.to.be.undefined;
        const slot: HTMLSlotElement = el.shadowRoot.querySelector('slot');
        const assignedNodes: Node[] = slot.assignedNodes();
        expect(assignedNodes.length).to.equal(1);
        const node: Node = assignedNodes[0];
        expect(node.textContent.trim()).to.equal('ITEM');
    });

    it('should only display child node assigned to the items slot', (): void => {
        loadFixture('no-slot');
        const el: HTMLElement = document.querySelector(tagName);
        expect(el.shadowRoot).not.to.be.undefined;
        const slot: HTMLSlotElement = el.shadowRoot.querySelector('slot');
        const assignedNodes: Node[] = slot.assignedNodes();
        expect(assignedNodes.length).to.equal(1);
        const node: Node = assignedNodes[0];
        expect(node.textContent.trim()).to.equal('ITEM');
    });

    it('should display correct values in the navigation bar', async (): Promise<void> => {
        loadFixture('three-items');
        const el: any = document.querySelector(tagName);
        await el.renderComplete;

        expect(el.shadowRoot).not.to.be.undefined;

        const span: HTMLSpanElement = el.shadowRoot.querySelector('nav > span');
        expect(span.innerText).to.equal('1 of 3');
        el.next();
        await el.renderComplete;
        expect(span.innerText).to.equal('2 of 3');
        el.prev();
        await el.renderComplete;
        expect(span.innerText).to.equal('1 of 3');
        el.goto(2);
        await el.renderComplete;
        expect(span.innerText).to.equal('3 of 3');
    });

    it('should auto play when autoPlay attribute is set', async (): Promise<void> => {
        loadFixture('auto-play');
        const el: any = document.querySelector(tagName);
        await el.renderComplete;

        expect(el.shadowRoot).not.to.be.undefined;
    });
});

mocha.run();

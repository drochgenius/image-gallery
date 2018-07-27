import { loadFixture } from './test-fixture';

declare const describe: any;
declare const chai: any;
declare const it: any;

const { expect } = chai;
const tagName = 'image-gallery';

describe(`<${tagName}>`, (): void => {
    it('should be true', (): void => {
        const value: boolean = true;
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

    it('should cover', (): void => {
        loadFixture('no-slot');
        const el: HTMLElement = document.querySelector(tagName);

        (el as any).next();
    });
});

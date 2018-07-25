import { loadFixture } from './test-fixture';

declare const describe: any;
declare const chai: any;
declare const it: any;

const { expect } = chai;

describe('test', (): void => {
    it('should be true', (): void => {
        const value: boolean = true;
        expect(value).to.be.true;
    });

    it('should be true', (): void => {
        loadFixture('default', 'main');
        expect(true).to.be.false;
        //const el: HTMLElement = document.getElementById('element');
        //expect(el.shadowRoot).to.deep.equal({});
    });
});

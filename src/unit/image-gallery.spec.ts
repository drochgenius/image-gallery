declare const describe: any;
declare const chai: any;
declare const it: any;

const { expect } = chai;

describe('test', (): void => {
    it('should be true', (): void => {
        const value: boolean = true;
        expect(value).to.be.true;
    });
});

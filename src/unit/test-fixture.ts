export function loadFixture(fixtureId: string, targetId: string):void {
    const templateElement: HTMLTemplateElement = document.getElementById(fixtureId) as HTMLTemplateElement;
    const mainElement: HTMLMainElement = document.getElementById(targetId);

    const content: Node = templateElement.content.cloneNode(true);
    mainElement.innerHTML = '';
    mainElement.appendChild(content);
}

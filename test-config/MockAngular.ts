export class MenuControllerMock {
    public close(): any {
        return;
    }
    public enable(): any {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export class RouterStub {
    url = '';
    navigateForward(commands: any[], extras?: any) { }
}

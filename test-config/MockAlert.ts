export class MockAlert {
    public visible: boolean;
    public header: string;
    public message: string;

    constructor(props: any) {
        Object.assign(this, props);
        this.visible = false;
    }

    present() {
        this.visible = true;
        return Promise.resolve();
    }

    dismiss() {
        this.visible = false;
        return Promise.resolve();
    }
}

export class MockAlertController {
    public created: MockAlert[];

    constructor() {
        this.created = [];
    }

    create(props: any): Promise<any> {
        const toRet = new MockAlert(props);
        this.created.push(toRet);
        return Promise.resolve(toRet);
    }

    getLast() {
        if (!this.created.length) {
            return null;
        }
        return this.created[this.created.length - 1];
    }
}

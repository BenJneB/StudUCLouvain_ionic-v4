import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    loading: any;
    isLoading = false;

    constructor(public loadingController: LoadingController) {
    }

    async present(message: string) {
        if (this.loading === undefined) {
            this.loading = await this.loadingController.create({
                message: message
            });
            if (!this.isLoading) {
                return await this.loading.present().then(() => {
                    this.isLoading = true;
                });
            }
        }
    }

    async dismiss() {
        if (this.isLoading) {
            await this.loading.dismiss();
            this.isLoading = false;
            this.loading = undefined;
        }
    }
}

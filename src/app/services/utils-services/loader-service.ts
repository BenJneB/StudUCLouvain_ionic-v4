import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { }

  isLoading = false;

  async present(message: string) {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: message
    });
    await loading.present();
    if (!this.isLoading) {
      loading.dismiss();
    }
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then();
  }
}

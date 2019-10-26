import { AlertService } from 'src/app/services/utils-services/alert-service';
import { AlertController, ToastController } from '@ionic/angular';
import { newMockUserService } from '../../../../../test-config/MockUtilsService';
import { newMockTranslateService } from '../../../../../test-config/Mock';
import { newModalControllerMock } from '../../../../../test-config/MockIonicNative';

function newServiceInstance() {
    const translate = newMockTranslateService();
    const user = newMockUserService();
    let alert: AlertController, modalCtrl = newModalControllerMock(), toast: ToastController;
    return new AlertService(toast, user, translate, alert, modalCtrl);
}

describe('AlertService', () => {
    let service: AlertService;

    beforeEach(() => {
        service = newServiceInstance();
    });

    it('should create service', () => expect(service).toBeDefined());

    describe('dismissFilterToast method', () => {
        it('should present alert', () => {
            const spyPresent = spyOn(service.modalCtrl, 'dismiss').and.callThrough();
            service.dismissFilterToast({}, undefined);
            expect(spyPresent.calls.count()).toEqual(1);
        });
    });

    describe('applyFilters method', () => {
        it('should dismiss filter toast', () => {
            const spyDismiss = spyOn(service, 'dismissFilterToast').and.callThrough();
            service.applyFilters([], {});
            expect(spyDismiss.calls.count()).toEqual(1);
        });
    });
});

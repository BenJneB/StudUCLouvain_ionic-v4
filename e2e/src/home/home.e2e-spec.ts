import { browser } from 'protractor';

import { HomePage } from '../../../src/app/home/home.po';

describe('HomePage', () => {
    const page = new HomePage();

    it('should display HomePage', () => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toContain('home');
    });

    const pages = ['studies', 'lib', 'support', 'news', 'event', 'sport', 'map', 'mobility', 'settings', 'guindaille'];
    // missing emergency and rest
    for (const p of pages) {
        it('should access ' + p + 'Page from menu', () => {
            page.clickOnButton('#' + p);
            // browser.sleep(1000);
            expect(browser.getCurrentUrl()).toContain(p);
            page.navigateTo();
            // browser.sleep(1000);
        });
    }
});

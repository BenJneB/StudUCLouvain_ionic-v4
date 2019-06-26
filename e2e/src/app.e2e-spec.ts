import { browser, by, element } from 'protractor';

import { HomePage } from './app.po';

describe('new App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should launch TutoPage. The user could slide n slides before be redirected to HomePage and choose its campus and ', () => {
    page.navigateTo();
    const slides = element(by.css('.tutoSlides'));
    element.all(by.className('tutoSlide')).count().then(numSlides => {
      expect(browser.getCurrentUrl()).toContain('tuto');
      for (let i = 0; i < numSlides - 1; i++) {
        page.slideElemToLeft(slides);
      }
      page.clickOnButton('#goHome');
      expect(browser.getCurrentUrl()).toContain('home');
      page.clickOnButton('#LLN');
      page.clickOnButton('#okbutton');
    });
    browser.sleep(1000);
  });
});

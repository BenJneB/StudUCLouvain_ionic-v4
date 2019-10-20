import { browser, by, element } from 'protractor';

import { AppComponent } from '../../src/app/app.po';

describe('new App', () => {
  const page = new AppComponent();
  browser.waitForAngularEnabled(false);

  it('should display TutoPage', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('tuto');
  });

  it('could slide n slides before be redirected to HomePage', () => {
    const slides = element(by.css('.tutoSlides'));
    element.all(by.className('tutoSlide')).count().then(numSlides => {
      for (let i = 0; i < numSlides - 1; i++) {
        page.slideElemToLeft(slides);
      }
      page.clickOnButton('#goHome');
      expect(browser.getCurrentUrl()).toContain('home');
      browser.sleep(1000);
    });
  });

  it('should choose its campus and finally be redirected to Home Page', () => {
    page.clickOnButton('#LLN');
    page.clickOnButton('#okbutton');
    browser.sleep(1000);
  });

  it('should display HomePage if not first launch', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('home');
  });
});

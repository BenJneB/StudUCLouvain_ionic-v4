import { browser, by, element } from 'protractor';
import { range } from 'rxjs';

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
        slideElemToLeft(slides);
        browser.sleep(250);
      }
      element(by.css('#goHome')).click();
      browser.sleep(250);
      element(by.css('#LLN')).click();
      browser.sleep(250);
      element(by.css('#okbutton')).click();
    });
    browser.sleep(5000);
  });
});

function slideElemToLeft(elem) {
  browser.actions()
    .mouseDown(elem)
    .mouseMove({ x: -50, y: 0 }) // yes, few times by 50 pixels, with single mouseMove ionic can't catch swipe event
    .mouseMove({ x: -50, y: 0 })
    .mouseMove({ x: -50, y: 0 })
    .mouseUp()
    .perform();
}


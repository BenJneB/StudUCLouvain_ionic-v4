import { browser, by, element } from 'protractor';

import { HomePage } from './app.po';

describe('new App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should be blank', () => {
    page.navigateTo();
    const elem = element(by.id('slides'));
    slideElemToLeft(elem);
    browser.sleep(5000);
    // expect(page.getParagraphText()).toContain('');
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


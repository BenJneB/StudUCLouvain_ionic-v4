import { browser, by, element } from 'protractor';

export class AppComponent {
    navigateTo() {
        return browser.get('/');
    }

    getParagraphText() {
        return element(by.deepCss('app-root ion-content')).getText();
    }

    clickOnButton(cssSelector) {
        element(by.css(cssSelector)).click();
    }

    slideElemToLeft(elem) {
        browser.actions()
            .mouseDown(elem)
            .mouseMove({x: -50, y: 0}) // yes, few times by 50 pixels, with single mouseMove ionic (3? test with 4 !) can't catch swipe event
            .mouseMove({x: -50, y: 0})
            .mouseMove({x: -50, y: 0})
            .mouseUp()
            .perform();
        browser.sleep(250);
    }
}

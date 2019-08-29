import { browser, by, element } from 'protractor';

export class HomePage {
    navigateTo() {
        return browser.get('/home');
    }

    getParagraphText() {
        return element(by.deepCss('app-root ion-content')).getText();
    }

    clickOnButton(cssSelector) {
        // browser.actions().mouseMove(elem).click().perform();
        element(by.css(cssSelector)).click();
    }

    slideElemToLeft(elem) {
        browser.actions()
            .mouseDown(elem)
            .mouseMove({ x: -50, y: 0 })
            .mouseMove({ x: -50, y: 0 })
            .mouseMove({ x: -50, y: 0 })
            .mouseUp()
            .perform();
        browser.sleep(250);
    }
}

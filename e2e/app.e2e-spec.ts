import { AppShoppingStorePage } from './app.po';

describe('app-shopping-store App', () => {
  let page: AppShoppingStorePage;

  beforeEach(() => {
    page = new AppShoppingStorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

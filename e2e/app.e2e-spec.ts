import { GroupProjectPage } from './app.po';

describe('group-project App', () => {
  let page: GroupProjectPage;

  beforeEach(() => {
    page = new GroupProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

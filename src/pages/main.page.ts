import { Page, Locator } from '@playwright/test';

export class MainPage {
  constructor(private page: Page) {}
  // проверка успешного входа
  async isLoginSuccessful(): Promise<boolean> {
    // Проверяем наличие элемента, который появляется только после успешного входа
    const userProfile = this.page.getByRole('heading', { name: 'Главная' });
    return await userProfile.isVisible();
  }
}

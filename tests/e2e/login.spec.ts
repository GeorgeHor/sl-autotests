import { LoginPage } from '../../src/pages/login.page';
import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open();
  });

  //  Тест на успешный вход с валидными учетными данными
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(process.env.USER_LOGIN!, process.env.USER_PASSWORD!);

    await expect(page.getByRole('heading', { name: 'Главная' })).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page.ts';

test.describe('набор тестов', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(process.env.USER_LOGIN!, process.env.USER_PASSWORD!);
  });

  test('Проверка перехода по кнопкам Запросить КП и Интренет-магазин', async ({
    page,
    context,
  }) => {
    // Проверяем переход по кнопке "Интернет-магазин"
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Интернет-магазин' }).click(),
    ]);
    await expect(newPage).toHaveURL('https://store.softline.ru/');

    // Проверяем переход по кнопке "Запросить коммерческое предложение"
    const [newPage2] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: 'Запросить коммерческое предложение' }).click(),
    ]);
    await expect(newPage2).toHaveURL('https://store.softline.ru/writeorder/');
  });

  // проверка доступа разделов для юзера SEA
  test('user SEA. Доступность Важные даты, Соглашение и договоры и Преимущества', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    const importantDates = page.getByRole('link', { name: 'Важные даты' });
    const agreementsAndContracts = page.getByRole('link', { name: 'Соглашение и договоры' });
    const advantages = page.getByRole('link', { name: 'Преимущества1' });

    await expect(importantDates).toBeVisible();
    await expect(agreementsAndContracts).toBeVisible();
    await expect(advantages).toBeVisible();
  });
});

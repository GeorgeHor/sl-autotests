import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page.ts';
import { users } from '../../src/config/user.ts';

test.describe('набор тестов', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.defaultUser.login, users.defaultUser.password);
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
    const advantages = page.getByRole('link', { name: 'Преимущества' });

    await expect(importantDates).toBeVisible();
    await expect(agreementsAndContracts).toBeVisible();
    await expect(advantages).toBeVisible();
  });
});

test.describe('отображение оферты', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('отображение оферты Клиент компании SEA', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Войти в систему под юзером SEA', async () => {
      await loginPage.login(users.clientSeaOfferta.login, users.clientSeaOfferta.password);
    });

    await test.step('Проверка отображения оферты', async () => {
      await expect(page.getByRole('heading', { name: 'Договор оферта' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Подписать' })).toBeVisible();
    });
  });

  test('отображение оферты Клиент SL решения', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Войти в систему под юзером SL решения', async () => {
      await loginPage.login(users.SLSolutionsUser.login, users.SLSolutionsUser.password);
    });

    await test.step('Проверка оферта не отображается', async () => {
      await expect(page.getByRole('heading', { name: 'Договор оферта' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Подписать' })).not.toBeVisible();
    });
  });

  test('отображение оферты Посетитель', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Войти в систему под юзером Посетитель', async () => {
      await loginPage.login(users.GuestUser.login, users.GuestUser.password);
    });

    await test.step('Проверка оферта не отображается', async () => {
      await expect(page.getByRole('heading', { name: 'Договор оферта' })).not.toBeVisible();
      await expect(page.getByRole('button', { name: 'Подписать' })).not.toBeVisible();
    });
  });
});

test.describe('Доступность разделов для всех типов юзеров(SEA, SL решения, Посетитель)', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
  });

  test('Доступность разделов для юзера SEA', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Войти в систему под юзером SEA', async () => {
      await loginPage.login(users.clientSea.login, users.clientSea.password);
    });

    await test.step('Проверка отображения разделов', async () => {
      await expect(page.getByRole('link', { name: 'Важные даты' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Соглашение и договоры' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Преимущества' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Демокафе' })).toBeVisible();
    });
  });

  test('Доступность разделов для юзера SL решения', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Войти в систему под юзером SL решения', async () => {
      await loginPage.login(users.SLSolutionsUser.login, users.SLSolutionsUser.password);
    });

    await test.step('Проверка отображения разделов', async () => {
      await expect(page.getByRole('link', { name: 'Важные даты' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: 'Соглашение и договоры' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: 'Преимущества' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: 'Демокафе' })).not.toBeVisible();
    });
  });

  test('Доступность разделов для юзера Посетитель', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Войти в систему под юзером Посетитель', async () => {
      await loginPage.login(users.GuestUser.login, users.GuestUser.password);
    });

    await test.step('Проверка отображения разделов', async () => {
      await expect(page.getByRole('link', { name: 'Важные даты' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: 'Соглашение и договоры' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: 'Преимущества' })).not.toBeVisible();
      await expect(page.getByRole('link', { name: 'Демокафе' })).not.toBeVisible();
    });
  });
});

import { users } from '../../src/config/user.ts';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page.ts';
import { ProductsPage } from '../../src/pages/products.page.ts';
import { time } from 'node:console';

test.describe('Проверка раздела "Продукты"', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(users.SLSolutionsUser.login, users.SLSolutionsUser.password);
  });

  test('Фильтрация по имени через строку поиска', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await test.step('Открыть раздел "Продукты"', async () => {
      await productsPage.openProductPage();
    });

    await test.step('Ввести название продукта в строку поиска', async () => {
      await productsPage.searchProduct('3 Программа AT');
    });

    await test.step('Проверить, что продукт отображается в результатах поиска', async () => {
      //   await expect(productsPage.isProductVisible('3 Программа AT'));
      await expect(productsPage.getProductByName('3 Программа AT')).toBeVisible();
      await expect(productsPage.getProductByName('Программа AT (2)')).not.toBeVisible();
    });
  });

  test('Фильтрация по вендору', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await test.step('Открыть раздел "Продукты"', async () => {
      await productsPage.openProductPage();
    });

    await test.step('Выбрать вендора из выпадающего списка', async () => {
      await productsPage.selectVendor('AT_1CBitrix');
    });

    await test.step('Проверить, что продукт отображается в результатах поиска', async () => {
      await expect(productsPage.getProductByName('3 Программа AT')).toBeVisible();
      await expect(productsPage.getProductByName('Программа AT (2)')).not.toBeVisible();
    });
  });

  test('Фильтрация по типу продукта', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await test.step('Открыть раздел "Продукты"', async () => {
      await productsPage.openProductPage();
    });

    await test.step('Выбрать тип продукта из выпадающего списка', async () => {
      await productsPage.selectProductType('ПО');
    });

    await test.step('Проверить, что продукт отображается в результатах поиска', async () => {
      await expect(productsPage.getProductByName('3 Программа AT')).toBeVisible();
      await expect(productsPage.getProductByName('Программа AT (2)')).not.toBeVisible();
    });
  });
});

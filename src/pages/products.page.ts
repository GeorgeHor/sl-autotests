import { Page } from '@playwright/test';

// ProductsPage класс для взаимодействия с разделом "Продукты"
export class ProductsPage {
  constructor(private page: Page) {}

  // открытие раздела "Продукты"
  async openProductPage() {
    await this.page.getByRole('link', { name: 'Продукты' }).click();
  }

  // ввод текста в поле поиска продуктов
  async searchProduct(productName: string) {
    await this.page.getByPlaceholder('Поиск по названию продукта').fill(productName);
  }

  // выбор вендора из выпадающего списка
  async selectVendor(vendorName: string) {
    await this.page.getByRole('textbox', { name: 'Вендор' }).click();
    await this.page.locator('label').filter({ hasText: 'AT_1CBitrix' }).click();
    // клик вне фильтра для снятия фокуса с поля
    await this.page.getByPlaceholder('Поиск по названию продукта').click();
  }

  // выбор Типа продукта из выпадающего списка
  async selectProductType(productType: string) {
    await this.page.getByRole('textbox', { name: 'Тип продукта' }).click();
    await this.page.locator('label').filter({ hasText: 'Оборудование' }).click();
    // клик вне фильтра для снятия фокуса с поля
    await this.page.getByPlaceholder('Поиск по названию продукта').click();
  }

  // проверка отображения продукта в результатах поиска
  async isProductVisible(name: string): Promise<boolean> {
    const productElement = this.page.getByText(name);
    return await productElement.isVisible();
  }

  // получение имени найденного продукта
  getProductByName(name: string) {
    return this.page.getByText(name);
  }
}

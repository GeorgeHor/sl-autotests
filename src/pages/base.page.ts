import { Page } from '@playwright/test';

// BasePage класс для общих методов и свойств страниц
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string): Promise<void> {
    await this.page.goto(url);
  }
}

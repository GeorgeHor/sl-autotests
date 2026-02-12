import { Page, Locator } from '@playwright/test';

// LoginPage класс для страницы входа в систему
export class LoginPage {
  constructor(private page: Page) {}

  // Локаторы элементов страницы
  usernameInput() {
    return this.page.getByRole('textbox', { name: 'Введите почту' });
  }

  passwordInput() {
    return this.page.getByRole('textbox', { name: 'Введите пароль' });
  }

  loginButton() {
    return this.page.getByRole('button', { name: 'Войти' });
  }

  skipButton() {
    return this.page.getByRole('button', { name: 'Пропустить' });
  }

  async open() {
    await this.page.goto(
      'https://sea.softline.com.khoroshunovet.stage.slweb.cloud/licensing-center/',
    );
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
    await this.skipButton().click();
  }

  // проверка успешного входа
  async isLoginSuccessful(): Promise<boolean> {
    // Проверяем наличие элемента, который появляется только после успешного входа
    const userProfile = this.page.getByRole('heading', { name: 'Главная' });
    return await userProfile.isVisible();
  }
}

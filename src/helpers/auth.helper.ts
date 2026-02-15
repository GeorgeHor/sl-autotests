import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users } from '../config/user';

export type User = {
  login: string;
  password: string;
};

export async function loginAs(page: Page, user: User) {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(user.login, user.password);
}

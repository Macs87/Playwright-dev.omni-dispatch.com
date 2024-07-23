import { test, expect } from '../src/fixtures/base';
import { LoginPage } from '../src/pages/login.page';
import { goto } from '../src/pages/navigatable';
import dotenv from 'dotenv';

dotenv.config();

test.describe("Testing login page", () => {
  test('successful login test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await goto(loginPage);
    await loginPage.login();
    await expect(page.getByRole('button', { name: "Test User" })).toBeVisible();
  });

  test ('Successful login with correct creds', async ({ page, loginPage, driversPage, steps }) => {
    await steps.login(loginPage, driversPage)
    await expect(page.getByRole('button', { name: 'Test User' })).toBeVisible();
  });

  test('failed login test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login_failed();
    await expect(page.getByRole('alert').getByText("Wrong Email or password")).toBeVisible();
  })
})

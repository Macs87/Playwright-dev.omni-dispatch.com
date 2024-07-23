import { Base } from "./base";
import dotenv from 'dotenv';
import { Navigatable } from "./navigatable";

dotenv.config();

export class LoginPage extends Base implements Navigatable {
    readonly emailField = this.getByType('email');
    readonly passwordField = this.getByType('password');
    readonly loginButton = this.page.getByRole('button', { name: 'Log in' });

    async login() {
        const email: string = process.env.APP_EMAIL || '';
        const password: string = process.env.PASSWORD || '';

        console.log(`Email: ${email}`);  // Проверка значения email
        console.log(`Password: ${password}`);  // Проверка значения password
        
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.page.waitForResponse('/api/v1/dispatchers/me?')
    }

    async login_failed() {
        await this.page.goto('https://dev.omni-dispatch.com/login');
        
        await this.loginButton.click();
    }

    url() {
        return '/login';
    }

    async waitForLoadState() {
        await this.page.waitForLoadState('networkidle');
    }
}
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage"

export class LoginPage extends BasePage {
    readonly signUp: Locator;
  
    constructor(page: Page){
        super(page)
        this.signUp = page.getByRole('link', { name: /sign up/i })
    }

    async verifyPage(){
      await expect(this.signUp).toBeVisible();
    }
      
    login(email: string, password: string){

    }

    async clickSignUp(){
        await this.signUp.click()
    }

    clickRecoverPassword(){

    }
}
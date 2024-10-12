import { expect, Page } from '@playwright/test';

export class MapPage {
    page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  
  async verifyPinColorChange() {
    const activePin = await this.page.$('div[data-testid="map/markers/BasePillMarker"]');
    const color = await activePin?.evaluate(el => getComputedStyle(el).backgroundColor);
    return color === 'rgb(34, 34, 34)'; 
  }

  
  async clickActivePin(propertyName : string) {
   const pin = await this.page.getByRole('button', { name: propertyName}).nth(2);
   await pin.click();
  }

  
  async checkPopUpDetails(title : string) {
   
    const titlemap = this.page.getByTestId('map/GoogleMap').getByTestId('card-container').getByLabel(title)

    await expect(titlemap).toBeInViewport()
    

  }
}
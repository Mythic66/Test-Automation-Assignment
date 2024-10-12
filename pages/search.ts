import { Locator, Page, expect} from '@playwright/test'

export default class SearchElements {
    page : Page;
   

    constructor(page:Page) {
        this.page = page;
    }

async checkSearchBarVisibility(){

    const searchbar = await this.page.getByTestId('structured-search-input-field-query')
    await expect(searchbar).toBeInViewport()

    }

async enterSearchValue(searchvalue : string){

    const searchbar = await this.page.getByTestId('structured-search-input-field-query')
    await searchbar.fill(searchvalue);

    
    }


async selectDateOneWeekFromCurrentDate(){
    
   // using the built in date system to make it easy to select dates

    const today = new Date();
    const checkInDate = new Date();
    checkInDate.setDate(today.getDate() + 7);
    const checkOutDate = new Date();
    checkOutDate.setDate(checkInDate.getDate() + 7);
    
    const formatDate = (date: Date) => {
        const day = date.getDate();
        const weekday = date.toLocaleString('en-US', { weekday: 'long' });
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        return `${day}, ${weekday}, ${month} ${year}`;
      };

    const checkInSelector = formatDate(checkInDate);
    const checkOutSelector = formatDate(checkOutDate);
    await this.page.getByTestId('structured-search-input-field-split-dates-0').click();
    
    
    await this.page.getByLabel(`${checkInSelector}`).click(); // Pick check-In date

    await this.page.getByLabel(`${checkOutSelector}`).click();  // Pick check-Out date
     
        
    
    }

    async selectGuests(){

        const adulltsCounter= this.page.getByTestId('stepper-adults-value')
        const childrensCounter= this.page.getByTestId('stepper-children-value')
        const guests = await this.page.getByTestId('structured-search-input-field-guests-button')
        await guests.click();
        const adults = await this.page.getByTestId('stepper-adults-increase-button')
        await adults.click();
        await adults.click();
        await expect(adulltsCounter).toHaveText('2')
        const childrens = await this.page.getByTestId('stepper-children-increase-button')
        await childrens.click()
        await expect(childrensCounter).toHaveText('1')
        
    }

    async clickSearch(){

        const search= this.page.getByTestId('structured-search-input-search-button')
        await search.click();     
        
    }

    async checkSearchFilter(location : string , numberOfGuest : string ){

    const today = new Date();
    const checkInDate = new Date();
    checkInDate.setDate(today.getDate() + 7);
    const formatMonth = (date: Date) => date.toLocaleString('en-US', { month: 'short' });

    const checkInMonth = formatMonth(checkInDate);
    

        const locationfilter = await this.page.getByTestId('little-search-location')
        const datefilter = await this.page.getByTestId('little-search-date')
        const guestfilter = await this.page.getByTestId('little-search-guests')
        await expect(datefilter).toContainText(`${checkInMonth}`)
        await expect(locationfilter).toContainText(location);
        await expect(guestfilter).toContainText(numberOfGuest);
       
        
    }

    async clickfilters(){

        const filter= this.page.getByTestId('category-bar-filter-button')
        await filter.click();     
        
    }

    async increaseNumberOfBedrooms(maxNumber : number){

        const bedroomcount= this.page.getByTestId('stepper-filter-item-min_bedrooms-stepper-increase-button')
        await bedroomcount.scrollIntoViewIfNeeded()
        await expect(bedroomcount).toBeInViewport
        for (let i = 0; i < maxNumber; i++) {
            await bedroomcount.click(); // Click the "+" button to increase bedroom count
          }    
        
    }

    async selectPoolOption(){

        const showOptions = this.page.getByRole('link', { name: 'Show' });
        const poolOption = this.page.getByRole('button', { name: 'Pool' });
        const showmore= this.page.getByRole('button', { name: 'Show more' });
        await showmore.scrollIntoViewIfNeeded();
        await showmore.click(); 
        await poolOption.scrollIntoViewIfNeeded();
        await poolOption.click();
        await showOptions.click();

        
    }

    async checkBedroomCountForProperty(){

        const bedroomInfo = await this.page.getByTestId('listing-card-subtitle').nth(1);
        await expect(bedroomInfo).toBeVisible();
        await expect(bedroomInfo).toContainText('5 bedrooms');

    }

    async clickOnFirstProperty(){

        const property = await this.page.getByTestId('card-container').first();
        await expect(property).toBeInViewport()
        await property.click();
        await this.page.waitForTimeout(3000)

    }

    async getFirstPropertyCard() {

        return await this.page.getByTestId('card-container').first();

      }
    
      // Hover over the first property card
    async hoverOverFirstProperty() {

        const firstPropertyCard = await this.getFirstPropertyCard();
        if (firstPropertyCard) {
          await firstPropertyCard.hover();
        }

      }
    
      // Get the title of the first property (to compare with map details later)
    async getFirstPropertyDetails() {
        
        const firstPropertyCard = await this.getFirstPropertyCard();
        const titleElement = await firstPropertyCard.getByTestId('listing-card-title');
        const priceElement = await firstPropertyCard.getByTestId('price-availability-row');;

        const title = await titleElement?.innerText();
        const price = await priceElement?.innerText();

    return { title, price };      

    }

}
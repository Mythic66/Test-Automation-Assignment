import test, { expect } from "@playwright/test";
import SearchElements from "../pages/search";
import { MapPage } from "../pages/map-page";


const baseURL = process.env.ENV_BASE_URL || '';

// The test cases are written in a manner that would be easy to read using page objects and making the assertion on those page object so that
// the test cases look clean , also each method in the page objects are named as to be test steps



test.beforeEach(async ({page}) => {

    const loaded = new SearchElements(page)
    await page.goto(baseURL,  {waitUntil: 'domcontentloaded'})

})

test('Verify search button', async ({page}) => {

    const search = new SearchElements(page)
    await search.enterSearchValue('Rome, Italy');
    await search.selectDateOneWeekFromCurrentDate()
    await search.selectGuests()
    await search.clickSearch()
    await search.checkSearchFilter('Rome' , '3 guests')
    

})

test('Add extra filters to a search option', async ({page }) => {
    const search = new SearchElements(page)
    await search.enterSearchValue('Rome, Italy');
    await search.selectDateOneWeekFromCurrentDate()
    await search.selectGuests()
    await search.clickSearch()
    await search.checkSearchFilter('Rome' , '3 guests')
    await search.clickfilters()
    await search.increaseNumberOfBedrooms(5)
    await search.selectPoolOption()
    await search.checkBedroomCountForProperty()

})

test('Check Property on map', async ({page }) => {
    const search = new SearchElements(page)
    const map= new MapPage(page)
    await search.enterSearchValue('Rome, Italy');
    await search.selectDateOneWeekFromCurrentDate()
    await search.selectGuests()
    await search.clickSearch()
    await search.checkSearchFilter('Rome' , '3 guests')
    await search.clickfilters()
    await search.increaseNumberOfBedrooms(5)
    await search.selectPoolOption()
    await search.checkBedroomCountForProperty()
    await search.getFirstPropertyCard()
    await search.hoverOverFirstProperty()
    await search.getFirstPropertyDetails()
    const { title } = await search.getFirstPropertyDetails()
    await map.verifyPinColorChange()
    await map.clickActivePin(`${title}`)
    await map.checkPopUpDetails(`${title}`)
    

})




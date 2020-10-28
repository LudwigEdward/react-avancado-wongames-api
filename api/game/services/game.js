'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */
const axios = require('axios')
const slugify = require('slugify');

async function getGameInfo(slug){
  const jsdom = require('jsdom')
  const {JSDOM} = jsdom;
  const body = await axios.get(`https://www.gog.com/game/${slug}`)
  const dom = new JSDOM(body.data);

  const ratingElement = dom.window.document.querySelector(".age-restrictions__icon use")
  const description = dom.window.document.querySelector(".description");
  return{
    rating: ratingElement ? ratingElement.getAttribute("xlink:href").replace(/_/g,"").replace(/[^\w-]+/g,"") : "BR0",
    short_description: description.textContent.trim().slice(0,160),
    description:description.innerHTML,
  }
}
async function getByName(name,entityName){
  const item = await strapi.services[entityName].find({name})
  return item.length ? item[0] : null
}

async function create(name,entityName){
  const item = await getByName(name,entityName)
  if(!item){
    return await strapi.services[entityName].create({
      name,
      slug:slugify(name, {lower: true}),
    })
  }
}

async function createManyToManyData(products){
  const developers = {};
  const publishers = {};
  const categories = {};
  const platforms = {};

  products.forEach(product => {
    const {developer, publisher, genres, supportedOperationalSystems} = product;

    genres && genres.forEach(item => {
      categories[item] = true
    })
    supportedOperationalSystems && supportedOperationalSystems.forEach(item => {
      platforms[item] = true
    })
    developers[developer] = true;
    publishers[publisher] = true;
  })

  return Promisse.all([
    ...Object.keys(developers).map((name)=> create(name,"developer")),
    ...Object.keys(publishers).map((name)=> create(name,"publisher")),
    ...Object.keys(categories).map((name)=> create(name,"category")),
    ...Object.keys(platforms).map((name)=> create(name,"platform"))
  ])

}

module.exports = {
  populate: async (params) =>{
    const gogApiUrl = `https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&sort=popularity`
    const {data : { products }} = await axios.get(gogApiUrl)
    const gameInfo = await getGameInfo(products[1].slug)
    await create(products[0].publisher, "publisher")
    await create(products[0].developer, "developer")
  }

};

import '../component/hero-element';
import '../component/best-restaurants';
import '../component/loader';
import RestaurantSource from '../../data/restaurant-resource';
import { createRestoItemTemplate } from '../template/template-creator';

const Home = {
    async render() {
        return `
        <loader-content></loader-content>
        <hero-element></hero-element>
        <best-restaurants></best-restaurants>
        `;
    },

    async afterRender() {
        const listRestoElement = document.querySelector('#restaurants');
        const loader = document.querySelector('.loader-wrapper');
        try {
            const restaurantsListDb = await RestaurantSource.listResto();
            restaurantsListDb.restaurants.forEach((restaurant) => {
                listRestoElement.innerHTML += createRestoItemTemplate(restaurant);
            });
            loader.style.display = 'none';
        } catch {
            loader.style.display = 'none';
            // eslint-disable-next-line no-alert
            alert('Sorry, your device is offline');
        }
    },
};

export default Home;

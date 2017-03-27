import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import routes from './router';
import VueResource from 'vue-resource';
import {
    Button,
    Header,
    Tabbar,
    Group,
    Cell,
    TabItem,
    Flexbox,
    FlexItem,
    Spinner,
    Field,
    Popup,
    Grid,
    InfiniteScroll
}from 'vue-uther';
Vue.component(Button.name, Button);
Vue.component(Header.name, Header);
Vue.component(Cell.name, Cell);
Vue.component(Group.name, Group);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Flexbox.name, Flexbox);
Vue.component(FlexItem.name, FlexItem);
Vue.component(Spinner.name, Spinner);
Vue.component(Field.name, Field);
Vue.component(Popup.name, Popup);
Vue.component(Grid.name, Grid);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(InfiniteScroll);
Vue.http.options.emulateJSON = true;


const isAPUS = window.ApusHelpJS;
/* 是否在APUS Help app 里面 */
let common_code = `44Sob781XOEMSpaDByQvQZEphG018uNxxvik1Bu3wGiRAu0jMbPJxzhk6nZb+EVF1GFqAxSBYjvT1Amj2iCJfVWmHb1zgaGYL4LYGUAJgx7xvTVS4WeC6D1GOqu7KDa4A17MkY4wpNUHV+2ooPC6ElzI09kFgPEtrl+I6YvIftWoByTk826W2Qrpr5scu96DkoOacK6G8sAzcpbSJAYst88OB9zPSCFtbI7dBNFTas1EykrDcJ5ZrP2YMgZ+7I+LH0b2SeHBNUhEnS2GtJ7NbK6mJAHn08I5ZORrAUeEuntrNueyD5CZB82UNhTjQIwPez25yc3EmZblX736lcw22CN//tOYOUQqvMw+PRl4htVQCZiPIVbJC7bnmz1MJyudXWSnywOCmJVaJ662KMbpNmjOi51YqI8sDaRI/IG/aYAqMU18HDtM9qZssZ6BV0USvBW5dZP9Oi2otOQr6P6o1VvzquELf5xC27+3K6R4XPpSanxZw8cNcdjPNz7nuR9ahou3FVj0Mz/g6WjaP/zJVaFdkV0/xx/DVwxdC75n8rUMuB6pZ2+BWJskS0PHQ4oHsaW2ny/9bEXRKjoxmKeAlzElHEcy3Ov0bJGbGDtwIlG8he+ih6UEpNUh7vO2Ry8NzEm8p9M1cVi5TyUvXmkB7AN7h42g0Smd`;
//let common_code = `44Sob781XOE4Ya9EDOzRVidbEk6RcUcjqdluFLScelQMuAsut4bXk5We6cMHUFExD5FEMRKtKR+N1vqeeU/iazul83e0JFnhL4LYGUAJgx7xvTVS4WeC6D1GOqu7KDa4A17MkY4wpNUTq5TldMl1+VzI09kFgPEtrl+I6YvIftWC5VtkLtWR2BYMb6zZLaghkoOacK6G8sAM0gInnQG+QPrthOtLenWxiQSeCyoleJrvksOSx72Oy7PZfsrdnYrV/0uB+daltQKXAol4H1dYs66mJAHn08I5ZORrAUeEuntrNueyD5CZB82UNhTjQIwPez25yc3EmZblX736lcw22CN//tOYOUQqvMw+PRl4htVQCZiPIVbJC7bnmz1MJyudgevXhaJ6LfRFeaB6I55I1+oKYYJYYuNwOzCIV9h3xy/hwR+nq/rJHyVqmonOd/0NQjsh+Jlj54SsNWoW4i0iqPW23uk+0nbntBE6CrKCEjrkAZHi/bfWyq8fLpq9/3UaGkfccI5VYipH4lgD++q7OTM6oHg7nM3Bedgnmqd1Zblvv7bcQOXygGJ8yW9e7wi3r9UotTODaltYereqwd+yY9NhHNmOFPowD/IT/CMa/Kunjm6b/p1M/51Tl50jwuQI6VCqAE1PcNCvDHsk9tkXs9OmBVtUsX2Wis0FcOQVetc=`;

if (isAPUS) common_code = window.ApusHelpJS.getHelpParams();

Vue.http.interceptors.push((request, next) => {
    if (request.method == "POST") {
        if (request.body) {
            request.body.common_code = common_code;
        } else {
            request.body = {
                common_code
            }
        }
    }
    // continue to next interceptor
    next();
});

const router = new VueRouter({
    base: __dirname,
    routes
});

router.afterEach(function (transition) {
  //console.log(transition);
  //GA 打点
  const topUrl = "/help/#"+transition.fullPath;//完整的页面路径
  window.ga && ga('send', 'pageview', topUrl);
});

new Vue({ // eslint-disable-line
    el: '#app',
    render: h => h(App),
    router
});

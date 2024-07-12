import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLaptopCode, faCookieBite, faCompactDisc, faToolbox,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import { faLinkedin, faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/assets/index.scss'

library.add(
  faLaptopCode, faCookieBite, faCompactDisc, faToolbox, faChevronRight,
  faEnvelope, faCalendarAlt,
  faLinkedin, faGithub, faSpotify
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')

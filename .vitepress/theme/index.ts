import DefaultTheme from 'vitepress/theme'
import GrrOnline from './GrrOnline.vue'
import CpkCalc from './CpkCalc.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('GrrOnline', GrrOnline)
    app.component('CpkCalc', CpkCalc)
  }
}

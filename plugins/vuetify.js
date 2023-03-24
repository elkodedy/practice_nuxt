import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#00bcd4",
        secondary: "#8bc34a",
        accent: "#3f51b5",
        error: "#e91e63",
        warning: "#ffeb3b",
        info: "#2196f3",
        success: "#4caf50"
      }
    }
  }
});

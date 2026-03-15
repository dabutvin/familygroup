import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          "on-surface": "#333",
          "on-surface-variant": "#333",
          "on-background": "#333",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
  },
});

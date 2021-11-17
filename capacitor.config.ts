import { CapacitorConfig } from "@capacitor/cli";
import { configuration } from "./configuration";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: configuration.nameApp,
  webDir: "out",
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;

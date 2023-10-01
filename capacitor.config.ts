import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nalu.app",
  appName: "nalu",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;

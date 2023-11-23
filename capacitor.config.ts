import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nalu.app",
  appName: "NALU",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;

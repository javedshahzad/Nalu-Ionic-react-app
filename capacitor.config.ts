import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.nalu.app",
  appName: "NALU",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    LiveUpdates: {
      appId: "042a1261",
      channel: "Production",
      autoUpdateMethod: "background",
      maxVersions: 2,
    },
  },
};

export default config;

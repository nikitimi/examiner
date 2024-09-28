import { ExpoConfig, ConfigContext } from "expo/config";

const name = process.env.APPLICATION_NAME ?? "examiner";
const version = process.env.VERSION ?? "1.0.1";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name,
  slug: name,
  version,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    buildNumber: version,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.syntexia.examiner",
    // versionCode: parseFloat(version),
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "686dceb3-c933-40e5-bbb0-fdaf76c37350",
    },
  },
});

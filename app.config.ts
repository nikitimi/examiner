import { ExpoConfig, ConfigContext } from "expo/config";

const name = process.env.APPLICATION_NAME ?? "examiner";
const version = process.env.VERSION ?? "1.0.0";
const flatVersion = process.env.VERSION_IN_APP_CONFIG ?? "1";

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
    backgroundColor: "#000000",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: flatVersion,
    buildNumber: flatVersion,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.nikitimi.examiner",
    versionCode: parseInt(flatVersion, 10),
    googleServicesFile: `${process.env.GOOGLE_SERVICES_FILE}`,
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router", "@react-native-firebase/app"],
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

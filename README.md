# Examiner

I created this application for the mock exams for Medical field students (especially for V), to practice their knowledge and help them in the upcoming board exams.

I chose examiner as the initial name of the projet referencing the street that I'm currently staying in Quezon City, Philippines. And also because this is a tool for examination.

# Changelogs:

**v1.0.3**

- Added the Hemostasis and Thrombosis see the `lib/books/hemostasis_and_thrombosis` directory for the questions and answers.

**v1.0.2**

- Added the `a.txt` and `q.txt` files for the answers and questions respectively as reference for using the questions_data_formatter.sh script.

```bash
 ~/bash questions_data_formatter.sh <q.txt> <a.txt> <outputFilename(optional)>
```

**v1.0.1**

- Added the schema for the books and questions located in the `lib/utils/schema` directory.
- Moved from `npm` to `pnpm` as the main package manager.

# Issues:

**v1.0.2**

- Add support for optional question field for images and tables. (backtrack chapter 1 hematology, look for tables and pictures).
- Building the app only shows blank white screen.

---

# Bootstrapped with [Expo](https://expo.dev)

The following paragraphs are generated by Expo.

This is an project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  loginScreen: {
    title: "Welcome",
    subTitle: "Welcome to your Portal",
    loginBtn: "Login",
    signUpBtn: "Sign Up",
    emailLabel: "Email",
    passwordLabel: "Password",
    restorePassword: "Restore password",
  },
  signUpScreen: {
    title: "Sign Up",
    subTitle: "Welcome to your Portal",
    signUpBtn: "Sign Up",
    loginBtn: "Login",
    emailLabel: "Email",
    passwordLabel: "Password",
    confirmPasswordLabel: "Confirm Password",
  },
  commonValidations: {
    required: "{{fieldName}} is Required",
    email: "Email is invalid",
    password: "Password is invalid",
    confirmPassword: "Passwords do not match",
    passwordsDoNotMatch: "Passwords do not match",
    minLength: "{{fieldName}} must be at least {{min}} characters",
    maxLength: "{{fieldName}} must be at most {{max}} characters",
  },
  profileImageUploadScreen: {
    title: "Welcome",
    subTitle: "You are logged in for the first time and can upload a profile photo",
  }
}

export default en
export type Translations = typeof en

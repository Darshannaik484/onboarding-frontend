import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      common: { loading: "Loading..." },
      auth: {
        loginTitle: "Sign in",
        loginDescription: "Use your account credentials to continue onboarding.",
        registerTitle: "Create account",
        registerDescription: "Create your account to start the onboarding workflow.",
        email: "Email",
        password: "Password",
        name: "Full name",
        confirmPassword: "Confirm password",
        loginButton: "Sign in",
        registerButton: "Create account",
        noAccount: "Don't have an account?",
        hasAccount: "Already have an account?",
        registerLink: "Register",
        loginLink: "Sign in",
        loginFailed: "Unable to sign in. Please check your credentials.",
        registerFailed: "Unable to register account. Please try again.",
      },
      validation: {
        email: "Please enter a valid email address.",
        passwordMin: "Password is too short.",
        nameMin: "Name must be at least 2 characters.",
        passwordMismatch: "Passwords do not match.",
      },
    },
  },
  hi: {
    translation: {
      common: { loading: "लोड हो रहा है..." },
      auth: {
        loginTitle: "साइन इन करें",
        loginDescription: "ऑनबोर्डिंग जारी रखने के लिए अपने खाते से लॉगिन करें।",
        registerTitle: "खाता बनाएं",
        registerDescription: "ऑनबोर्डिंग शुरू करने के लिए नया खाता बनाएं।",
        email: "ईमेल",
        password: "पासवर्ड",
        name: "पूरा नाम",
        confirmPassword: "पासवर्ड की पुष्टि करें",
        loginButton: "साइन इन",
        registerButton: "खाता बनाएं",
        noAccount: "क्या आपके पास खाता नहीं है?",
        hasAccount: "क्या आपके पास पहले से खाता है?",
        registerLink: "रजिस्टर करें",
        loginLink: "साइन इन करें",
        loginFailed: "साइन इन नहीं हो सका। कृपया विवरण जांचें।",
        registerFailed: "खाता नहीं बन सका। कृपया फिर प्रयास करें।",
      },
      validation: {
        email: "कृपया सही ईमेल पता दर्ज करें।",
        passwordMin: "पासवर्ड बहुत छोटा है।",
        nameMin: "नाम कम से कम 2 अक्षर का होना चाहिए।",
        passwordMismatch: "पासवर्ड मेल नहीं खाते।",
      },
    },
  },
  es: {
    translation: {
      common: { loading: "Cargando..." },
      auth: {
        loginTitle: "Iniciar sesión",
        loginDescription: "Usa tus credenciales para continuar el proceso.",
        registerTitle: "Crear cuenta",
        registerDescription: "Crea tu cuenta para iniciar el flujo de onboarding.",
        email: "Correo electrónico",
        password: "Contraseña",
        name: "Nombre completo",
        confirmPassword: "Confirmar contraseña",
        loginButton: "Iniciar sesión",
        registerButton: "Crear cuenta",
        noAccount: "¿No tienes una cuenta?",
        hasAccount: "¿Ya tienes una cuenta?",
        registerLink: "Registrarse",
        loginLink: "Iniciar sesión",
        loginFailed: "No se pudo iniciar sesión. Revisa tus credenciales.",
        registerFailed: "No se pudo crear la cuenta. Inténtalo de nuevo.",
      },
      validation: {
        email: "Ingresa un correo electrónico válido.",
        passwordMin: "La contraseña es demasiado corta.",
        nameMin: "El nombre debe tener al menos 2 caracteres.",
        passwordMismatch: "Las contraseñas no coinciden.",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

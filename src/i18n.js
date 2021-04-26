const messages = {
    en: {
        bmi: "BMI",
        title: "BMI Tracker",
        weight: "weight",
        height: "height",
        weightMeasure: "lb",
        heightMeasure: "ft/in",
        calculateButton: "Calculate BMI",
        date: "date"
    },
    pt: {
        bmi: "IMC",
        title: "Registrador de IMC",
        weight: "peso",
        height: "altura",
        weightMeasure: "kg",
        heightMeasure: "cm",
        calculateButton: "Calcular IMC",
        date: "data"
    }
}

const i18nConfig = {
    defaultLocale: 'us',
    messages,
}

const language = navigator.language.split(/[-_]/)[0];

export { i18nConfig, language };

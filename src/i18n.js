const messages = {
    en: {
        bmi: "BMI",
        title: "BMI Tracker",
        weight: "weight",
        height: "height",
        weightMeasure: "lb",
        heightMeasure: "ft/in",
        calculate: "Calculate BMI",
        date: "date",
        last7Days: "7 Day Data",
        noLogFound: "No log found",
        inPreposit: "in",
    },
    pt: {
        bmi: "IMC",
        title: "Registrador de IMC",
        weight: "peso",
        height: "altura",
        weightMeasure: "kg",
        heightMeasure: "cm",
        calculate: "Calcular IMC",
        date: "data",
        last7Days: "Dados de 7 dias",
        noLogFound: "Nenhum dado encontrado",
        inPreposit: "em",
    }
}

const i18nConfig = {
    defaultLocale: 'us',
    messages,
}

const language = navigator.language.split(/[-_]/)[0];

export { i18nConfig, language };

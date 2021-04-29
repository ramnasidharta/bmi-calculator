const messages = {
    en: {
        bmi: "BMI",
        title: "BMI Tracker",
        weight: "weight",
        height: "height",
        weightMeasure: "lb",
        heightMeasure: "cm",
        calculate: "Calculate BMI",
        date: "date",
        last7Days: "7 Day Data",
        noLogFound: "No log found",
        inPreposit: "in",
        weightFactor: 0.453
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
        weightFactor: 1
    }
}

const i18nConfig = {
    defaultLocale: 'us',
    messages,
}

const language = navigator.language.split(/[-_]/)[0];

function i18nDate(d) {
  if (language === 'en') {
     return new Date().toLocaleString(language).split(',')[0];
  } else if (language === 'pt') {
     return new Date().toLocaleString(language).split(' ')[0];
  }
  return new Date().toLocaleString().split(',')[0];
}

export { i18nConfig, language, i18nDate };

# I18n para um registrador de IMC

Implementado por Ramna Sidharta (16100742) e Thiago Martendal (16104594).

A internacionalização do "BMI Tracker" ou "Registrador de IMC" (índice de massa corpórea) foi envolve três elementos de i18n. Para exemplificar, foi adicionado o suporte à pt-BR:

- o idioma em si (e.g. mostrar "IMC" ao invés de "BMI");
- o formato de datas (e.g. mostrar DD/MM/AA ao invés de MM/DD/AA);
- a unidade de medida de peso, que foi alterada para libras (lb) na versão do software (en-US) e mantida em quilogramas (kg) para pt-BR.

Como o web app é escrito em React e portanto para facilitar a implementação do suporta à internacionalização utilizou-se uma biblioteca simples (implementada com o mesmo framework), a [react-int](https://formatjs.io/docs/react-intl/).

As próximas seções explicam a configuração básica da ferramenta e as alterações no código para cada um dos elementos acima.

## Configuração

Primeiramente encapsulamos o componente raiz da aplicação com `IntlProvider`, que através da implementação do padrão "provider" irá facilitar a disponibilização das mensagens aos demais componentes.

```diff
// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
+ import { IntlProvider, FormattedMessage } from 'react-intl';
+ import { i18nConfig, language } from "./i18n.js";
import App from "./components/App/App.jsx";

- ReactDOM.render(<App />, document.getElementById("root"));
+ ReactDOM.render(
+   <IntlProvider
+     locale={language}
+     defaultLocale={i18nConfig.defaultLocale}
+     messages={i18nConfig.messages[language]}
+   >
+     <App />
+   </IntlProvider>,
+   document.getElementById("root")
+ );
```

Note que além do import de `react-intl` também importamos `i18n.js`, que é um novo arquivo

contendo as mensagens internacionalizadas em si:

```jsx
// src/i18n.js

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
```

O objeto `messages` já aparece completo, com todas as traduções necessárias, mas na verdade ele foi sendo preenchido conforme a necessidade.

Veja que ao final do arquivo definimos `language` como a linguagem padro do navegador.

## Adicionando elementos de i18n

### Traduções

Como mencionado no início, o componente `IntlProvider` facilita a obtenção de strings traduzidas (e mais, mas neste projeto demais recursos não serão utilizados). O código abaixo mostra a tradução do título do aplicativo, que é definido do componente `App` (`src/components/App/App.jsx`):

```diff
  import BmiForm from '../BmiForm/BmiForm';
  import Info from '../Info/Info';
  import Bar from '../Bar/Bar';
+ import { FormattedMessage } from 'react-intl';
  import { getData, storeData } from '../../helpers/localStorage';

  return (
      <div className='container'>
        <div className='row center'>
-         <h1 className='white-text'> BMI Tracker </h1>
+         <h1 className='white-text'>
+           <FormattedMessage id="title"/>
+         </h1>
        </div>
        <div className='row'>
          <div className='col m12 s12'>
```

Venha que a string "BMI Tracker" (título original) foi substituída pelo FormattedMessage, que está, por baixo dos panos, obtendo a string traduzida através do `IntlProvider`. A string será aquela do idioma específico, na chame `"title"` (veja novamente o objeto `messages`, do arquivo `src/i18n.js`.

O mesmo princípio é aplicado a qualquer outra string do aplicativo.

## Datas

Datas aparecem em apenas um componente, o `Bar`, por Para este caso, adicionamos uma função de prover data no utilitário `i18n.js`:

```diff
+ function i18nDate(d) {
+   if (language === 'en') {
+      return new Date().toLocaleString(language).split(',')[0];
+   } else if (language === 'pt') {
+      return new Date().toLocaleString(language).split(' ')[0];
+   }
+   return new Date().toLocaleString().split(',')[0];
+ }

- export { i18nConfig, language };
+ export { i18nConfig, language, i18nDate };
```

Agora ao invés de `new Date()`, simplesmente importa-se a função `i18nDate()` faz-se `i18nDate(new Date())`.

### Unidades de medida

A unidade de medida aparece como um símbolo (e.g "lb" para libras ou "kg" para quilogramas), portanto também precisa ser definida como uma mensagem: veja a entrada `weightMeasure` do nosso objeto `messages` em `i18n.js`. Além disso, precisaremos fazer uma conversão, para manter o IMC o mesmo, independente da unidade de peso utilizada. Por este motivo, o objeto `messages` não apenas inclui a string `weightMeasure`, como também o ponto flutuante `weightFactor`, que é o fator de conversão da altura na unidade de medida de determinado país para centímetros. Por exemplo: `messages["en"].weightFactor` possui o valor 0.453, pois de libras (a unidade de medida dos Estados Unidos) para centímetros multiplica-se as libras por 0.453.

Dito isso, ao calcular o IMC, obtemos o fator multiplicativo através do utilitário `i18n.js`:

```diff
+ const i18nMessages = i18nConfig.messages[language];

  const handleChange = val => {
    let heightInM = val.height / 100;
-   val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
+   let weight = val.weight * i18nMessages.weightFactor;
+   val.bmi = (weight / (heightInM * heightInM)).toFixed(2);
    [val.id](http://val.id/) = uuidv4();
    let newVal = [...state, val];
    let len = newVal.length;
```

## Resultado

Observe o resultado final. Este é o software no idioma original:

![en1.png](https://github.com/ramnasidharta/bmi-calculator/blob/master/images/screenshot1.png)
![en2.png](https://github.com/ramnasidharta/bmi-calculator/blob/master/images/screenshot2.png)

E, após simplesmente alterar a linguagem do brower para português, se o aplicativo é acessado novamente, vê-se o seguinte:

![pt1.png](https://github.com/ramnasidharta/bmi-calculator/blob/master/images/screenshot3.png)

![pt2.png](https://github.com/ramnasidharta/bmi-calculator/blob/master/images/screenshot4.png)

Note o idioma, as datas, e note também que os valores de IMC são os mesmos, enquanto os valores para "Peso" e "Weight" são diferentes, indicando que de fato o software salvou o valor na unidade de medida correta, e que também calculou o IMC corretamente.

Após estas modificações, adicionar mais um idioma é trivial: uma nova entrada em `messages`, e possivelmente uma nova condição na função `i18nDate()`.

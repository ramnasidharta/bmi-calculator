import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { i18nConfig, language } from '../../i18n.js';

const Bar = ({ labelData, bmiData }) => {

  const i18nBmi = i18nConfig.messages[language].bmi;

  const data = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(63, 81, 181, 700);
    gradient.addColorStop(0, '#929dd9');
    gradient.addColorStop(1, '#172b4d');

    return {
      labels: labelData,
      datasets: [
        {
          label: i18nBmi,
          data: bmiData,
          backgroundColor: gradient,
          borderColor: '#3F51B5',
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2
        }
      ]
    };
  };

  const i18nDate = i18nConfig.messages[language].date;

  const options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: i18nDate.charAt(0).toUpperCase() + i18nDate.slice(1),
            fontSize: 18,
            fontColor: 'white'
          },
          gridLines: {
            display: false,
            color: 'white'
          },
          ticks: {
            fontColor: 'white',
            fontSize: 16
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: i18nBmi,
            fontSize: 18,
            fontColor: 'white'
          },
          gridLines: {
            display: false,
            color: 'white'
          },
          ticks: {
            fontColor: 'white',
            fontSize: 16,
            beginAtZero: true
          }
        }
      ]
    },
    tooltips: {
      titleFontSize: 13,
      bodyFontSize: 13
    }
  };

  return (
    <>
      <Line data={data} options={options} />
    </>
  );
};

Bar.propTypes = {
  labelData: PropTypes.array,
  bmiData: PropTypes.array
};

export default Bar;

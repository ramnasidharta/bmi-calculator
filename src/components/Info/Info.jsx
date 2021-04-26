import React from 'react';
import PropTypes from 'prop-types';
import './Info.css';
import { FormattedMessage } from 'react-intl';
import { i18nConfig, language } from '../../i18n.js';

const Info = ({ weight, height, id, date, bmi, deleteCard }) => {
  const handleDelete = () => {
    deleteCard(id);
  };

  const i18nMessages = i18nConfig.messages[language];

  return (
    <div className="col m6 s12">
      <div className="card">
        <div className="card-content">
          <span className="card-title" data-test="bmi">
             {i18nMessages.bmi}: {bmi}
          </span>
          <div className="card-data">
            <span class="fl" data-test="weight">
              {i18nMessages.weight}: {weight} {i18nMessages.weightMeasure}
            </span>
            <span class="fl" data-test="height">
              {i18nMessages.height}: {height} {i18nMessages.heightMeasure}
            </span>
            <span class="fl" data-test="date">
              {i18nMessages.date}: {date}
            </span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  weight: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  bmi: PropTypes.string,
  deleteCard: PropTypes.func
};

export default Info;

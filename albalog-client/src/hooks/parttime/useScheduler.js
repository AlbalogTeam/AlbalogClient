import { useState } from 'react';
import { dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

export default function useScheduler() {
  const [colorAssigned] = useState({});
  const [selectedRadio, setSelectedRadio] = useState('all');

  // event 슬롯 색 정하기
  const eventStyleGetter = (event) => {
    const title = event.title;

    if (!Object.keys(colorAssigned).includes(title)) {
      const getRandomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      colorAssigned[title] = getRandomColor();
    }

    let style = {
      backgroundColor: colorAssigned[title],
      borderRadius: '5px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  // 브라우저 당일
  const today = new Date();

  // 스케줄러 지역 인식
  const locales = {
    ko: require('date-fns/locale/ko'),
  };

  // 스케줄러 기본값
  const localizer = dateFnsLocalizer({
    format, //to format dates
    parse, // to parse dates
    startOfWeek, // the day value for the start of the week for a given locale
    getDay, // to get the day from a date
    locales, // arrayof locales
  });

  const onChange = (e) => {
    e.target.value === 'personal' && setSelectedRadio('personal');
    e.target.value === 'all' && setSelectedRadio('all');
  };

  return {
    today,
    eventStyleGetter,
    localizer,
    onChange,
    selectedRadio,
  };
}

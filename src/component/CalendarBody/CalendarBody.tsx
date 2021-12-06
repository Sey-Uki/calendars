import React from "react";
import { week } from "../../assets/shared/projectData";

interface ICalendarProps {
    inputVal: string, // хранится выбраная дата, здесь необходим, чтоб навесить стили на выбранную дату 
    day: string, // выбранный день
    month: string, // месяц
    year: string, // год
    onDay: Function, // функция, которая принимает в себя дату выбранного числа
    calendarCount: number, // счетчик календарей
};

const { DateTime } = require("luxon");

export class CalendarBody extends React.Component<ICalendarProps, {}>  {

    render() {

        const { inputVal, day, month, year, onDay, calendarCount } = this.props;
        let monthNew: string;
        let yearNew: string;


        if (+month >= 13) {
            monthNew = String(calendarCount);
            yearNew = String(+year + 1);
        } else {
            monthNew = month;
            yearNew = year;
        }

        const startDate = DateTime.local((Number(yearNew)), Number(monthNew), 1);
        let days = [...Array(startDate.daysInMonth)].map((_, i) => {
            return (DateTime.local(Number(yearNew), Number(monthNew), Number(i) + 1))
        });

        let daysNew: Array<number>;
        const firstDays: Array<number> = [];
        const lastDays: Array<number> = [];
        let prevMonDays;

        if (+monthNew === 1) {
            prevMonDays = DateTime.local(Number(yearNew) + 1, 1, 1).daysInMonth;
        } else {
            prevMonDays = DateTime.local(Number(yearNew), Number(monthNew) - 1, 1).daysInMonth;
        }

        for (let i = days[0].weekday - 2; i >= 0; i--) {
            firstDays.push(prevMonDays - i);
        }
        daysNew = firstDays.concat(days);

        if (days[days.length - 1].weekday < 7) {
            for (let i = 1; i <= 7 - days[days.length - 1].weekday; i++) {
                lastDays.push(i)
            }
            daysNew = daysNew.concat(lastDays)
        }

        return (
            <div className="calendar__body" style={{marginTop: calendarCount*50 + "px"}}>
                <div className="header__content">
                    <div className="header__mon">{monthNew}.</div>
                    <div className="header__yer">{yearNew}</div>
                </div>
                <div className="calendar__body__header">
                    {
                        week.map((w) => {
                            return <div key={w.id}>{w.dayName}</div>
                        })
                    }
                </div>
                <div className="calendar__body__content">
                    {daysNew.map((d: number | any) => {

                        if (typeof d === 'object') {
                            if (d.day === +day
                                && (inputVal.split('.')[1] === monthNew)
                                && (inputVal.split('.')[2] === yearNew)) {
                                return (<p key={d} className="picked calendar__day" onClick={() => onDay(d.toFormat('d.M.yyyy'))}>{
                                    <span>{d.day}</span>
                                }</p>)
                            } else if (d.day === +DateTime.now().toFormat('d')
                                && monthNew === DateTime.now().toFormat('MM')
                                && year === DateTime.now().toFormat('yyyy')) {
                                return (<p key={d} className="today calendar__day" onClick={() => onDay(d.toFormat('d.M.yyyy'))}>{
                                    <span>{d.day}</span>
                                }</p>)
                            } else {
                                return (<p key={d} className="calendar__day" onClick={() => onDay(d.toFormat('d.M.yyyy'))}>{
                                    <span>{d.day}</span>
                                }</p>)
                            }
                        } else return (
                            <p key={d} className="calendar__another">
                                {d}
                            </p>
                        )
                    }
                    )}
                </div>
            </div>
        )
    }


}
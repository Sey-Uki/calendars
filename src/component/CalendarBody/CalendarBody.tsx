import React from "react";
import { week } from "../../assets/shared/projectData";

interface ICalendarProps {
    inputVal: string,
    inputDay: string,
    inputMon: string,
    inputYear: string,
    onDay: Function,
    calendarCount: number,
    daysNew: Array<number>,
    nextMonthNumber: number,
};

interface ICalendarState {
    myDays: Array<number>
}

const { DateTime } = require("luxon");

export class CalendarBody extends React.Component<ICalendarProps, ICalendarState>  {

    constructor(props: ICalendarProps) {
    super(props);
    this.state = {
        myDays: [...this.props.daysNew],
    };
    }

    render() {

        const { inputVal, inputDay, inputMon, inputYear, onDay, nextMonthNumber } = this.props;

        let days = [];

        if (nextMonthNumber < 12) {
            const startDate = DateTime.local(Number(inputYear), Number(inputMon) + 1, 1);

            days = [...Array(startDate.daysInMonth)].map((_, i) => {
                return (DateTime.local(Number(inputYear), Number(inputMon) + 1, Number(i) + 1))
            })

        } else if (nextMonthNumber === 12) {
            const startDate = DateTime.local((Number(inputYear)), Number(inputMon), 1);
            days = [...Array(startDate.daysInMonth)].map((_, i) => {
                return (DateTime.local(Number(inputYear), Number(inputMon), Number(i) + 1))
            })
        }
        else if (nextMonthNumber > 12) {
            days = [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy'))+1, 1, 1).daysInMonth)].map((_, i) => {
                return DateTime.local(Number(DateTime.now().toFormat('yyyy'))+1, 1, Number(i) + 1)
            });
        }

        let daysNew: Array<number>;
        const firstDays: Array<number> = [];
        const lastDays: Array<number> = [];
        let prevMonDays;

        if (+inputMon === 1) {
            prevMonDays = DateTime.local(Number(inputYear) + 1, 1, 1).daysInMonth;
        } else {
            prevMonDays = DateTime.local(Number(inputYear), Number(inputMon) - 1, 1).daysInMonth;
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
            <div className="calendar__body">
                <div className="calendar__body__header">
                    {
                        week.map((w) => {
                            return  <div>{w.dayName}</div>
                        })
                    }
                </div>
                <div className="calendar__body__content">
                    {daysNew.map((d: number | any) => {
                       
                        if (typeof d === 'object') {
                            if (d.day === +inputDay

                                && (inputVal.split('.')[1] === inputMon
                                    && (inputVal.split('.')[2] === inputYear))) {
                                return (<p key={d} className="picked calendar__day" onClick={() => onDay(d.toFormat('d.MM.yyyy'))}>{
                                    <span>{d.day}</span>
                                }</p>)
                            } else if (d.day === +DateTime.now().toFormat('d')
                                && inputMon === DateTime.now().toFormat('MM')
                                && inputYear === DateTime.now().toFormat('yyyy')) {
                                return (<p key={d} className="today calendar__day" onClick={() => onDay(d.toFormat('d.MM.yyyy'))}>{
                                    <span>{d.day}</span>
                                }</p>)
                            } else {
                                return (<p key={d} className="calendar__day" onClick={() => onDay(d.toFormat('d.MM.yyyy'))}>{
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
import React from 'react';
import './Calendar.css';
import monImg from './../assets/img/month.svg';
import yearImg from './../assets/img/year.svg';
import { CalendarBody } from './CalendarBody/CalendarBody';

const { DateTime } = require("luxon");

interface ICalendarState { 
    day: string,
    month: string,
    year: string,

    inputVal: string,
    today: string,
    calendarCount: number,

    daysMonth: Array<any>,
    startDate: object,

    isInputvalid: boolean,
    showCalendar: boolean,
};


export class Calendar extends React.Component<{}, ICalendarState> {
    constructor(props: ICalendarState) {
        super(props);
        this.state = {
            calendarCount: 1,
            inputVal: "",
            today: DateTime.now().toFormat('dd.MM.yyyy'),

            daysMonth: [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1).daysMonthInMonth)].map((_, i) => {
                return DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), Number(i) + 1)
            }),
            startDate: DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1),

            day: DateTime.now().toFormat('d'),
            month: DateTime.now().toFormat('MM'),
            year: DateTime.now().toFormat('yyyy'),

            isInputvalid: true,
            showCalendar: true,
        };
    }

    onPrevYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = DateTime.local(Number(this.state.year) - 1, Number(this.state.month), 1);
            this.setState({
                startDate,
                year: String(Number(this.state.year) - 1),
                daysMonth: [...Array(startDate.daysMonthInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.year) - 1, Number(this.state.month), Number(i) + 1)
                }),
            })
        }
    }

    onNextYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = DateTime.local(Number(this.state.year) + 1, Number(this.state.month), 1);
            this.setState({
                startDate,
                year: String(Number(this.state.year) + 1),
                daysMonth: [...Array(startDate.daysMonthInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.year) + 1, Number(this.state.month), Number(i) + 1)
                }),
            })
        }
    }

    onPrevMon = () => {
        if (this.state.inputVal || this.state.today) {

            if (+this.state.month > 1) {
                const startDate = DateTime.local(Number(this.state.year), Number(this.state.month) - 1, 1);
                this.setState({
                    startDate,
                    month: String(Number(this.state.month) - 1),
                    daysMonth: [...Array(startDate.daysMonthInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.year), Number(this.state.month) - 1, Number(i) + 1))
                    }),
                }
                )
            } else if (+this.state.month === 1) {
                const startDate = DateTime.local(Number(this.state.year) - 1, 12, 1);
                this.setState({
                    startDate,
                    month: "12",
                    year: String(Number(this.state.year) - 1),
                    daysMonth: [...Array(startDate.daysMonthInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.year) - 1, 12, Number(i) + 1))
                    }),
                }
                )
            }
        }
    }

    onNextMon = () => {
        if (this.state.inputVal || this.state.today) {
            if (+this.state.month < 12) {
                const startDate = DateTime.local(Number(this.state.year), Number(this.state.month) + 1, 1);
                this.setState({
                    startDate,
                    month: String(Number(this.state.month) + 1),
                    daysMonth: [...Array(startDate.daysMonthInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.year), Number(this.state.month) + 1, Number(i) + 1))
                    }),
                }
                )

            } else if (+this.state.month === 12) {
                const startDate = DateTime.local((Number(this.state.year) + 1), 1, 1);
                this.setState({
                    startDate,
                    month: "1",
                    year: String(Number(this.state.year) + 1),
                    daysMonth: [...Array(startDate.daysMonthInMonth)].map((_, i) => {
                        return DateTime.local((Number(this.state.year) + 1), 1, Number(i) + 1)
                    }),
                }
                )
            }

        }
    }

    onDay = (date: string) => {
        const day = date.split('.')[0];
        this.setState({
            day: day,
            inputVal: date
        })
    }

    onToday = () => {
        const today = this.state.today;
        this.setState({
            inputVal: today,
            startDate: DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1),
            daysMonth: [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1).daysMonthInMonth)].map((_, i) => {
                return DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), Number(i) + 1)
            }),
            day: DateTime.now().toFormat('d'),
            month: DateTime.now().toFormat('MM'),
            year: DateTime.now().toFormat('yyyy'),
        })
    }

    onHideCalendar = () => {
        this.setState({
            showCalendar: false,
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <div className="content">
                    <div className="calendarComponent">
                        <div className="calendar__input">
                            <input
                                value={this.state.inputVal}
                                onChange={() => {}}
                            />
                        </div>
                        <button onClick={() => {
                            this.setState({
                                calendarCount: this.state.calendarCount + 1,
                            })
                        }}>Click</button>
                        <div className="calendar">
                            <div className="calendar__header">
                                <button onClick={this.onPrevYear}>
                                    <img src={yearImg} className="prev" alt="prev year" />
                                </button>
                                <button onClick={this.onPrevMon}>
                                    <img src={monImg} className="prev" alt="prev month" />
                                </button>
                                <button onClick={this.onNextMon}>
                                    <img src={monImg} className="next" alt="next month" />
                                </button>
                                <button onClick={this.onNextYear}>
                                    <img src={yearImg} className="next" alt="next year" />
                                </button>
                            </div>
                            <div className="calendar__wrapper">
                                {
                                    [...Array(this.state.calendarCount).keys()].map(item => {
                                        return (
                                            <CalendarBody
                                                key={item + 1}
                                                calendarCount={item}
                                                day={this.state.day}
                                                month={String(+this.state.month + item)}
                                                year={this.state.year}
                                                onDay={this.onDay}
                                                inputVal={this.state.inputVal}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className="calendar__footer">
                                <button className="calendar__today" onClick={() => this.onToday()}>Текущий день</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
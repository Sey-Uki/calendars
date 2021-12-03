import React from 'react';
import './Calendar.css';
import monImg from './../assets/img/month.svg';
import yearImg from './../assets/img/year.svg';
import { CalendarBody } from './CalendarBody/CalendarBody';

const { DateTime } = require("luxon");

interface ICalendarState {
    inputVal: string,
    today: string,
    calendarCount: number,

    days: Array<any>,
    inputDay: string,
    inputMon: string,
    inputYear: string,
    startDate: object,

    isInputvalid: boolean,
    showCalendar: boolean,

    nextMonthNumber: number,
};


export class Calendar extends React.Component<{}, ICalendarState> {
    constructor(props: ICalendarState) {
        super(props);
        this.state = {
            calendarCount: 1,
            inputVal: "",
            today: DateTime.now().toFormat('dd.MM.yyyy'),

            days: [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1).daysInMonth)].map((_, i) => {
                return DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), Number(i) + 1)
            }),
            inputDay: DateTime.now().toFormat('d'),
            inputMon: DateTime.now().toFormat('MM'),
            inputYear: DateTime.now().toFormat('yyyy'),
            startDate: DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1),
            // Re$$##[Diana] я использую local для того, чтобы можно было задавать произвольные даты, которые мне нужны
            isInputvalid: true,
            showCalendar: false,

            nextMonthNumber: 1,
        };
    }
    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const regexp = /^(0[1-9])?(1[0-9])?(2[0-9])?(3[0-1])?.(1[0-2])?(0[1-9])?.[0-9]{4}$/gm;
        // Re$$##[Diana] тут я проверяю, соответствует ли введеная в инпут строка, что я хочу получить
        this.setState({ inputVal: e.target.value });
        if (regexp.test(e.target.value)) {
            const temp = e.target.value.split('.');
            const startDate = DateTime.local(Number(temp[2]), Number(temp[1]), 1);
            //Re$$##[Diana] допустим тут нам нужна дата, которая указана в инпуте, поэтому я через local делаю 
            this.setState({
                startDate,
                inputDay: temp[0],
                inputMon: temp[1],
                inputYear: temp[2],
                days: [...Array(startDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(temp[2]), Number(temp[1]), Number(i) + 1)
                }),
                isInputvalid: true,
                inputVal: e.target.value
            }
            )
        } else {
            this.setState({
                isInputvalid: false //Re$$##[Diana] если нет, то ввывожу предупреждение
            })
        }
    }

    onPrevYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = DateTime.local(Number(this.state.inputYear) - 1, Number(this.state.inputMon), 1);
            this.setState({
                startDate,
                inputYear: String(Number(this.state.inputYear) - 1),
                days: [...Array(startDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.inputYear) - 1, Number(this.state.inputMon), Number(i) + 1)
                }),
            })
        }
    }

    onNextYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = DateTime.local(Number(this.state.inputYear) + 1, Number(this.state.inputMon), 1);
            this.setState({
                startDate,
                inputYear: String(Number(this.state.inputYear) + 1),
                days: [...Array(startDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.inputYear) + 1, Number(this.state.inputMon), Number(i) + 1)
                }),
            })
        }
    }

    onPrevMon = () => {
        if (this.state.inputVal || this.state.today) {

            if (+this.state.inputMon > 1) {
                const startDate = DateTime.local(Number(this.state.inputYear), Number(this.state.inputMon) - 1, 1);
                this.setState({
                    startDate,
                    inputMon: String(Number(this.state.inputMon) - 1),
                    days: [...Array(startDate.daysInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.inputYear), Number(this.state.inputMon) - 1, Number(i) + 1))
                    }),
                }
                )
            } else if (+this.state.inputMon === 1) {
                const startDate = DateTime.local(Number(this.state.inputYear) - 1, 12, 1);
                this.setState({
                    startDate,
                    inputMon: "12",
                    inputYear: String(Number(this.state.inputYear) - 1),
                    days: [...Array(startDate.daysInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.inputYear) - 1, 12, Number(i) + 1))
                    }),
                }
                )
            }
        }
    }

    onNextMon = () => {
        if (this.state.inputVal || this.state.today) {
            if (+this.state.inputMon < 12) {
                const startDate = DateTime.local(Number(this.state.inputYear), Number(this.state.inputMon) + 1, 1);
                this.setState({
                    startDate,
                    inputMon: String(Number(this.state.inputMon) + 1),
                    days: [...Array(startDate.daysInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.inputYear), Number(this.state.inputMon) + 1, Number(i) + 1))
                    }),
                }
                )

            } else if (+this.state.inputMon === 12) {
                const startDate = DateTime.local((Number(this.state.inputYear) + 1), 1, 1);
                this.setState({
                    startDate,
                    inputMon: "1",
                    inputYear: String(Number(this.state.inputYear) + 1),
                    days: [...Array(startDate.daysInMonth)].map((_, i) => {
                        return DateTime.local((Number(this.state.inputYear) + 1), 1, Number(i) + 1)
                    }),
                }
                )
            }

        }
    }

    onDay = (date: string) => {
        const day = date.split('.')[0];
        const month = date.split('.')[1];
        if (!day.split('')[1]) {
            this.setState({
                inputDay: 0 + day,
                inputMon: month,
                inputVal: 0 + date
            })
        } else {
            this.setState({
                inputDay: day,
                inputMon: month,
                inputVal: date
            })
        }
    }

    onToday = () => {
        const today = this.state.today;
        this.setState({
            inputVal: today,
            startDate: DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1),
            days: [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1).daysInMonth)].map((_, i) => {
                return DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), Number(i) + 1)
            }),
            inputDay: DateTime.now().toFormat('d'),
            inputMon: DateTime.now().toFormat('MM'),
            inputYear: DateTime.now().toFormat('yyyy'),
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
        let daysNew: Array<number>;
        const firstDays: Array<number> = [];
        const lastDays: Array<number> = [];
        let prevMonDays;

        if (+this.state.inputMon === 1) {
            prevMonDays = DateTime.local(Number(this.state.inputYear) + 1, 1, 1).daysInMonth;
        } else {
            prevMonDays = DateTime.local(Number(this.state.inputYear), Number(this.state.inputMon) - 1, 1).daysInMonth;
        }

        for (let i = this.state.days[0].weekday - 2; i >= 0; i--) {
            firstDays.push(prevMonDays - i);
        }
        daysNew = firstDays.concat(this.state.days);

        if (this.state.days[this.state.days.length - 1].weekday < 7) {
            for (let i = 1; i <= 7 - this.state.days[this.state.days.length - 1].weekday; i++) {
                lastDays.push(i)
            }
            daysNew = daysNew.concat(lastDays)
        }
        return (
            <>
                {this.state.showCalendar && (
                    <div className="overlay" onClick={this.onHideCalendar}></div>
                )}
                <div className="content">
                    {
                        !this.state.isInputvalid && <p className="error">Введите дату правильно - в формате ДД.ММ.ГГГГ</p>
                    }
                    <div className="calendarComponent">
                        <div className="calendar__input">
                            <input
                                value={this.state.inputVal}
                                onChange={this.onInputChange}
                                onFocus={() => this.setState({
                                    showCalendar: true,
                                })}
                            />
                        </div>

                        {this.state.showCalendar ?
                            (<>
                                <button onClick={() => {
                                    this.setState((state): any => {
                                        if (state.nextMonthNumber > 12) {
                                            return {
                                                calendarCount: state.calendarCount + 1,
                                                nextMonthNumber: 2,
                                            }
                                        }

                                        return {
                                            calendarCount: state.calendarCount + 1,
                                            nextMonthNumber: +state.inputMon + state.calendarCount
                                        }
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
                                        <div className="header__content">
                                            <div className="header__mon">{this.state.inputMon}.</div>
                                            <div className="header__yer">{this.state.inputYear}</div>
                                        </div>
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
                                                        nextMonthNumber={this.state.nextMonthNumber}
                                                        key={item + 1}
                                                        calendarCount={item}
                                                        inputDay={this.state.inputDay}
                                                        inputMon={this.state.inputMon}
                                                        inputYear={this.state.inputYear}
                                                        onDay={this.onDay}
                                                        inputVal={this.state.inputVal}
                                                        daysNew={daysNew}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="calendar__footer">
                                        <button className="calendar__today" onClick={() => this.onToday()}>Текущий день</button>
                                    </div>
                                </div>
                            </>
                            ) : null
                        }
                    </div>
                </div>
            </>
        )
    }
}
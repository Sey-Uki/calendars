import React from 'react';
import './Calendar.css';
import monImg from './../img/month.svg';
import yearImg from './../img/year.svg';
import { CalendarBody } from './CalendarBody/CalendarBody';

const { DateTime } = require("luxon");

interface ICalendar {
    inputVal: string,
    today: string,
    calendarCount: number,

    days: any,
    inputDay: string,
    inputMon: string,
    inputYear: string,
    startDate: object,

    isInputvalid: boolean,
    showCalendar: boolean,

    nextMon: string,
    nextYear: string,
    nextDays: any,
    startNextDate: object,
};


export class Calendar extends React.Component<{}, ICalendar> {
    state: ICalendar = {
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

        isInputvalid: true,
        showCalendar: false,


        nextDays: [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')) + 1, 1).daysInMonth)].map((_, i) => {
            return DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')) + 1, Number(i) + 1)
        }),
        nextMon: String(Number(DateTime.now().toFormat('MM')) + 1),
        nextYear: DateTime.now().toFormat('yyyy'),
        startNextDate: DateTime.local(Number(DateTime.now().toFormat('yyyy')), String(Number(DateTime.now().toFormat('MM')) + 1), 1),
    };



    onInputChange = (e: any) => {
        const regexp = /^(0[1-9])?(1[0-9])?(2[0-9])?(3[0-1])?.(1[0-2])?(0[1-9])?.[0-9]{4}$/gm;

        this.setState({ inputVal: e.target.value });
        if (regexp.test(e.target.value)) {
            const temp = e.target.value.split('.');
            const startDate = DateTime.local(Number(temp[2]), Number(temp[1]), 1);
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
                isInputvalid: false
            })
        }
    }

    onPrevYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = DateTime.local(Number(this.state.inputYear) - 1, Number(this.state.inputMon), 1);
            const startNextDate = DateTime.local(Number(this.state.nextYear) - 1, Number(this.state.nextMon), 1);
            this.setState({
                startDate,
                inputYear: String(Number(this.state.inputYear) - 1),
                days: [...Array(startDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.inputYear) - 1, Number(this.state.inputMon), Number(i) + 1)
                }),

                startNextDate,
                nextYear: String(Number(this.state.nextYear) - 1),
                nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.nextYear) - 1, Number(this.state.nextMon), Number(i) + 1)
                }),
            })
        }
    }

    onNextYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = DateTime.local(Number(this.state.inputYear) + 1, Number(this.state.inputMon), 1);
            const startNextDate = DateTime.local(Number(this.state.nextYear) + 1, Number(this.state.nextMon), 1);
            this.setState({
                startDate,
                inputYear: String(Number(this.state.inputYear) + 1),
                days: [...Array(startDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.inputYear) + 1, Number(this.state.inputMon), Number(i) + 1)
                }),

                startNextDate,
                nextYear: String(Number(this.state.nextYear) + 1),
                nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                    return DateTime.local(Number(this.state.nextYear) + 1, Number(this.state.nextMon), Number(i) + 1)
                }),
            })
        }
    }


    onPrevMon = () => {
        if (this.state.inputVal || this.state.today) {

            if (+this.state.inputMon > 1) {
                if (+this.state.nextMon === 1) {
                    const startNextDate = DateTime.local(Number(this.state.nextYear) - 1, 12, 1);
                    this.setState({
                        startNextDate,
                        nextMon: "12",
                        nextYear: String(Number(this.state.nextYear) - 1),
                        nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                            return DateTime.local(Number(this.state.nextYear) - 1, 12, Number(i) + 1)
                        }),
                    }
                    )
                } else {
                    const startNextDate = DateTime.local(Number(this.state.nextYear), Number(this.state.nextMon) - 1, 1);
                    this.setState({
                        startNextDate,
                        nextMon: String(Number(this.state.nextMon) - 1),
                        // nextYear: String(Number(this.state.nextYear) + 1),
                        nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                            return DateTime.local(Number(this.state.nextYear), Number(this.state.nextMon) - 1, Number(i) + 1)
                        }),
                    })
                }


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
                const startNextDate = DateTime.local(Number(this.state.nextYear), 1, 1);

                this.setState({
                    startNextDate,
                    nextMon: "1",
                    nextYear: String(Number(this.state.nextYear)),
                    nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                        return DateTime.local(Number(this.state.nextYear), 1, Number(i) + 1)
                    }),
                }
                )
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
                if (+this.state.nextMon === 12) {
                    const startNextDate = DateTime.local(Number(this.state.nextYear) + 1, 1, 1);
                    this.setState({
                        startNextDate,
                        nextMon: "1",
                        nextYear: String(Number(this.state.nextYear) + 1),
                        nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                            return DateTime.local(Number(this.state.nextYear) + 1, 1, Number(i) + 1)
                        }),
                    }
                    )
                } else {
                    const startNextDate = DateTime.local(Number(this.state.nextYear), Number(this.state.nextMon) + 1, 1);
                    this.setState({
                        startNextDate,
                        nextMon: String(Number(this.state.nextMon) + 1),
                        nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                            return DateTime.local(Number(this.state.nextYear), Number(this.state.nextMon) + 1, Number(i) + 1)
                        }),
                    }
                    )
                }

            } else if (+this.state.inputMon === 12) {
                const startDate = DateTime.local((Number(this.state.inputYear) + 1), 1, 1);
                const startNextDate = DateTime.local(Number(this.state.inputYear) + 1, 2, 1);
                this.setState({
                    startDate,
                    inputMon: "1",
                    inputYear: String(Number(this.state.inputYear) + 1),
                    days: [...Array(startDate.daysInMonth)].map((_, i) => {
                        return DateTime.local((Number(this.state.inputYear) + 1), 1, Number(i) + 1)
                    }),

                    startNextDate,
                    nextMon: "2",
                    nextDays: [...Array(startNextDate.daysInMonth)].map((_, i) => {
                        return DateTime.local(Number(this.state.inputYear) + 1, 2, Number(i) + 1)
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

        let daysNew: any;
        const firstDays: any = [];
        const lastDays: any = [];
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

        let nextDaysNew;
        const nextFirstDays: any = [];
        const nextLastDays: any = [];
        let nextPrevMonDays = DateTime.local(Number(this.state.inputYear), Number(this.state.inputMon), 1).daysInMonth;

        for (let i = this.state.nextDays[0].weekday - 2; i >= 0; i--) {
            nextFirstDays.push(nextPrevMonDays - i);
        }

        nextDaysNew = nextFirstDays.concat(this.state.nextDays)


        if (this.state.nextDays[this.state.nextDays.length - 1].weekday < 7) {
            for (let i = 1; i <= 7 - this.state.nextDays[this.state.nextDays.length - 1].weekday; i++) {
                nextLastDays.push(i)
            }
            nextDaysNew = nextDaysNew.concat(nextLastDays)
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
                                    this.setState((state) => ({
                                        calendarCount: state.calendarCount + 1
                                    }))
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
                                            {/* -
                                                <div className="header__mon">{this.state.nextMon}.</div>
                                                <div className="header__yer">{this.state.nextYear}</div> */}
                                        </div>
                                        <button onClick={this.onNextMon}>
                                            <img src={monImg} className="next" alt="next month" />
                                        </button>
                                        <button onClick={this.onNextYear}>
                                            <img src={yearImg} className="next" alt="next year" />
                                        </button>
                                    </div>
                                    <div className="calendar__wrapper">
                                        {/* <div className="calendar__body">
                                            <div className="calendar__body__header">
                                                <div>Пн</div>
                                                <div>Вт</div>
                                                <div>Ср</div>
                                                <div>Чт</div>
                                                <div>Пт</div>
                                                <div>Сб</div>
                                                <div>Вс</div>
                                            </div>
                                            <div className="calendar__body__content">
                                                {daysNew.map((d: any) => {
                                                    if (typeof d === 'object') {
                                                        if (d.day === +this.state.inputDay
                                                            && (this.state.inputVal.split('.')[1] === this.state.inputMon
                                                                && (this.state.inputVal.split('.')[2] === this.state.inputYear))) {
                                                            return (<p key={d} className="picked calendar__day" onClick={() => this.onDay(d.toFormat('d.MM.yyyy'))}>{
                                                                <span>{d.day}</span>
                                                            }</p>)
                                                        } else if (d.day === +DateTime.now().toFormat('d')
                                                            && this.state.inputMon === DateTime.now().toFormat('MM')
                                                            && this.state.inputYear === DateTime.now().toFormat('yyyy')) {
                                                            return (<p key={d} className="today calendar__day" onClick={() => this.onDay(d.toFormat('d.MM.yyyy'))}>{
                                                                <span>{d.day}</span>
                                                            }</p>)
                                                        } else {
                                                            return (<p key={d} className="calendar__day" onClick={() => this.onDay(d.toFormat('d.MM.yyyy'))}>{
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
                                        </div> */}
                                        {
                                            [...Array(this.state.calendarCount).keys()].map(item => {
                                                return (
                                                    <CalendarBody
                                                        key={item + 1}
                                                        calendarCount={item - 1}
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

                                        {/* <div className="calendar__body">
                                            <div className="calendar__body__header">
                                                <div>Пн</div>
                                                <div>Вт</div>
                                                <div>Ср</div>
                                                <div>Чт</div>
                                                <div>Пт</div>
                                                <div>Сб</div>
                                                <div>Вс</div>
                                            </div>
                                            <div className="calendar__body__content">
                                                {nextDaysNew.map((d: any) => {
                                                    if (typeof d === 'object') {
                                                        return (<p key={d} className="calendar__day">{
                                                            <span>{d.day}</span>
                                                        }</p>)
                                                    } else return (
                                                        <p key={d} className="calendar__another">
                                                            {d}
                                                        </p>
                                                    )
                                                }
                                                )}
                                            </div>
                                        </div> */}
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
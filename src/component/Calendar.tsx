import React from 'react';
import './Calendar.css';
import monImg from './../img/month.svg';
import yearImg from './../img/year.svg';

const { DateTime } = require("luxon");

interface ICalendar {
    inputVal: string,
    today: string,
    days: any,
    inputDay: string,
    inputMon: string,
    inputYear: string,
    startDate: object,
    isInputvalid: boolean,
    showCalendar: boolean,
};


export class Calendar extends React.Component<{}, ICalendar> {
    state: ICalendar = {
        inputVal: "",
        today: DateTime.now().toFormat('MM.yyyy'),
        days: [...Array(DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1).daysInMonth)].map((_, i) => {
            return DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), Number(i) + 1)
        }),
        inputDay: DateTime.now().toFormat('d'),
        inputMon: DateTime.now().toFormat('MM'),
        inputYear: DateTime.now().toFormat('yyyy'),
        startDate: DateTime.local(Number(DateTime.now().toFormat('yyyy')), Number(DateTime.now().toFormat('MM')), 1),
        isInputvalid: true,
        showCalendar: false,
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
                const startDate = DateTime.local(Number(this.state.inputYear) - 1, 1, 1);
                this.setState({
                    startDate,
                    inputMon: "12",
                    inputYear: String(Number(this.state.inputYear) - 1),
                    days: [...Array(startDate.daysInMonth)].map((_, i) => {
                        return (DateTime.local(Number(this.state.inputYear) - 1, 1, Number(i) + 1))
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

    onHideCalendar = () => {
        this.setState({
            showCalendar: false,
        })
    }

    componentDidMount() {
    }

    render() {

        let daysNew;
        const newDays: any = [];

        for (let i = 1; i < this.state.days[0].weekday; i++) {
            newDays.push(i);
        }
        daysNew = newDays.concat(this.state.days);

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
                                    <div className="calendar__body">
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
                                                    if (d.day === +DateTime.now().toFormat('d')
                                                        && this.state.inputMon === DateTime.now().toFormat('MM')
                                                        && this.state.inputYear === DateTime.now().toFormat('yyyy')) {
                                                        return (<p key={d} className="today calendar__day" onClick={() => this.onDay(d.toFormat('d.MM.yyyy'))}>{
                                                            <span>{d.day}</span>
                                                        }</p>)
                                                    } else if (d.day === +this.state.inputDay
                                                        && (this.state.inputVal.split('.')[1] === this.state.inputMon
                                                            && (this.state.inputVal.split('.')[2] === this.state.inputYear))) {
                                                        return (<p key={d} className="picked calendar__day" onClick={() => this.onDay(d.toFormat('d.MM.yyyy'))}>{
                                                            <span>{d.day}</span>
                                                        }</p>)
                                                    } else {
                                                        return (<p key={d} className="calendar__day" onClick={() => this.onDay(d.toFormat('d.MM.yyyy'))}>{
                                                            <span>{d.day}</span>
                                                        }</p>)
                                                    }
                                                } else return (
                                                    <p key={d}>
                                                        { }
                                                    </p>
                                                )
                                            }
                                            )}
                                        </div>
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
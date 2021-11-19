import moment, { Moment } from 'moment';
import React from 'react';
import './Calendar.css';
import monImg from './../img/month.svg';
import yearImg from './../img/year.svg';

interface ICalendar {
    inputVal: string,
    today: string,
    days: Array<Moment>,
    inputDay: string,
    inputMon: string,
    inputYear: string,
    startDate: Moment,
    isInputvalid: boolean,
    showCalendar: boolean,
};


export class Calendar extends React.Component<{}, ICalendar> {
    state: ICalendar = {
        inputVal: "",
        today: moment().format('MM.YYYY'),
        days: [...Array(moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1).daysInMonth())].map((_, i) => {
            return moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1).clone().add(i, 'day')
        }),
        inputDay: moment().format('D'),
        inputMon: moment().format('MM'),
        inputYear: moment().format('YYYY'),
        startDate: moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1),
        isInputvalid: true,
        showCalendar: false,
    };



    onInputChange = (e: any) => {
        const regexp = /^(0[1-9])?(1[0-9])?(2[0-9])?(3[0-1])?.(1[0-2])?(0[1-9])?.[0-9]{4}$/gm;

        this.setState({ inputVal: e.target.value });
        if (regexp.test(e.target.value)) {
            const temp = e.target.value.split('.');
            const startDate = moment(temp[2] + '-' + temp[1] + '-' + 1);
            this.setState({
                startDate,
                inputDay: temp[0],
                inputMon: temp[1],
                inputYear: temp[2],
                days: [...Array(startDate.daysInMonth())].map((_, i) => {
                    return startDate.clone().add(i, 'day')
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
            const startDate = moment(String(Number(this.state.inputYear) - 1 + '-' + this.state.inputMon) + '-' + 1);
            this.setState({
                startDate,
                inputYear: String(Number(this.state.inputYear) - 1),
                days: [...Array(startDate.daysInMonth())].map((_, i) => {
                    return startDate.clone().add(i, 'day')
                }),
            })
        }
    }

    onNextYear = () => {
        if (this.state.inputVal || this.state.today) {
            const startDate = moment(String(Number(this.state.inputYear) + 1 + '-' + this.state.inputMon) + '-' + 1);
            this.setState({
                startDate,
                inputYear: String(Number(this.state.inputYear) + 1),
                days: [...Array(startDate.daysInMonth())].map((_, i) => {
                    return startDate.clone().add(i, 'day')
                }),
            })
        }
    }


    onPrevMon = () => {
        if (this.state.inputVal || this.state.today) {
            if (+this.state.inputMon > 1) {
                const startDate = moment(this.state.inputYear + '-' + String(Number(this.state.inputMon) - 1) + '-' + 1);
                this.setState({
                    startDate,
                    inputMon: String(Number(this.state.inputMon) - 1),
                    days: [...Array(startDate.daysInMonth())].map((_, i) => {
                        return startDate.clone().add(i, 'day')
                    }),
                }
                )
            } else if (+this.state.inputMon === 1) {
                const startDate = moment(String(Number(this.state.inputYear) - 1) + '-' + 1 + '-' + 1);
                this.setState({
                    startDate,
                    inputMon: "12",
                    inputYear: String(Number(this.state.inputYear) - 1),
                    days: [...Array(startDate.daysInMonth())].map((_, i) => {
                        return startDate.clone().add(i, 'day')
                    }),
                }
                )
            }
        }
    }

    onNextMon = () => {
        if (this.state.inputVal || this.state.today) {
            if (+this.state.inputMon < 12) {
                const startDate = moment(this.state.inputYear + '-' + String(Number(this.state.inputMon) + 1) + '-' + 1);
                this.setState({
                    startDate,
                    inputMon: String(Number(this.state.inputMon) + 1),
                    days: [...Array(startDate.daysInMonth())].map((_, i) => {
                        return startDate.clone().add(i, 'day')
                    }),
                }
                )
            } else if (+this.state.inputMon === 12) {
                const startDate = moment(String(Number(this.state.inputYear) + 1) + '-' + 1 + '-' + 1);
                this.setState({
                    startDate,
                    inputMon: "1",
                    inputYear: String(Number(this.state.inputYear) + 1),
                    days: [...Array(startDate.daysInMonth())].map((_, i) => {
                        return startDate.clone().add(i, 'day')
                    }),
                }
                )
            }

        }
    }

    onDay = (date: string) => {
        const day = date.split('.')[0];
        if (!day.split('')[1]) {
            this.setState({
                inputDay: 0 + day,
                inputVal: 0 + date
            })
        } else {
            this.setState({
                inputDay: day,
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
        console.log(moment().format('HH:mm'))
    }

    render() {

        let daysNew;
        const newDays: any = [];

        for (let i = 1; i < this.state.days[0].isoWeekday(); i++) {
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
                                            {daysNew.map((day: any) => {
                                                if (typeof day === "object") {
                                                    if (day.format('D') === moment().format('D')
                                                        && this.state.inputMon === moment().format('MM')
                                                        && this.state.inputYear === moment().format('YYYY')) {
                                                        return (<p key={day.format('YYYY-D')} className="today calendar__day" onClick={() => this.onDay(day.format('D.MM.YYYY'))}>{
                                                            <span>{day.format('D')}</span>
                                                        }</p>)
                                                    } else if (day.format('DD') === this.state.inputDay
                                                        && (this.state.inputVal.split('.')[1] === this.state.inputMon
                                                            && (this.state.inputVal.split('.')[2] === this.state.inputYear))) {
                                                        return (<p key={day.format('YYYY-D')} className="picked calendar__day" onClick={() => this.onDay(day.format('D.MM.YYYY'))}>{
                                                            <span>{day.format('D')}</span>
                                                        }</p>)
                                                    } else {
                                                        return (<p key={day.format('YYYY-D')} className="calendar__day" onClick={() => this.onDay(day.format('D.MM.YYYY'))}>{
                                                            <span>{day.format('D')}</span>
                                                        }</p>)
                                                    }

                                                } else {
                                                    return (<p key={day}>{ }</p>)
                                                }
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
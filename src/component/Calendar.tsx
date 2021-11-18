import moment, { Moment, MomentFormatSpecification, MomentInput } from "moment";
import React from "react";
import './Calendar.css';

interface ICalendar {
    inputVal: string,
    today: string,
    days: Array<Moment>,
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
        inputMon: moment().format('MM'),
        inputYear: moment().format('YYYY'),
        startDate: moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1),
        isInputvalid: true,
        showCalendar: false,
    };



    onInputChange = (e: any) => {
        const regexp = /^(1[0-2])?(0[1-9])?.[0-9]{4}$/gm;

        this.setState({ inputVal: e.target.value });
        console.log(this.state.inputVal)
        if (regexp.test(e.target.value)) {
            const temp = e.target.value.split('.');
            const startDate = moment(temp[1] + '-' + temp[0] + '-' + 1);
            this.setState({
                startDate,
                inputMon: temp[0],
                inputYear: temp[1],
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

    onHideCalendar = () => {
        this.setState({
            showCalendar: false,
        })
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
                ) }
                <div>
                    {
                        !this.state.isInputvalid && <p className="error">Введите дату правильно - в формате ММ.ГГГГ</p>
                    }
                    <div className="calendarComponent">
                        <input
                            value={this.state.inputVal}
                            onChange={this.onInputChange}
                            className="calendar__input"
                            onFocus={() => this.setState({
                                showCalendar: true,
                            })}
                        />

                        {this.state.showCalendar ?
                            (<div className="calendar">
                                <div className="calendar__header">
                                    <button onClick={this.onPrevYear}>yP</button>
                                    <button onClick={this.onPrevMon}>mP</button>
                                    <div className="header__content">
                                        <div className="header__mon">{this.state.inputMon}.</div>
                                        <div className="header__yer">{this.state.inputYear}</div>
                                    </div>
                                    <button onClick={this.onNextMon}>mN</button>
                                    <button onClick={this.onNextYear}>yN</button>
                                </div>
                                <div className="calendar__body">
                                    <div>Пн</div>
                                    <div>Вт</div>
                                    <div>Ср</div>
                                    <div>Чт</div>
                                    <div>Пт</div>
                                    <div>Сб</div>
                                    <div>Вс</div>
                                    {daysNew.map((day: any) => {
                                        if (typeof day === "object") {
                                            if (day.format('D') === moment().format('D')
                                                && this.state.inputMon === moment().format('MM')
                                                && this.state.inputYear === moment().format('YYYY')) {
                                                return (<p key={day.format('YYYY-D')} className="today">{
                                                    day.format('D')
                                                }</p>)
                                            } else {
                                                return (<p key={day.format('YYYY-D')}>{
                                                    day.format('D')
                                                }</p>)
                                            }

                                        } else {
                                            return (<p key={day}>{ }</p>)
                                        }
                                    }
                                    )}
                                </div>
                            </div>) : null
                        }
                    </div>
                </div>
            </>
        )
    }
}
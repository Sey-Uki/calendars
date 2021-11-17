import moment from "moment";
import React from "react";
import './Calendar.css';

interface ICalendar {
    inputVal: any,
    days: any,
    inputMon: string,
    inputYear: string,
    inputArr: any,
    startDate: any,
};


export class Calendar extends React.Component<{}, ICalendar> {
    state: ICalendar = {
        inputVal: moment().format('MM') + '.' + moment().format('YYYY'),
        days: [...Array(moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1).daysInMonth())].map((_, i) => {
            return moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1).clone().add(i, 'day')
        }),
        inputMon: moment().format('MM'),
        inputYear: moment().format('YYYY'),
        inputArr: [],
        startDate: moment(moment().format('YYYY') + '-' + moment().format('MM') + '-' + 1),
    };



    onInputChange = (e: any) => {
        this.setState({ inputVal: e.target.value });
    }

    renderCalendar = () => {
        if (this.state.inputVal) {
            const temp = this.state.inputVal.split('.');
            const startDate = moment(temp[1] + '-' + temp[0] + '-' + 1);
            this.setState({
                startDate,
                inputMon: temp[0],
                inputYear: temp[1],
                days: [...Array(startDate.daysInMonth())].map((_, i) => {
                    return startDate.clone().add(i, 'day')
                }),
            }
            )
        }
    }

    onPrevYear = () => {
        if (this.state.inputVal) {
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
        if (this.state.inputVal) {
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
        if (this.state.inputVal) {
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
        if (this.state.inputVal) {
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


    render() {
        let daysNew;
        const newDays: any = [];

        for (let i = 1; i < this.state.days[0].isoWeekday(); i++) {
            newDays.push(i);
        }
        daysNew = newDays.concat(this.state.days);


        return (
            <div>
                <input
                    value={this.state.inputVal}
                    onChange={this.onInputChange}
                />
                <button onClick={this.renderCalendar}>OK</button>

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
                <div className="calendar">
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
            </div>
        )
    }
}
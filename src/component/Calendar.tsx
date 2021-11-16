import moment from "moment";
import React from "react";
import './Calendar.css';

interface ICalendar{
    inputVal: string,
    days: any
};


export class Calendar extends React.Component<{}, ICalendar> {
    state = {
        inputVal: "11.2021",
        days: [...Array(moment(2021 + '-' + 11 + '-' + 1).daysInMonth())].map((_, i) => {
            return moment(2021 + '-' + 11 + '-' + 1).clone().add(i, 'day')
        }),
    };

    onInputChange = (e: any) => {
        this.setState({ inputVal: e.target.value });
    }

    renderCalendar = () => {
        let inputArr = [];
        let startDate: any;

        if (this.state.inputVal) {
            inputArr = this.state.inputVal.split('.')
            startDate = moment(inputArr[1] + '-' + inputArr[0] + '-' + 1);
        }

        this.setState({
            days: [...Array(startDate.daysInMonth())].map((_, i) => {
                return startDate.clone().add(i, 'day')
            })
        }
        )
    }

    render() {
        let daysNew;
        const newDays:any = [];

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
                            return (<p>{
                                day.format('D')
                            }</p>)
                        } else {
                            return (<p>{ }</p>)
                        }
                    }
                    )}
                </div>
            </div>
        )
    }
}
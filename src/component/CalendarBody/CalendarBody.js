const { DateTime } = require("luxon");

export const CalendarBody = ({ daysNew, inputDay, inputMon, inputYear, onDay, inputVal  }) => {

    return (
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
                {daysNew.map((d) => {
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
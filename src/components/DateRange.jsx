import React, { Component } from 'react';
import { DateRange as Dr } from 'react-date-range';
import { Input, Button } from 'reactstrap';
import moment from 'moment';

class DateRange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    handlerChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { name, onChange, value } = this.props;
        const { isOpen } = this.state;
        return (
            <div className="ananda-date-range">
                <div onClick={() => {
                    this.handlerChange({ target: { value: true, name: 'isOpen' } });
                }}>
                    <div className="ananda-date-range-input-container">
                        <Input value={value ? moment(value.startDate).format('DD-MM-YYYY') : ''} readOnly />
                        <Input value={value ? moment(value.endDate).format('DD-MM-YYYY') : ''} readOnly />
                    </div>
                </div>
                {isOpen && (<div className="ananda-date-range-plugin">
                    <Dr
                        startDate={value ? moment(value.startDate) : moment()}
                        endDate={value ? moment(value.endDate) : moment()}
                        lang="es"
                        onInit={(v) => onChange({ target: { name, value: v } })}
                        onChange={(v) => onChange({ target: { name, value: v } })}
                    />
                    <div className="text-left">
                        <Button color="success" onClick={() => {
                            this.handlerChange({ target: { value: false, name: 'isOpen' } });
                        }}>Cerrar</Button>
                    </div>
                </div>)}
            </div>
        );
    }
}

export default DateRange;
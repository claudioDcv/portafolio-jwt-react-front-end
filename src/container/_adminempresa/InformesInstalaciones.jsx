import React, { Component } from 'react';
import moment from 'moment';
import ReactTable from "react-table";

import AdminEmpresaService from '../../http/service/AdminEmpresaService';

class InformesTrabajador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 5,
            date: new Date(),
            data: [],
            totalPage: 0,
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        AdminEmpresaService.informesInstalacionPaginado(this.getSendData()).then(data => {
            this.setState({
                data: data.list,
                totalPage: data.totalPage,
            });
        });
    }

    onChangeDate(valor, tipo) {
        const date = this.state.date;
        if (tipo === 'M') {
            date.setMonth(valor);
        }
        if (tipo === 'Y') {
            date.setFullYear(valor);
        }
        this.setState({
            date,
        }, () => {
            this.getData();
        });
    }

    getSendData = () => {
        const { pageNumber, pageSize, date } = this.state;
        const data = {
            pageNumber,
            pageSize,
            fromDate: moment(date).subtract(1, 'months').format('YYYY-MM-DD'),
            toDate: moment(date).add(1, 'months').format('YYYY-MM-DD'),
        };
        return data;
    }

    getYears = () => {
        return [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
    }

    getMonths = () => {
        return ['Enero', 'Febrero', 'Marzo', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    }

    fetchData = (event) => {
        const { pageSize, page } = event;
        this.setState({ pageSize, pageNumber: page + 1 }, () => {
            this.getData();
        });
    }

    render() {
        const { date, data, totalPage } = this.state;
        return (
            <div>
                <select onChange={(event) => this.onChangeDate(event.target.value, 'M')}>
                    {this.getMonths().map((e, i) => (
                        <option value={i} selected={i === date.getMonth()}>{e}</option>
                    ))}
                </select>

                <select onChange={(event) => this.onChangeDate(event.target.value, 'Y')}>
                    {this.getYears().map(e => (
                        <option value={e} selected={e === date.getFullYear()}>{e}</option>
                    ))}
                </select>

                {date.toString()}
                <br />
                <ReactTable
                    columns={[
                        {
                            Header: "id",
                            accessor: "id"
                        }
                    ]}
                    manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                    data={data}
                    pages={totalPage} // Display the total number of pages
                    onFetchData={this.fetchData} // Request new data when things change
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default InformesTrabajador;
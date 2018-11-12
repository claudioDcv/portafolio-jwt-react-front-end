import React from 'react';
import { Table, Button } from 'reactstrap';
import { isFunction } from '../common/utils';

const TablaVisitasMedicas = ({ visitasMedicas, onConfirm, onRefuse, onShow }) => (
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {visitasMedicas.map((e, i) => (
                <tr key={i} className={e.activo ? "bg-dark text-light" : ''}>
                    <th scope="row">{e.id}</th>
                    <td>{e.fechaRealizacionFormateada}</td>
                    <td>
                        {isFunction(onConfirm) && (
                            <Button
                                color="success"
                                size="sm"
                                className="mr-2"
                                onClick={() => onConfirm(e.id)}
                            >Aceptar</Button>
                        )}
                        {isFunction(onRefuse) && (
                            <Button
                                color="danger"
                                size="sm"
                                className="mr-2"
                                onClick={() => onRefuse(e.id)}
                            >Rechazar</Button>
                        )}
                        {isFunction(onShow) && (
                            <Button
                                color="info"
                                size="sm"
                                className="mr-2"
                                onClick={() => onShow(e.id)}
                            >Ver</Button>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default TablaVisitasMedicas;
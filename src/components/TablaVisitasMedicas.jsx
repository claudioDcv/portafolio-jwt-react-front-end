import React from 'react';
import { Table, Button } from 'reactstrap';
import { isFunction } from '../common/utils';

const TablaVisitasMedicas = ({ visitasMedicas, onConfirm, onRefuse }) => (
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>A</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {visitasMedicas.map(e => (
                <tr>
                    <th scope="row">{e.id}</th>
                    <td>{e.fechaRealizacionFormateada}</td>
                    <td>{e.id}</td>
                    <td>
                        {isFunction(onConfirm) && (
                            <Button color="success" className="mr-2" onClick={() => onConfirm(e.id)}>Aceptar</Button>
                        )}
                        {isFunction(onRefuse) && (
                            <Button color="danger" className="mr-2" onClick={() => onRefuse(e.id)}>Rechazar</Button>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default TablaVisitasMedicas;
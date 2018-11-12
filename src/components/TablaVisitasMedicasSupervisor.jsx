import React from 'react';
import { Table, Button, Badge } from 'reactstrap';
import { isFunction } from '../common/utils';

const TablaVisitasMedicas = ({ visitasMedicas, onConfirm, onRefuse }) => (
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Fecha</th>
                <th>Medico</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {visitasMedicas.map((e, i) => (
                <tr key={i}>
                    <th scope="row">{e.id}</th>
                    <td>{e.fechaRealizacionFormateada}</td>
                    <td>{e.medico.name} {e.medico.surname}</td>
                    <td>
                        {e.confirmacionMedico === 0 && (<Badge color="info">Pendiente</Badge>)}
                        {e.confirmacionMedico === 1 && (<Badge color="success">Aceptado</Badge>)}
                        {e.confirmacionMedico === -1 && (<Badge color="danger">Rechazado</Badge>)}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default TablaVisitasMedicas;
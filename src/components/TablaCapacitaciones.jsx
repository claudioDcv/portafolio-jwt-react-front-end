import React from 'react';
import { Table, Button } from 'reactstrap';
import { isFunction } from '../common/utils';

const TablaCapacitaciones = ({ capacitaciones, onEnter }) => (
    <Table>
        <thead>
            <tr>
                <th>#</th>
                <th>Titulo</th>
                <th>Asistentes Minimos</th>
                <th>Fecha</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {capacitaciones.map((e, i) => (
                <tr key={i}>
                    <th scope="row">{e.id}</th>
                    <td><strong>{e.nombre}</strong></td>
                    <td>{e.asistentesMinimos}</td>
                    <td>{e.fechaRealizacionFormateada}</td>
                    <td>
                        {isFunction(onEnter) && (
                            <Button color="success" className="mr-2" onClick={() => onEnter(e.id)}>Asistentes</Button>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default TablaCapacitaciones;
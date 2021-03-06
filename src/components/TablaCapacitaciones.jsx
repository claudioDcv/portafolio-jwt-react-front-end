import React from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { hasProfile, profileList } from '../common/utils';

const TablaCapacitaciones = ({ capacitaciones, empresaId }) => (
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
                        {hasProfile([profileList.SUPERVISOR]) && empresaId && (
                            <Link to={`/home/empresas/${empresaId}/supervisor/capacitacion/ver/${e.id}`}>
                                <Button color="success" className="mr-2">Asistentes</Button>
                            </Link>
                        )}
                        {hasProfile([profileList.EXAMINADOR]) && empresaId && (
                            <Link to={`/home/empresas/${empresaId}/examinador/capacitacion/${e.id}`}>
                                <Button color="info" className="mr-2">Detalle</Button>
                            </Link>
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
);

export default TablaCapacitaciones;
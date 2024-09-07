import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import almacenService from '../services/almacenService';
import TipoAlmacen from '../constants/tipoAlmacen';

const AlmacenUpdate = () => {
    const [almacen, setAlmacen] = useState({ nombre: '', direccion: '', tipo: '' });
    const [nombreBusqueda, setNombreBusqueda] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (nombreBusqueda) {
            almacenService.getAlmacenByNombre(nombreBusqueda).then(response => {
                setAlmacen(response.data);
            });
        }
    }, [nombreBusqueda]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlmacen({ ...almacen, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (almacen.id) {
            almacenService.updateAlmacen(almacen.id, almacen).then(() => {
                navigate('/almacen-list');
            });
        }
    };

    return (
        <div>
            <h2>Actualizar Almacén</h2>
            <div>
                <label>Buscar por Nombre:</label>
                <input
                    type="text"
                    value={nombreBusqueda}
                    onChange={(e) => setNombreBusqueda(e.target.value)}
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={almacen.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={almacen.direccion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Tipo:</label>
                    <select name="tipo" value={almacen.tipo} onChange={handleChange}>
                        <option value="">Seleccione un tipo</option>
                        <option value={TipoAlmacen.BODEGA}>Bodega</option>
                        <option value={TipoAlmacen.TIENDA}>Tienda</option>
                        <option value={TipoAlmacen.ALMACEN}>Almacen</option>
                        <option value={TipoAlmacen.DEPOSITO}>Deposito</option>
                    </select>
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default AlmacenUpdate;
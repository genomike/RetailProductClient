import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import almacenService from '../services/almacenService';

const AlmacenDelete = () => {
  const [almacen, setAlmacen] = useState({ nombre: '' });
  const [nombreBusqueda, setNombreBusqueda] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (nombreBusqueda) {
      almacenService.getAlmacenByNombre(nombreBusqueda).then(response => {
        setAlmacen(response.data);
      });
    }
  }, [nombreBusqueda]);

  const handleDelete = () => {
    if (almacen.id) {
      almacenService.deleteAlmacen(almacen.id).then(() => {
        navigate('/almacen-list');
      });
    }
  };

  return (
    <div>
      <h2>Eliminar Almacén</h2>
      <div>
        <label>Buscar por Nombre:</label>
        <input
          type="text"
          value={nombreBusqueda}
          onChange={(e) => setNombreBusqueda(e.target.value)}
        />
      </div>
      <p>¿Estás seguro de que deseas eliminar el almacén {almacen.nombre}?</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default AlmacenDelete;
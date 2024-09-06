import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import almacenService from '../services/almacenService';

const AlmacenForm = ({ match, history }) => {
  const [almacen, setAlmacen] = useState({ nombre: '', tipo: '', EstadoEntidad: 'activo' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlmacen({ ...almacen, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    almacenService.createAlmacen(almacen).then(() => {
      navigate('/almacen-list');
    });
  };

  return (
    <div>
      <h2>Crear Nuevo Almacén</h2>
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
          <label>Tipo:</label>
          <select name="tipo" value={almacen.tipo} onChange={handleChange}>
            <option value="">Seleccione un tipo</option>
            <option value="1">Tipo 1</option>
            <option value="2">Tipo 2</option>
            <option value="3">Tipo 3</option>
          </select>
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default AlmacenForm;

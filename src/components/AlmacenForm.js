import React, { useState, useEffect } from 'react';
import almacenService from '../services/almacenService';

const AlmacenForm = ({ match, history }) => {
  const [almacen, setAlmacen] = useState({ nombre: '' });
  const almacenId = match.params.id;

  useEffect(() => {
    if (almacenId) {
      almacenService.getAlmacenById(almacenId).then(response => {
        setAlmacen(response.data);
      });
    }
  }, [almacenId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlmacen({ ...almacen, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (almacenId) {
      almacenService.updateAlmacen(almacenId, almacen).then(() => {
        history.push('/');
      });
    } else {
      almacenService.createAlmacen(almacen).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <div>
      <h2>{almacenId ? 'Actualizar Almacén' : 'Crear Almacén'}</h2>
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
        <button type="submit">{almacenId ? 'Actualizar' : 'Crear'}</button>
      </form>
    </div>
  );
};

export default AlmacenForm;

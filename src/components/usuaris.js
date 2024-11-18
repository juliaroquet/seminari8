// src/components/Usuaris.js
"use client";

import React, { useEffect, useState } from 'react';
import userService from '../services/userService';
import styles from '../styles/Usuaris.css';

const Usuaris = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        name: '',
        mail: '',
        password: '',
        comment: ''
    });
    const [indiceEdicion, setIndiceEdicion] = useState(null);
    //const [formSubmitted, setFormSubmitted] = useState(false);
    const [confirmarPassword, setConfirmarPassword] = useState('');

    useEffect(() => {
        const fetchUsuarios = async () => {
            const data = await userService.getUsers();
            setUsuarios(data);
        };

        fetchUsuarios();
    }, []);

    const agregarElemento = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        if (nuevoUsuario.password !== confirmarPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        if (indiceEdicion !== null) {
            const usuarioActualizado = { ...nuevoUsuario, _id: usuarios[indiceEdicion]._id };
            await userService.updateUser(usuarioActualizado);
            const usuariosActualizados = [...usuarios];
            usuariosActualizados[indiceEdicion] = usuarioActualizado;
            setUsuarios(usuariosActualizados);
            setIndiceEdicion(null);
        } else {
            const usuarioAgregado = await userService.addUser(nuevoUsuario);
            setUsuarios([...usuarios, usuarioAgregado]);
        }

        resetForm();
    };

    const resetForm = () => {
        setNuevoUsuario({ name: '', mail: '', password: '', comment: '' });
        setConfirmarPassword('');
        setFormSubmitted(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.form-container}>
                <h1>{indiceEdicion !== null ? 'Editar usuario' : 'Agregar un nuevo usuario'}</h1>
                <form onSubmit={agregarElemento}>
                    <div className="form-group">
                        <label htmlFor="nombre" className={styles.label}>Nombre:</label>
                        <input 
                            id="nombre" 
                            value={nuevoUsuario.name}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, name: e.target.value })}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mail" className={styles.label}>Email:</label>
                        <input 
                            id="mail" 
                            value={nuevoUsuario.mail}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, mail: e.target.value })}
                            required 
                            type="email" 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className={styles.label}>Contraseña:</label>
                        <input 
                            id="password" 
                            value={nuevoUsuario.password}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                            required 
                            type="password" 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmarPassword" className={styles.label}>Confirmar Contraseña:</label>
                        <input 
                            id="confirmarPassword" 
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                            required 
                            type="password" 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment" className={styles.label}>Comentario:</label>
                        <textarea 
                            id="comment" 
                            value={nuevoUsuario.comment}
                            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, comment: e.target.value })}
                        />
                    </div>

                    <button type="submit" className={styles.submit-button}>
                        {indiceEdicion !== null ? 'Actualizar' : 'Agregar'}
                    </button>
                </form>
            </div>

            <div className={styles.lista-usuarios}>
                <h2>Lista de Usuarios</h2>
                <ul>
                    {usuarios.map((usuario, index) => (
                        <li key={usuario._id}>
                            <div className={styles.user-info}>
                                <strong>{usuario.name}</strong>
                                <div className={styles.user-details}>
                                    <p>Email: {usuario.mail}</p>
                                    <p>Comentario: {usuario.comment}</p>
                                </div>
                            </div>
                            <div className={styles.button-container}>
                                <button className="mostrar-detalles" onClick={() => prepararEdicion(index)}>Mostrar Detalles</button>
                                <button className="modificar" onClick={() => prepararEdicion(index)}>Modificar</button>
                                <button className="eliminar" onClick={() => eliminarElemento(usuario._id)}>Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Usuaris;

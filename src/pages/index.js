import Usuaris from '../components/usuaris.js';
import ExperiencesPage from '../pages/ExperiencesPage.js';

export default function Page() {
    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <Usuaris />
            <hr />
            <h2>Gestión de Experiencias</h2>
            <ExperiencesPage />
        </div>
    );
}

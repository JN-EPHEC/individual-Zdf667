import { useEffect, useState } from 'react';
import './App.css'

// Interface pour typer nos utilisateurs
interface User {
  id: number;
  nom: string;
  prenom: string;
  age: number;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les données
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data: User[] = await response.json();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Impossible de contacter le serveur. Vérifiez qu'il est bien lancé...");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h1>Gestion des Utilisateurs</h1>
      
      {/* Affichage de l'erreur si elle existe */}
      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Âge</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.prenom}</td>
                  <td>{user.nom}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {users.length === 0 && !error && <p>Aucun utilisateur trouvé en base de données.</p>}
        </div>
      )}
    </div>
  );
}
export default App;
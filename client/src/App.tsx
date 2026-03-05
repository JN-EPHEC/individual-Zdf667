import { useEffect, useState } from 'react';
import axios from 'axios';

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

  // Fonction pour récupérer les données
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Ma première App Full Stack</h1>
      
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table border={1} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
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
      )}
      
      {users.length === 0 && !loading && <p>Aucun utilisateur trouvé.</p>}
    </div>
  );
}

export default App;
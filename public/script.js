const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');

//Charger les utilisateurs
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        const listDisplay = document.getElementById("userList"); 
        listDisplay.innerHTML = '';
        
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${user.prenom} ${user.nom}
                <span class="badge bg-secondary rounded-pill">ID: ${user.id}</span>
            `;
            listDisplay.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors du chargement:", error);
    }
}

// Gestion du formulaire (Ajout)
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom })
        });

        if (response.ok) {
            userForm.reset(); 
            loadUsers(); 
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
    }
});

// Charger la liste au démarrage
loadUsers();
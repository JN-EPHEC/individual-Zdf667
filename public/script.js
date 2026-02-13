const userList = document.getElementById('userList');
const userForm = document.getElementById('userForm');
const avgAgeAffiche = document.getElementById('avgAge')

//Charger les utilisateurs
async function loadUsers() {
    try {
        const response = await fetch('/api/users');

        if (!response.ok) {
            console.error("Le serveur a renvoyé une erreur");
            return;
        }
        const users = await response.json();

        // Chargement des stats
        const resStats = await fetch('/api/users/stats');
        const stats = await resStats.json()
        avgAgeAffiche.textContent = stats.averageAge;

        const listDisplay = document.getElementById("userList"); 
        listDisplay.innerHTML = '';
        
        users.forEach(user => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div>
                    <strong>${user.prenom} ${user.nom}</strong>
                    <span class="text-muted ms-2">(${user.age} ans)</span>
                </div>
                    <button class="btn btn-outline-danger btn-sm" onclick="window.deleteUser(${user.id})">x</button>
            `;
            listDisplay.appendChild(li);
        });
    } catch (error) {
        console.error("Erreur lors du chargement:", error);
    }
}

//Ajout de la focntion pour supprimer
window.deleteUser = async function supprmierUser(id){
    if (confirm("Veux-tu vraiment supprimé ?")) {
        try{
            const response = await fetch(`/api/users/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadUsers();
            } else {
                alert("Erreur de suppression");
            }
        } catch (error) {
            console.error("Erreur delete:", error)
        }
    }
}
// Gestion du formulaire (Ajout)
userForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const age = parseInt(document.getElementById('age').value);

    // Envoie au serveur
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom, prenom, age})
        });

        if (response.ok) {
            userForm.reset(); 
            loadUsers(); 
        } else {
            const errorData = await response.json();
            alert("Erreur: " + errorData.message);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout:", error);
    }
});

// Charger la liste au démarrage
loadUsers();
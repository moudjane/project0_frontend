<template>
    <div>
        <h1>Liste des utilisateurs</h1>
        <ul>
            <li v-for="user in users" :key="user._id">
                <span v-if="user.username !== currentUser">{{ user.username }}</span>
                <span v-else>
                    <span v-if="!isEditing">
                        <strong>{{ user.username }}</strong>
                        <button @click="isEditing = true">Modifier</button>
                    </span>
                    <span v-else>
                        <input v-model="newUsername" placeholder="Nouveau nom d'utilisateur" />
                        <input v-model="newPassword" type="password" placeholder="Nouveau mot de passe" />
                        <button @click="updateUser(user)">Sauvegarder</button>
                        <button @click="isEditing = false">Annuler</button>
                    </span>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            currentUser: '',
            isEditing: false,
            newUsername: '',
            newPassword: '',
        };
    },
    async created() {
        await this.fetchUsers();
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.currentUser = payload.username;
        }
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await fetch('http://localhost:3000/users', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                this.users = data;
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            }
        },

        async updateUser(user) {
            if (!this.newUsername && !this.newPassword) {
                alert("Le nom d'utilisateur ou le mot de passe doivent être remplis.");
                return;
            }

            if (this.newUsername) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${user._id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({ username: this.newUsername }),
                    });

                    const data = await response.json();
                    user.username = this.newUsername;
                    this.newUsername = '';
                } catch (error) {
                    console.error('Erreur lors de la mise à jour du nom d\'utilisateur :', error);
                }
            }

            if (this.newPassword) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${user._id}/password`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({ newPassword: this.newPassword }),
                    });

                    const data = await response.json();
                    alert(data.message || 'Mot de passe mis à jour avec succès.');
                    this.newPassword = '';
                } catch (error) {
                    console.error('Erreur lors de la mise à jour du mot de passe :', error);
                }
            }

            this.isEditing = false;
        },
    },
};
</script>
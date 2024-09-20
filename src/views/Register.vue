<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="register">
            <input v-model="username" placeholder="Nom d'utilisateur" required />
            <input type="password" v-model="password" placeholder="Mot de passe" required />
            <button type="submit">S'inscrire</button>
        </form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            message: '',
        };
    },
    methods: {
        async register() {
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    this.message = data.message;
                    this.$router.push('/login');
                } else {
                    this.message = data.message || 'Erreur lors de l\'inscription.';
                }
            } catch (error) {
                this.message = 'Erreur lors de la connexion au serveur.';
                console.error('Erreur lors de la requête d\'inscription :', error);
            }
        },
    },
};
</script>
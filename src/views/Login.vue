<template>
    <div>
      <h1>Connexion</h1>
      <form @submit.prevent="login">
        <input v-model="username" placeholder="Nom d'utilisateur" required />
        <input type="password" v-model="password" placeholder="Mot de passe" required />
        <button type="submit">Se connecter</button>
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
      async login() {
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });
  
          const data = await response.json();
  
          if (data.token) {
            localStorage.setItem('token', data.token); // Stocker le token dans localStorage
            this.$router.push('/'); // Redirige vers la page d'accueil après connexion
          } else {
            this.message = data.error || 'Erreur lors de la connexion.';
          }
        } catch (error) {
          this.message = 'Erreur lors de la connexion au serveur.';
          console.error('Erreur de connexion :', error);
        }
      },
    },
  };
  </script>
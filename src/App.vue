<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>

        <li v-if="!isAuthenticated"><router-link to="/register">Inscription</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Connexion</router-link></li>

        <li v-if="isAuthenticated"><router-link to="/users">Liste des utilisateurs</router-link></li>
        <li v-if="isAuthenticated"><button @click="logout">Déconnexion</button></li>
      </ul>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'), 
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/'); 
      location.reload();
    },
  },
  mounted() {
    window.addEventListener('storage', () => {
      this.isAuthenticated = !!localStorage.getItem('token');
    });
  },
  watch: {
    // Mettre à jour l'état isAuthenticated lorsqu'il change
    '$route'() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
  },
};
</script>

<style>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background);
  z-index: 1000;
  padding: 1rem 2rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
}

nav ul li {
  display: inline;
}

nav ul li a {
  text-decoration: none;
  color: #42b983;
}

nav ul li button {
  background-color: transparent;
  border: none;
  color: #42b983;
  cursor: pointer;
}

nav ul li a:hover, nav ul li button:hover {
  text-decoration: underline;
}

#app {
  padding-top: 80px;
}

</style>
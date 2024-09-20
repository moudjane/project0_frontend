<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/register">Inscription</router-link></li>
        <li v-if="!isAuthenticated"><router-link to="/login">Connexion</router-link></li>
        <li v-if="isAuthenticated"><router-link to="/users">Liste des utilisateurs</router-link></li>
        <li v-if="isAuthenticated"><button @click="logout">Déconnexion</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token')
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/'); 
      location.reload();
    }
  },
  mounted() {
    window.addEventListener('storage', () => {
      this.isAuthenticated = !!localStorage.getItem('token');
    });
  }
};
</script>

<style scoped>
header {
  background-color: var(--color-background);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
}

nav ul li a, nav ul li button {
  text-decoration: none;
  color: #42b983;
}

nav ul li button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

nav ul li a:hover, nav ul li button:hover {
  text-decoration: underline;
}
</style>
<template>
    <div>
        <h1 v-if="!isAuthenticated">Inscrivez-vous et connectez-vous pour accéder à l'application.</h1>
        <h1 v-if="isAuthenticated">Bonjour vous êtes connecté {{ username }} </h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isAuthenticated: !!localStorage.getItem('token')
        };
    },
    mounted() {
        window.addEventListener('storage', () => {
            this.isAuthenticated = !!localStorage.getItem('token');
        });
    }
};
</script>
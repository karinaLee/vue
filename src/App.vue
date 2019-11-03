<template>
  <div id="app">
     <v-app id="inspire">

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
     </v-app>
  </div>
</template>

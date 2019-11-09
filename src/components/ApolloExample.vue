<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../graphql/quake.gql')"
      >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <div v-for="quake in data.quakes" :key="quake.id">
            {{quake.id}}
          </div>

        </div>

        <!-- No result -->
        <!-- <div v-else class="no-result apollo">No result :(</div> -->
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
// import FILES from '../graphql/Files.gql'
// import UPLOAD_FILE from '../graphql/UploadFile.gql'

export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
</style>

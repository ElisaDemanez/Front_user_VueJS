export default {


  created() {
    this.$root.connected = localStorage.getItem("admin_mode");

    if (!this.$root.connected)
      this.$router.push({
        name: "Connection"
      })
  },
  updated() {
    if (!this.$root.connected)
      this.$router.push({
        name: "Connection"
      })
  }
}

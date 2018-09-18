export default {


  created() {
    this.$root.connected = localStorage.getItem("admin_mode");

    console.log("mixin created" + this.$root.connected)
    if (!this.$root.connected)
      this.$router.push({
        name: "Connection"
      })
  },
  updated() {
    console.log("mixin upadeted" + this.$root.connected)
    if (!this.$root.connected)
      this.$router.push({
        name: "Connection"
      })
  }
}

<template>
  <form>
    <h3>Forgot Password</h3>

    <div className="form-group">
      <label>Email address</label>
      <label>
        <input type="email" className="form-control form-control-lg"/>
      </label>
    </div>

    <button type="submit" className="btn btn-dark btn-lg btn-block">Reset password</button>

  </form>
</template>

<script>
export default {
  name: "ForgotPassword",

  data() {
    return {}
  }
}
</script>

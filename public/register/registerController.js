App.RegisterController = Ember.Controller.extend({
    actions: {
        register: function () {
            var username = this.get('username'),
                password = this.get('password');

            if (username && password) {
                App.Session.register(username, password);
            }
        }
    }
});
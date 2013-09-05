App.AuthBarController = Ember.Controller.extend({
    actions: {
        authenticate: function () {
            var username = this.get('username'),
                password = this.get('password');

            if (username && password) {
                App.Session.authenticate(username, password);
            }
        },

        logout: function () {
            this.set('username', "");
            this.set('password', "");

            App.Session.logout();
        }
    }
});
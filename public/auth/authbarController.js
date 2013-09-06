App.AuthBarController = Ember.Controller.extend({
    actions: {
        authenticate: function () {
            var username = this.get('username'),
                password = this.get('password');

            if (username && password) {
                App.Session.authenticate(username, password);
//                this.get('target').transitionToRoute('home');
            }
        },

        logout: function () {
            this.set('username', "");
            this.set('password', "");

            App.Session.logout();
            this.get('target').transitionToRoute('loggedOut');
        }
    }
});
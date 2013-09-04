Ember.Application.initializer({
    name: 'session',
    initialize: function () {

        $.cookie.defaults.expires = 14; // in Days

        App.Session = Ember.Object.extend({
            authToken: null,
            username: null,

            init: function () {
                this._super();

                var authToken = $.cookie('auth_token');

                if (authToken) {
                    this.set('authToken', authToken);
                    this.authenticateWithToken(authToken);
                }
            },

            authTokenChanged: function () {
                var authToken = this.get('authToken');
                if (authToken) {
                    $.cookie('auth_token', authToken);
                } else {
                    $.removeCookie('auth_token');
                }
            }.observes('authToken'),

            isAuthenticated: function () {
                return this.get('authToken') && this.get('username');
            }.property('authToken', 'username'),

            authenticate: function (username, password) {
                this.sendAuthenticationRequest('post', { username: username, password: password });
            },

            authenticateWithToken: function (authToken) {
                this.sendAuthenticationRequest('put', { token: authToken });
            },

            sendAuthenticationRequest: function (method, requestBody) {
                $.ajax({
                    url: '/auth',
                    method: method,
                    data: requestBody,
                    context: this
                }).then(this.authenticationSuccess, this.authenticationFailure);
            },

            authenticationSuccess: function (data) {
                var token = data.token,
                    username = data.username;

                this.set('username', username);
                this.set('authToken', token);
            },

            authenticationFailure: function () {
                console.log("Authentication Failure: ", arguments);
                this.logout();
            },

            logout: function () {
                this.sendAuthenticationRequest('delete', { token: this.get('authToken') });
            }

        }).create();

    }
});

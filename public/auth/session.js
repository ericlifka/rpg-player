Ember.Application.initializer({
    name: 'session',
    initialize: function () {

        $.cookie.defaults.expires = 14; // in Days

        App.Session = Ember.Object.extend({
            authToken: null,
            username: null,
            userId: null,

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
                }
            }.observes('authToken'),

            isAuthenticated: function () {
                return !!(this.get('authToken') && this.get('username') && this.get('userId'));
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
                    username = data.username,
                    id = data.id;

                this.set('authToken', token);
                this.set('username', username);
                this.set('userId', id);
            },

            authenticationFailure: function () {
                this.set('authToken', null);
                this.set('username', null);
                this.set('userId', null);
            },

            logout: function () {
                this.sendAuthenticationRequest('delete', { token: this.get('authToken') });
            },

            register: function (username, password) {
                $.ajax({
                    url: '/user',
                    method: 'post',
                    data: {
                        username: username,
                        password: password
                    },
                    context: this
                }).then(this.authenticationSuccess, this.authenticationFailure);
            }

        }).create();

    }
});

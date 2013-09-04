Ember.Application.initializer({
    name: 'session',
    initialize: function (container, application) {

        App.Session = Ember.Object.extend({
            init: function () {
                this._super();

                this.set('authToken', $.cookie('auth_token'));
                this.set('authAccountId', $.cookie('auth_account'));
            },

            authTokenChanged: function () {
                var authToken = this.get('authToken');
                $.cookie('auth_token', authToken);
            }.observes('authToken'),

            authAccountIdChanged: function () {
                var authAccountId = this.get('authAccountId');
                $.cookie('auth_account', authAccountId);
            }.observes('authAccountId'),

            isAuthenticated: function () {
                return this.get('authToken') && this.get('authAccountId');
            }.property('authToken', 'authAccountId'),

            authenticate: function (username, password) {
                $.ajax({
                    url: '/auth',
                    method: 'post',
                    data: {
                        username: username,
                        password: password
                    },
                    context: this
                }).then(function (data) {
                        var token = data.token;
                        this.set('username', username);
                        this.set('authToken', token);
                        this.set('authAccountId', password);
                    });
            },

            logout: function () {
                this.set('username', "");
                this.set('authToken', "");
                this.set('authAccountId', "");
            }

        }).create();

    }
});

App = Ember.Application.create();

App.Router.map(function () {
    this.route("home");
    this.route("loggedOut");
});

App.ApplicationRoute = Ember.Route.extend({
    redirect: function () {
        if (!App.Session.get('isAuthenticated')) {
            this.transitionTo('index');
        }
    },

    authenticatedWatcher: function () {
        if (App.Session.get('isAuthenticated')) {
            this.transitionTo('home');
        } else {
            this.transitionTo('index');
        }
    }.observes('App.Session.isAuthenticated')
});

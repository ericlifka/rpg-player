App = Ember.Application.create();

App.Router.map(function () {
    this.route("home");
    this.route("loggedOut");
//    this.route("register");
});

App.ApplicationRoute = Ember.Route.extend({
    authenticatedWatcher: function () {
        if (App.Session.get('isAuthenticated')) {
            this.transitionTo('home');
        } else {
            this.transitionTo('index');
        }
    }.observes('App.Session.isAuthenticated')
});

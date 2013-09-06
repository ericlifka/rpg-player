App.IndexRoute = Ember.Route.extend({
    authenticatedWatcher: function () {
        if (App.Session.get('isAuthenticated')) {
            this.transitionTo('home');
        }
    }.observes('App.Session.isAuthenticated')
});

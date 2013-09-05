App = Ember.Application.create();

App.Router.map(function () {
    this.route("home", { path: "/" });
});

App.IndexRoute = Ember.Route.extend({
});


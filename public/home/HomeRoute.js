App.HomeRoute = Ember.Route.extend({
    model: function () {
        return this.get('store').find('user', App.Session.get('userId'));
    }
});

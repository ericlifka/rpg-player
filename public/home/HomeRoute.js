App.HomeRoute = Ember.Route.extend({
    model: function () {
        return $.ajax({
            url: '/user',
            method: 'get'
        });
    }
});

App.Game = DS.Model.extend({
    title: DS.attr(),
    owner: DS.attr(),
    participants: DS.attr(),

    pictures: DS.attr(),
    comments: DS.hasMany('comment')
});
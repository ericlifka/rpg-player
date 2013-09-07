App.Comment = DS.Model.extend({
    author: DS.attr(),
    content: DS.attr(),

    game: DS.belongsTo('game')
});
//note queries
module.exports = {
    //author info para note quando requested
    author: async (note, args, { models }) => {
        return await models.User.findById(note.author);
    },
    //favoritedBy info quando pedido
    favoritedBy: async (note, args, { models }) => {
        return await models.User.find({ _id: { $in: note.favoritedBy } });
    }
};
//user queries
module.exports = {
    //devolve lista de users
    notes: async (user, args, { models }) => {
        return await models.Note.find({ author: user._id }).sort({ _id: -1 });
    },
    //devolve lista de favoritos de um user
    favorites: async (user, args, { models }) => {
        return await models.Note.find({ favoritedBy: user._id }).sort({ _id: -1 });
    }
};
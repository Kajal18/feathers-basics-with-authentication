exports.populateMovieFields = () => {
    return async (context) => {
        const sequelize = context.app.get('sequelizeClient')
        const { user: userModel } = sequelize.models
        const { user } = context.params
        context.params.sequelize = {
            raw: false,
            include: [
                { model: userModel, as: 'director' },
                { model: userModel, as: 'producer' }
            ]
        }
    }
}
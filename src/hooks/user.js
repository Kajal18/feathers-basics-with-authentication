exports.populateUserFields = () => {
    return async (context) => {
        const sequelize = context.app.get('sequelizeClient')
        const { movie } = sequelize.models
        const { user } = context.params
        context.params.sequelize = {
            raw: false,
            include: [
                { model: movie, as: 'directedMovie' },
                { model: movie, as: 'producedMovie' }
            ]
        }
    }
}
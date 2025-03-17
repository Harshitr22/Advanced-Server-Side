const AttractionsDAO = require('../DOAs/AttractionsDOA')

class AttractionService{
    constructor(){
        this.attractionDao = new AttractionsDAO()
    }

    async getAll(){
        try {
            const results = await this.attractionDao.getAll()
            return results.data
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAttraction(attractionId){
        try {
            const all = await this.attractionDao.getAll()
            const results = all.filter(Object => Object.id != attractionId)
            return results
        } catch (error) {
            console.log(error)
        }
    }

    async create(req){
        try {
            const result =  await this.attractionDao.create(req)
            return result
        } catch (ex) {
            console.error(ex)
        }
    }

}

module.exports = AttractionService
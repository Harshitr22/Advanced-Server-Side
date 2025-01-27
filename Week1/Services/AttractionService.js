const AttractionsDAO = require('../DOAs/AttractionsDOA')

class AttractionService{
    constructor(){
        this.attractiondao = new AttractionsDAO()
    }

    async getAll(){
        try {
            const results = await this.attractiondao.getAll()
            return results
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAttraction(attractionid){
        try {
            const all = await this.attractiondao.getAll()
            const results = all.filter(Object => Object.id != attractionid)
            return results
        } catch (error) {
            console.log(error)
        }
    }

    async updateAttraction(attractionid, name){
        try {
            const all = await this.attractiondao.getAll()
            const results = all.da
            return all
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = AttractionService
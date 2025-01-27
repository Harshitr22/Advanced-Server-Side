class AttractionsDAO{

    constructor(){

    }

    async getAll()
    {
        const data = [
            {   
                id: 1,
                name: 'London Bridge',
                location: 'London',
                desc: 'Bridge in London'
            },
            {
                id: 2,
                name: 'Buckingham Palace',
                location: 'London',
                desc: 'Kings Residence'
            },
            {
                id: 3,
                name: 'Tower Bridge',
                location: 'London',
                desc: 'Bridge in London'
            },
            ]
        return await data;
    }
}
        

module.exports = AttractionsDAO
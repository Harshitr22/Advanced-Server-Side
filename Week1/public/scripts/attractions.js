document.getElementById('getAttractions').addEventListener('click', (e)=> {
    getAllAttraction();
});

async function getAllAttraction(){
    try {
        const response = await fetch('/api/attractions');
        if(!response.ok){
            throw new Error('You messed up, mate. Go debug', response.data);
        }

        const data = await response.json();
        //console.log(data);

        var table = `
        <table border='1'>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Location</th>
                <th>Description</th>
            </tr>`
            
            data.forEach(record => {
                var row = 
                    `<tr>
                        <td>${record._attractId_ }</td>
                        <td>${record._name_}</td>
                        <td>${record._location_}</td>
                        <td>${record._desc_}</td>
                    </tr>`
                table += row;
            })
            table += '</table>';
            document.getElementById('results').innerHTML = table;
    } catch (error) {
        console.log(error);
    }
}
document.getElementById('contact-submit').addEventListener('click', ()=>{
    submit();
    window.location.href= "../views/createform.html"
})

async function submit(){
    var name = document.getElementById('name').value
    var location = document.getElementById('loc').value
    var desc = document.getElementById('desc').value

    object = {
        "name": name,
        "loc": location,
        "desc": desc
    }
    const response = await fetch('http://localhost:3000/newRecord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(object)
    })
}
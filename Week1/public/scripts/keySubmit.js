document.getElementById('key-submit').addEventListener('click', ()=>{
    submit();
    window.location.href= "../views/createKey.html"
})

async function submit(){
    var name = document.getElementById('name').value;

    object = {
        "name": name,
        
    }
    const response = await fetch('http://localhost:3000/createAPIKey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(object)
    })
}
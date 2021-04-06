const goHome = () => {
    window.location.href = '/items'
}

const delItem = (inItem) => {
    let delID = {
        id:inItem
    }
    delID = JSON.stringify(delID)
    try {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: delID
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
            })
    } catch (err) {
        console.error('Error:', err)
    }
}

const editItem = (initem) => {
    const imageext = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
    const priceRegEx = /^\d+(,\d{3})*(\.\d{1,2})?$/gm

    if ($(`#name${initem}`).val().length === 0) {
        alert('Please input a name')
        return false
    }

    if ($(`#desc${initem}`).val().length === 0) {
        alert('Please input a description')
        return false
    }

    if (!(priceRegEx.test($(`#price${initem}`).val()))) {
        alert('Please submit a correct price')
        return false
    }
    
    try {
        $(`#image${initem}`)[0].files[0].type
    } catch {
        alert('Please submit a valid image')
        return false
    }
    let imagetype = $(`#image${initem}`)[0].files[0].type
    imagetype = imagetype.split('/')
    try {
        imagetype = imagetype[1].toLowerCase()
    } catch {
        alert('Please submit a valid image')
        return false
    }
    
    if(!(imageext.includes(imagetype))) {
        alert('Please submit a valid image')
        return false
    }
    
    console.log($(`#name${initem}`).val())
    let formdata = new FormData()
    let user = {
        id: initem,
        name: $(`#name${initem}`).val(),
        desc: $(`#desc${initem}`).val(),
        price: $(`#price${initem}`).val()
    }
    user = JSON.stringify(user)
    formdata.append('body',user)
    formdata.append('file',$(`#image${initem}`)[0].files[0])
    console.log(formdata)
    
    try {
        fetch('/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: user
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data)
            })
    } catch (err) {
        console.error('Error:', err)
    }
    
}

$('#Delete').click(() => {
    console.log('Delete')
})
/*
$('#Edit').click(() => {

})*/
const goHome = () => {
    window.location.href = '/items'
}

const delItem = (inItem) => {
    let delID = {
        id: inItem
    }
    delID = JSON.stringify(delID)
    try {
        fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: delID
        }).then(window.location.href = '/items')
    } catch (err) {
        console.error('Error:', err)
    }
}

$(function () {
    $('form').submit(function () {
        const imageext = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
        const priceRegEx = /^\d+(,\d{3})*(\.\d{1,2})?$/gm
        if ($(`#name`).val().length === 0) {
            alert('Please input a name')
            return false
        }

        if ($(`#desc`).val().length === 0) {
            alert('Please input a description')
            return false
        }

        if (!(priceRegEx.test($(`#price`).val()))) {
            alert('Please submit a correct price')
            return false
        }

        try {
            $(`#image`)[0].files[0].type
        } catch {
            alert('Please submit a valid image')
            return false
        }
        let imagetype = $(`#image`)[0].files[0].type
        imagetype = imagetype.split('/')
        try {
            imagetype = imagetype[1].toLowerCase()
        } catch {
            alert('Please submit a valid image')
            return false
        }

        if (!(imageext.includes(imagetype))) {
            alert('Please submit a valid image')
            return false
        }
    })
})
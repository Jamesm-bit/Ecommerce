let displayeditfeilds = false;

let cart = JSON.parse(window.localStorage.getItem('Cart'))
$('#cartcount').text("Cart: " + cart.length)

const goHome = () => {
    window.location.href = '/items'
}

const checkout = () => {
    window.location.href = '/checkout'
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

const addToCart = () => {
    cart = JSON.parse(window.localStorage.getItem('Cart'))
    let name = $('.name').html().trim().split(':')
    name = name[1].trim()
    let desc = $('.description').html().trim().split(':')
    desc = desc[1].trim()
    let price = $('.price').html().trim().split(':')
    price = price[1].trim()
    let img = $('.image').attr('src')
    let item = { name, desc, price, img }
    let itemarray = []
    if (cart === null) {
        itemarray.push(item)
        window.localStorage.setItem('Cart', JSON.stringify(itemarray))
        return
    }
    for (place in cart) {
        itemarray.push(cart[place])
    }
    console.log(item)
    itemarray.push(item)
    window.localStorage.setItem('Cart', JSON.stringify(itemarray))
    cart = JSON.parse(window.localStorage.getItem('Cart'))
    $('#cartcount').text("Cart: " + cart.length)
}

$(function () {
    $('form').submit(function () {
        if (!displayeditfeilds) {
            $(`#name`).toggle()
            $(`#desc`).toggle()
            $(`#price`).toggle()
            $(`#image`).toggle()
            displayeditfeilds = true
            return false
        }
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
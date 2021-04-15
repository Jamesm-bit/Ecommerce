let cart = JSON.parse(window.localStorage.getItem('Cart'))
$('#cartcount').text("Cart: "+cart.length)

const goHome = () => {
    window.location.href = '/items'
}

const Checkout = () => {
    alert('Thank you for Shopping with us!')
    window.localStorage.removeItem('Cart')
    window.location.href = '/items'
}

const renderCart = () => {
    cart = JSON.parse(window.localStorage.getItem('Cart'))
    for(item in cart) {
        let cartdiv = document.createElement("div")
        cartdiv.id = 'items'
        cartdiv.className = 'container-fluid'

        let detaildiv = document.createElement("div")
        detaildiv.className = 'listitemsholder'

        let namecart = document.createElement('p')
        namecart.className = 'name listobj'
        namecart.innerHTML = cart[item].name

        let desccart = document.createElement("p")
        desccart.className = 'desc listobj'
        desccart.innerHTML = cart[item].desc

        let pricecart = document.createElement("p")
        pricecart.className = 'price listobj' 
        pricecart.innerHTML = cart[item].price

        let imagecart = document.createElement("img")
        imagecart.className = 'image'
        imagecart.src = cart[item].img

        detaildiv.append(namecart,desccart,pricecart)

        cartdiv.append(detaildiv)
        cartdiv.append(imagecart)
        //let namecart = `<p class='name'>${cart[item].name}</p>`
        $('.items').append(cartdiv)

        //$('#items').append(namecart)
    }
}

renderCart()
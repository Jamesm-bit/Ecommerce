let arrayOfItems = []
let page = 0
let pagesize = 10
let pageToggle = false
let countOfItems = 0


let cart = JSON.parse(window.localStorage.getItem('Cart'))
$('#cartcount').text("Cart: "+cart.length)

const moveToAdd = () => {
    window.location.href = './additems'
}

const goHome = () => {
    window.location.href = './'
}

const checkout = () => {
    window.location.href = '/checkout'
}

const togglePage = (page) => {
    console.log($('.items').children().length)
    for (let j = 0; j < page * 10; j++) {
        $('.' + (j)).css('display', 'none');
    }
    for (let i = page * 10; i < (page * 10) + 10; i++) {
        $('.' + (i)).css('display', 'flex');
    }
    for (let k = (page * 10) + 10; k < $('.items').children().length; k++) {
        $('.' + (k)).css('display', 'none');
    }
}

const passElement = (thisElement) => {
    console.log($(thisElement).attr("class"))
    window.location.href = `../items/${$(thisElement).attr("class")}`
}

$('#next').click(function () {
    if (pageToggle) {
        togglePage(page)
        page++
        togglePage(page)
    }

})
$('#prev').click(function () {
    if (pageToggle) {
        if (page > 0) {
            togglePage(page)
            page--;
            togglePage(page)
        }
    }
})
pageToggle = true
$(window).on("load", togglePage())
let arrayOfItems = []
let page = 0
let pagesize = 10
let pageToggle = false
let countOfItems = 0
fetch('/itemlist', {
    method: 'GET',
    headers: {
        'Authorization': 'test',
    }
}).then(
    response => response.json()
).then(
    res => createElements(res)
)

const createElements = (inArray) => {
    countOfItems = inArray.length
    if (inArray.length > 10) {
        pageToggle = true
        $('#next').toggle()
        $('#prev').toggle()
    }

    for (item in inArray) {
        console.log(inArray[item])
        let div = $(`<div class=${item} onclick=pickItem(${item}) id='items'></div>`)
        let name = $("<p class='name'></p>").text('Name:' + inArray[item].name)
        let desc = $("<p class='desc'></p>").text('Description:' + inArray[item].desc)
        let price = $("<p class='price'></p>").text('Price:' + inArray[item].price)
        let image = $("<img />", {
            class: 'image',
            src: `data:image/jpeg;base64,${inArray[item].img}`
        })
        div.append(name, desc, price, image)
        $('.items').append(div)
    }
    togglePage(page)
}

const pickItem = (id) => {
    id = '.' + id
    $('#itemholder').css('display', 'flex')
    $('.items').toggle()
    $('#next').toggle()
    $('#prev').toggle()
    $('#gotolist').toggle()
    $('.namedesc').text($(id).children('.name').text())
    $('.descriptiondesc').text($(id).children('.desc').text())
    $('.pricedesc').text($(id).children('.price').text())
    $('#imgdesc').attr('src',$(id).children('.image').attr('src'))
}

const moveToList = () => {
    $('#itemholder').css('display', 'none')
    $('.items').toggle()
    $('#next').toggle()
    $('#prev').toggle()
    $('#gotolist').toggle()
}

const moveToAdd = () => {
    window.location.href = '../'
}

const togglePage = (page) => {
    $('#items').css('display', 'none')
    for (let j = 0; j < page * 10; j++) {
        $('.' + (j)).css('display', 'none');
    }
    for (let i = page * 10; i < (page * 10) + 10; i++) {
        $('.' + (i)).css('display', 'flex');
    }
    for (let k = (page * 10) + 10; k < countOfItems; k++) {
        $('.' + (k)).css('display', 'none');
    }
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
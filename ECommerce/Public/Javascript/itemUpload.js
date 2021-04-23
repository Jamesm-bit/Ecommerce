const goToList = () => {
    window.location.href = '/items'
}

//testing the pull request
$(function () {
    $('form').submit(function () {
        const imageext = ['png','jpg','jpeg','gif','bmp']
        const priceRegEx = /^\d+(,\d{3})*(\.\d{1,2})?$/gm

        if($('#name').val().length === 0) {
            alert('Please input a name')
            return false
        }

        if($('#desc').val().length === 0) {
            alert('Please input a description')
            return false
        }
        let priceVal = $('#price').val()
        priceVal = priceVal.trim()
        if(!(priceRegEx.test(priceVal))) {
            alert('Please submit a correct price')
            return false
        }
        let imagetype = $('#Image')[0].files[0].type
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
    })
})
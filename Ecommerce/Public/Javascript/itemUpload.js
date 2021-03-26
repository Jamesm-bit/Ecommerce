const uploadImage = async () => {
    const formData = new FormData()
    let item = {
        name: '$("#Name").val()',
        description: '$("#Description").val()',
        price: '$("#Price").val()',
    }
    formData.append('file', $('#Image')[0].files[0])
    fetch('/', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'test',
            'Accept': 'application/json'
        }
    })
    .then(response => console.log(response.text()))
}

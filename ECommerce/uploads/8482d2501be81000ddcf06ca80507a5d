let i = 0
let v = 0
let divlist = null
let fNameTag = null
let lNameTag = null
let listele = null
let editbutton = null
let delbutton = null
let checkBox = null
let boxes = null
let divs = null
let boxes2 = document.getElementsByClassName("chk")
let checkBoxes = document.getElementsByClassName("chk");



const sendData = (i, f, l) => {
    const XHR = new XMLHttpRequest();
    XHR.addEventListener("load", (event) => {
    })
    XHR.addEventListener('error', (event) => {
        console.log({event})
    })

    let user = {
        id: i,
        fName: f,
        lName: l
    }

    let body = JSON.stringify(user)
    XHR.open('POST', "/", true)
    XHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    XHR.send(body)
}

const deleteData = (i) => {
    const DXHR = new XMLHttpRequest();
    DXHR.addEventListener("load", (event) => {
    })
    DXHR.addEventListener('error', (event) => {
        console.log({event})
    })

    let user = {
        id: i,
    }

    let body = JSON.stringify(user)
    DXHR.open('POST', "/delete", true)
    DXHR.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    DXHR.send(body)
}

const unCheck = (i) => {
    if ($("#cB" + i) && $("#checkbx").is(':checked')) {
        $("#checkbx").prop('checked', false);
    }
    showCurrSelec();
}

const checkAll = () => {
    checkBoxes = document.getElementsByClassName("chk");
    for (let item in checkBoxes) {
        checkBoxes[item].checked = $('#checkbx').is(':checked') ? true : false;
    }
    showCurrSelec()
}

const showCurrSelec = () => {
    let yt = 0;
    for (let item in checkBoxes) {
        if (checkBoxes[item].checked == true && typeof (checkBoxes[item]) == 'object') {
            yt++;
        }
    }
    $("#totalselec").html(`Total ${yt} Selected Rows`);
}

const addElement = (num, f, l) => {
    let m;
    m = num
    if (!num) {
        i++
        m = i
    }

    const fNames = $(".innamef");
    const lNames = $(".innamel");
    const ids = $(".inid")



    if (fnames.length > 0) {
        for (let z = 0; z < ids.length; z++) {
            if (m == ids[z].innerHTML) {
                m++
            }
            for (let y = 0; y < fnames.length; y++) {
                if (l == lnames[y].innerHTML && f == fnames[z].innerHTML) {
                    return
                }
            }

        }
    }

    divlist2 = document.createElement("div")
    divlist2.setAttribute("id", "div21")
    divlist2.setAttribute("class", "divhold")

    divlist = document.createElement("div")
    divlist.setAttribute("id", "div" + m)
    divlist.setAttribute("class", "div")

    checkBox = document.createElement('input')
    checkBox.setAttribute("class", "chk")
    checkBox.setAttribute("id", "cB" + m)
    checkBox.type = "checkbox"

    idTag = document.createElement("p")
    idTag.setAttribute("id", "id" + m)
    idTag.setAttribute("class", "inid")
    idTag.innerHTML = m

    fNameTag = document.createElement("p")
    fNameTag.setAttribute("id", "fName" + m)
    fNameTag.setAttribute("class", "innamef")
    fNameTag.innerHTML = f

    lNameTag = document.createElement("p")
    lNameTag.setAttribute("id", "lName" + m)
    lNameTag.setAttribute("class", "innamel")
    lNameTag.innerHTML = l

    listele = document.getElementById("list")

    editbutton = document.createElement("button")
    editbutton.setAttribute("class", "fNameButton")
    editbutton.textContent = "Edit";
    editbutton.id = ("edit" + m)

    delbutton = document.createElement("button")
    delbutton.setAttribute("class", "lNameButton")
    delbutton.textContent = "Delete";
    delbutton.id = ("del" + m)

    document.getElementById("fname").value = ""
    document.getElementById("lname").value = ""

    divlist2.appendChild(checkBox)
    divlist.appendChild(fNameTag)
    divlist.appendChild(lNameTag)
    divlist.appendChild(editbutton)
    divlist.appendChild(delbutton)
    divlist.appendChild(idTag)
    divlist2.appendChild(divlist)
    listele.appendChild(divlist2)

    document.getElementById("cB" + m).addEventListener("click", unCheck.bind(null, m))
    document.getElementById("edit" + m).addEventListener("click", editpush.bind(null, m))
    document.getElementById("del" + m).addEventListener("click", del.bind(null, m))
    sendData(m, f, l)
    return (m)

}
const getData = () => {
    let nameData;
    $.get("/names", (data) => {
        nameData = data;
        for (item in nameData) {
            addElement(nameData[item].id, nameData[item].fName, nameData[item].lName)
        }
    })
}

getData()

const editFinish = () => {
    $("#fName" + v).html($("#fname").val());
    $("#lName" + v).html($("#lname").val());
    $("#edit" + v).css("visibility", "visible");
    $("#del" + v).css("visibility", "visible");
    $("#confirmEdit").css("visibility", "hidden");
    $("#Add").css("visibility", "visible");
    $("#fname").val('');
    $("#lname").val('');
    $("#checkdel").css("visibility", "visible");
    $("#checkbx").css("visibility", "visible");
    checkBoxes = $(".chk");
    for (let item in checkBoxes) {
        if (item < 10) {
            checkBoxes[item].style.visibility = "visible";
        }
    }
    sendData(v,fNameChange,lNameChange)
}

const editpush = (j) => {
    v = j;
    $("#fname").val($("#fName" + v).html());
    $("#lname").val($("#lName" + v).html());
    let fButtons = $(".fNameButton");
    let lButtons = $(".lNameButton");
    for (item in fButtons) {
        /* turn into one and condition */
        if (item != "length" && item != "item" && item != "namedItem" && item < 10) {
            fButtons[item].style.visibility = "visible";
            lButtons[item].style.visibility = "visible";
        }
    }
    $("#checkdel").css('visibility', 'hidden');
    $("#checkbx").css('visibility', 'hidden');
    $("#edit" + v).css('visibility', 'hidden');
    $("#del" + v).css('visibility', 'hidden');
    $("#confirmEdit").css("visibility", "visible");
    $("#Add").css('visibility', 'hidden');
    $("#cB" + v).css('visibility', 'hidden');
}

const del = (z) => {
    /*
    document.getElementById("fName"+i).remove()
    document.getElementById("lname"+i).remove()
    document.getElementById("edit"+i).remove()
    document.getElementById("del"+i).remove()
    */
    
    document.getElementById("div" + z).remove()
    document.getElementById("cB" + z).remove()
    deleteData(z)
}

const add = () => {
    fname = document.getElementById("fname").value
    lname = document.getElementById("lname").value
    let idnum = addElement(null, fname, lname)
    
}

const render = () => {
    for (let u = 0; u < 10; u++) {
        addElement(u, "test", "test" + u)
    }

    if (document.getElementById("checkbx").checked == true) {
        checkAll()
    }
}
const removechecked = () => {
    let ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    document.getElementById("checkbx").checked = false;

    for (item in ids) {
        
        if(!(item == 'length' || item =='item'|| item == 'namedItem')){
            if(checkBoxes[item].checked) {
                del(ids[item].innerHTML) 
            }
        }
        
    }
    ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    for (item in ids) {
        
        if(!(item == 'length' || item =='item'|| item == 'namedItem')){
            if(checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }
        
    }
    ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    for (item in ids) {
        
        if(!(item == 'length' || item =='item'|| item == 'namedItem')){
            if(checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }
        
    }
    ids = document.getElementsByClassName("inid");
    checkBoxes = document.getElementsByClassName("chk");
    for (item in ids) {
        
        if(!(item == 'length' || item =='item'|| item == 'namedItem')){
            if(checkBoxes[item].checked) {
                del(ids[item].innerHTML)
            }
        }
        
    }
    checkAll()
}

document.getElementById("checkbx").addEventListener("click", checkAll)
document.getElementById("checkdel").addEventListener("click", removechecked)
document.getElementById("render").addEventListener("click", render)
document.getElementById("confirmEdit").addEventListener("click", editFinish.bind(null, v))
document.getElementById("Add").addEventListener("click", add)
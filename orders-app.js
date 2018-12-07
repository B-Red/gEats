var orderItem = ''
var orderPrice
var order = document.querySelectorAll('#order')
var selItem = []
var totalDis = document.querySelector('#totDis')
var submit = document.getElementById('submit')
var formSubmit = document.querySelector('#deliverBtn')



fetch('https://galvanize-eats-api.herokuapp.com/menu').then(function (response) {
    return response.json();
}).then(function (data) {
    var menuLi = document.getElementById('menuList')
    for (var i = 0; i < data.menu.length; i++) {
        var choice = document.createElement('button')
        choice.innerText = data.menu[i].name + ' $' + data.menu[i].price
        choice.setAttribute('name', data.menu[i].name)
        choice.setAttribute('value', data.menu[i].price)
        choice.classList.add('list-group-item')
        choice.addEventListener('click', function (event) {
            orderItem = event.target.name
            orderPrice = event.target.value
        })
        menuList.appendChild(choice)
    }
})


submit.addEventListener('click', function () {
    var quantity = document.getElementById('qtyInput')
    selItem.push({
        qty: quantity.value,
        price: orderPrice,
        name: orderItem
    })
    ordAdd(selItem)
})

function ordAdd(selItem) {
    var order = document.querySelector('#ordList')
    var total = 0
    for (var i = 0; i < selItem.length; i++) {
        var item = document.createElement('p')
        item.innerText = selItem[i].name + ' $' + selItem[i].price + ' Qty:' + selItem[i].qty
        total += (selItem[i].price * selItem[i].qty)
        console.log(total)
        totalDis.textContent = '$' + total
    }
    order.appendChild(item)
}

formSubmit.addEventListener('click', postOrder)

function postOrder() {
    console.log('formSubmit')
    fetch('https://galvanize-eats-api.herokuapp.com/orders',{
        method: 'POST',
        body: {selItem : selItem}
    }).then(function (response) {
        console.log(response)
    })
}
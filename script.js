const nav = document.querySelector('.nav')
const root = document.querySelector('#root')
let currentPageLink = document.querySelector('a[href="home"]')

const cart = []

renderHome()

function getProducts()
{
    return [
        {id: 1, title: 'Ericsson T20', price: 70, url: '../img/ericsson-t20s-1000x1000.jpg'},
        {id: 2, title: 'Ericsson T65', price: 300, url: '../img/ericsson-t65-1000x1000.jpg'},
        {id: 3, title: 'Nokia 5210', price: 100, url: '../img/nokia-5210-1000x1000.jpg'},
        {id: 4, title: 'Nokia 6300', price: 110, url: '../img/nokia-6300-1000x1000.jpg'},
        {id: 5, title: 'Nokia 6310i', price: 110, url: '../img/nokia-6310i-1000x1000.jpg'},
        {id: 6, title: 'Nokia E5', price: 100, url: '../img/nokia-e5-1000x1000.jpg'},
        {id: 7, title: 'Nokia E63', price: 300, url: '../img/nokia-e63-1000x1000.jpg'},
        {id: 8, title: 'Siemens A50', price: 80, url: '../img/siemens-a50-1000x1000.jpg'}
    ]
}

function renderHome()
{
    root.className = 'products'
    root.innerHTML = getProducts().map(card).join('\n')
    root.onclick = addToCartClickHandler
}

function card(product)
{
    return `<div class="card">
            <h2>${product.title}</h2>
            <img src="${product.url}" alt="${product.title}">
            <h3>$${product.price}</h3>
            <button data-id="${product.id}">Add to cart</button>
        </div>`
}

function addToCartClickHandler(e)
{
    e.preventDefault()
    if(e.target.tagName === 'BUTTON')
    {
        let item = cart.find(function (product)
        {
            return product.id === parseInt(e.target.dataset.id)
        })
        if(item)
            item.count++
        else
        {
            let product = getProducts().find(function (product)
            {
                return product.id === parseInt(e.target.dataset.id)
            })
            cart.push(
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    count: 1
                }
            )
        }
    }
}

function renderCart()
{
    root.className = 'cart'
    root.innerHTML = `<table>
            <thead>
                <th class="title">title</th>
                <th class="price">price</th>
                <th class="count">count</th>
                <th class="total">total</th>
            </thead>
            <tbody>
                ${cart.map(cartRow).join('\n')}
            </tbody>
        </table>
        <div class="totalPrice">
        Total: $${cart.reduce(function (acc, p) {return acc + p.count * p.price}, 0)}
        </div>`
}

function cartRow(product)
{
    return `<tr>
<td>${product.title}</td>
<td>${product.price}</td>
<td>${product.count}</td>
<td>${product.price * product.count}</td>
</tr>`
}

function navigation(path)
{
    switch (path)
    {
        case 'home' : renderHome()
            break
        case 'cart' : renderCart()
    }
}

nav.onclick = function (e)
{
    e.preventDefault()
    if(e.target.tagName === 'A')
    {
        if(e.target.getAttribute('href') !== currentPageLink.getAttribute('href'))
        {
            currentPageLink.classList.remove('active')
            currentPageLink = e.target
            currentPageLink.classList.add('active')
            navigation(currentPageLink.getAttribute('href'))
        }
    }
}

let title = document.querySelector(`.title-input`)
let price = document.querySelector(`.price-input`)
let taxes = document.querySelector(`.taxes-input`)
let ads = document.querySelector(`.ads-input`)
let discount = document.querySelector(`.discount-input`)
let count = document.querySelector(`.count-input`)
let category = document.querySelector(`.category-input`)
let totalBox = document.querySelector(`.total`)
let total = document.querySelector(`.total-amount`)
let addBtn = document.querySelector(`.add`)
let table = document.querySelector(`tbody`)
let DelAllBtn = document.querySelector(".del-all")
let allProductsString = localStorage.getItem("product")
let searchByTitle = document.querySelector(".srch-title")
let searchByCategory = document.querySelector(".srch-category")
let search = document.querySelector(".search")
let updateCont = document.querySelector(".update-cont")
let deleteCont = document.querySelector(".delete-cont")
let temp


// Get Total
function getTotal ()
{
    if (price.value !== "") 
    {
        result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = +result
        totalBox.style.backgroundColor = "rgb(35, 160, 35)"
    } else {
        total.innerHTML = 0
        totalBox.style.backgroundColor = "red"
    }
}

if (localStorage.getItem("temp") != "[]", localStorage.getItem("product") != "[]") {
    document.querySelector("table").style.display = "table"
    document.querySelector(".search-cont").style.display = "block"
}


// Create Product Data In Array
let productsData
if (localStorage.getItem("product") !== null) { // If Product in LocalStorage Has a Value
    productsData = JSON.parse(localStorage.getItem("product"))
} else { // If it Don't Has a Value
    productsData = []
}



// Create & Count
addBtn.onclick = function () {
    if (count.value != "" && count.value <= 1000 && title.value != "" && price.value != "" && category.value != "") {
        // Create Product Object
        document.createElement = newProduct = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            totalPrice:total.innerHTML,
            count:count.value,
            category:category.value,
        }

        // Add Product To Array
        if (count.value > 0) { // If Count Is Grater Than 0
            i = 0
            while (i < count.value) {
            productsData.push(newProduct)
            i += 1
            } 
        }
    }
    if (productsData.length <= 5000) {
        // Save It In LocalStorage
        localStorage.setItem("product", JSON.stringify(productsData))
    }
}



// Read Data And But It In Web Page
function ShowData() {
    for (i = 0; i < productsData.length; i++) {
        let product = document.createElement(`tr`)
        product.className = `product-${i + 1} product`
        product.innerHTML = `
        <td>${i + 1}</td>
        <td>${productsData[i].title}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].taxes}</td>
        <td>${productsData[i].ads}</td>
        <td>${productsData[i].discount}</td>
        <td>${productsData[i].totalPrice}</td>
        <td>${productsData[i].category}</td>
        <td class="hide-btn">
            <button class="product-${i + 1} update" onclick="updateProduct(${i + 1})">Update</button>
        </td>
        <td class="hide-btn">
            <button class="product-${i + 1} delete" onclick="deleteProduct(${i + 1})">Delete</button>
        </td>
        `
        table.appendChild(product)
    }
}
ShowData()



// Delete Targeted Product
function deleteProduct(i) {
    // Delete The Selected Product
    productsData.splice(i - 1,1)

    // Delete Old Data
    table.innerHTML = ""
    
    // Save New Data In Local Storage
    localStorage.product = JSON.stringify(productsData)

    // Update Data Again
    ShowData()
    
    // Function Of Opacity Of Delete All Btn
    if (productsData.length === 0) {
        DelAllBtn.style.display = `none`
    }
}


// Function Of Opacity Of Delete All Btn
if (productsData.length === 0) {
    DelAllBtn.style.display = `none`
    document.querySelector("table").style.display = "none"
    document.querySelector(".search-cont").style.display = "none"
} else {
    DelAllBtn.style.display = "block"
    DelAllBtn.innerHTML = `Delete All (${productsData.length})`
    DelAllBtn.onclick = function() {
        DelAllBtn.style.display = `none`
        document.querySelector(".search-cont").style.display = "none"
        document.querySelector("table").style.display = "none"
        table.innerHTML = ""
        productsData = []
        localStorage.setItem("product", JSON.stringify(productsData))
        ShowData()
    }
}



// Update Products
function updateProduct(i) {
    // Go To Top
    scroll(top)

    // Change Add Btn To Update
    addBtn.innerHTML = "Update"

    // Fill The Input Fields
    title.value = productsData[i - 1].title
    price.value = productsData[i - 1].price
    taxes.value = productsData[i - 1].taxes
    ads.value = productsData[i - 1].ads
    discount.value = productsData[i - 1].discount
    category.value = productsData[i - 1].category
    count.value = productsData[i - 1].count

    // Get Total
    getTotal()
    
    // Disable Count Input Field
    count.style.display = "none"

    // If there's An Added Product
    if (addBtn.innerHTML === "Update") {
        addBtn.onclick = function() {

            
            if (productsData[i - 1].count === 1) { // If there's One Product
                productsData[i - 1].title = title.value
                productsData[i - 1].price = price.value
                productsData[i - 1].taxes = taxes.value
                productsData[i - 1].ads = ads.value
                productsData[i - 1].discount = discount.value
                productsData[i - 1].totalPrice = total.innerHTML
                productsData[i - 1].category = category.value
                productsData[i - 1].count = count.value
                localStorage.setItem("product", JSON.stringify(productsData))
                table.innerHTML = ""
            } else { // If There's More Than One
                for (let j = 0;j <= productsData[i - 1].count; j++) {
                    allProductsString = allProductsString.replace(JSON.stringify(productsData[i - 1]),`{"title":"${title.value}","price":"${price.value}","taxes":"${taxes.value}","ads":"${ads.value}","discount":"${discount.value}","totalPrice":"${total.innerHTML}","count":"${count.value}","category":"${category.value}"}`)
                }
                localStorage.setItem("product", allProductsString)
                productsData = JSON.parse(localStorage.getItem("product"))
            }

            // Save In LocalStorage
            localStorage.setItem("product", JSON.stringify(productsData))
            
            // Delete Old Showed Data
            table.innerHTML = ""

            // Show New Data
            ShowData()
        }
    }
}



// Search Title
searchByTitle.onclick = function searchTitle() {
    if (search.value !== "" && searchByTitle.innerHTML === "Search By Title") {
        temp = localStorage.getItem("product")
        let searchArray = []
        for (i = 0; i < productsData.length; i++) {
            if (productsData[i].title.toUpperCase().includes(search.value.toUpperCase()) === true) {
                searchArray.push(productsData[i])
                localStorage.setItem("product", JSON.stringify(searchArray))
            }
        }
        if (searchArray.length > 0) {
            localStorage.setItem("temp", temp)
        }
    }
}

if (localStorage.getItem("temp") != `[]` && localStorage.getItem("temp") != null) {
    searchByTitle.innerHTML = "<-- Back"
    search.style.display = "none"
    updateCont.style.display = "none"
    deleteCont.style.display = "none"
    DelAllBtn.style.display = "none"
    addBtn.style.display = "none"
    searchByCategory.style.display = "none"
    document.querySelector(".product-info-input").style.display = "none"
    for (i = 0; i < productsData.length*2; i++) {
        document.querySelectorAll(".hide-btn")[i].style.display = "none"
    }
    
    if (searchByTitle.innerHTML != "Search By Title") {
        searchByTitle.onclick = function() {
            searchByTitle.innerHTML = "Search By Title"
            search.style.display = "block"
            updateCont.style.display = "block"
            deleteCont.style.display = "block"
            searchByCategory.style.display = "block"
            addBtn.style.display = "block"
            document.querySelector(".product-info-input").style.display = "block"
            for (i = 0; i < productsData.length*2; i++) {
                document.querySelectorAll(".hide-btn")[i].style.display = "block"
            }
            localStorage.setItem("product", localStorage.getItem("temp"))
            localStorage.setItem("temp", "[]")
            table.innerHTML = ""
            ShowData()
        }
    }
}



// Search Category
searchByCategory.onclick = function searchCategory() {
    if (search.value !== "" && searchByCategory.innerHTML === "Search By Category") {
        temp = localStorage.getItem("product")
        let searchArray = []
        for (i = 0; i < productsData.length; i++) {
            if (productsData[i].category.toUpperCase().includes(search.value.toUpperCase()) === true) {
                searchArray.push(productsData[i])
                localStorage.setItem("product", JSON.stringify(searchArray))
            }
        }
        if (searchArray.length > 0) {
            localStorage.setItem("temp", temp)
        }
    }
}

if (localStorage.getItem("temp") != `[]` && localStorage.getItem("temp") != null) {
    searchByCategory.innerHTML = "<-- Back"
    searchByCategory.style.display = "block"
    search.style.display = "none"
    updateCont.style.display = "none"
    deleteCont.style.display = "none"
    DelAllBtn.style.display = "none"
    addBtn.style.display = "none"
    searchByTitle.style.display = "none"
    document.querySelector(".product-info-input").style.display = "none"
    for (i = 0; i < productsData.length*2; i++) {
        document.querySelectorAll(".hide-btn")[i].style.display = "none"
    }
    
    if (searchByCategory.innerHTML != "Search By Category") {
        searchByCategory.onclick = function() {
            searchByCategory.innerHTML = "Search By Category"
            search.style.display = "block"
            updateCont.style.display = "block"
            deleteCont.style.display = "block"
            searchByTitle.style.display = "block"
            addBtn.style.display = "block"
            document.querySelector(".product-info-input").style.display = "block"
            for (i = 0; i < productsData.length*2; i++) {
                document.querySelectorAll(".hide-btn")[i].style.display = "block"
            }
            localStorage.setItem("product", localStorage.getItem("temp"))
            localStorage.setItem("temp", "[]")
            table.innerHTML = ""
            ShowData()
        }
    }
}
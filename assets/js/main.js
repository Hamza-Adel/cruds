var productName = document.getElementById("productName");
var category = document.getElementById("productCategory");
var price = document.getElementById("productPrice");
var dataBody = document.getElementById("tableData");
var submitBtn = document.getElementById("submitBtn");
var searchInput = document.getElementById("example");
var totalRecords = document.getElementById("totalRecords");

var productlist = [];
var selectedIndex = null; 

searchInput.addEventListener("input", function () {
    var searchTerm = searchInput.value.trim().toLowerCase();
    displayProductFromList(searchTerm);
});

function addProduct() {
    var productItem = {
        productName: productName.value,
        category: category.value,
        price: Number(price.value),
    };

    if (selectedIndex === null) {
        productlist.push(productItem);
    } else {
        productlist[selectedIndex] = productItem;
        selectedIndex = null;
        submitBtn.textContent = "Submit";
    }

    displayProductFromList();
    clearFormData();
}

function displayProductFromList(searchValue) {
    var cartona = "";
    var filteredProducts;

    if (searchValue) {
        filteredProducts = productlist.filter(product =>
            product.productName.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue) ||
            product.price.toString().includes(searchValue)
        );
    } else {
        filteredProducts = productlist;
    }

    for (let index = 0; index < filteredProducts.length; index++) {
        cartona += `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${filteredProducts[index].productName}</td>
            <td>${filteredProducts[index].category}</td>
            <td>${filteredProducts[index].price}</td>
            <td>
                <button onclick="deleteProduct(${index})" class="btn btn-danger">Delete</button>
                <button onclick="updateFormData(${index})" class="btn btn-warning">Edit</button>
            </td>
        </tr>
        `;
    }

    dataBody.innerHTML = cartona;
    updateTotalRecords();
}

function clearFormData() {
    productName.value = null;
    category.value = null;
    price.value = null;
    searchInput.value = "";
}

function deleteProduct(index) {
    if (index >= 0 && index < productlist.length) {
        productlist.splice(index, 1);
        displayProductFromList();
    }
}

function updateFormData(index) {
    if (index >= 0 && index < productlist.length) {
        var selectedProduct = productlist[index];

        productName.value = selectedProduct.productName;
        category.value = selectedProduct.category;
        price.value = selectedProduct.price;

        selectedIndex = index;


        submitBtn.textContent = "Update";
    }
}

function updateTotalRecords() {
    totalRecords.textContent = productlist.length;
}


function searchProducts() {
    var searchValue = document.getElementById("searchInput").value;
    displayProductFromList(searchValue);
}



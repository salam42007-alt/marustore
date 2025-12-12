const API_TOKEN = "patJpjR5vKxyqH4l9.253ce37e20e0a23b0bbb1ec824849b98ec3dab98941bbaac9c49c0d756e71085"; 
const BASE_ID = "appY5xogADcLeRRAz"; 
const TABLE_ID = "Products";  // اسم التابل

async function loadProducts() {
    try {
        const response = await fetch(
            `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true`,
            {
                headers: {
                    Authorization: `Token ${API_TOKEN}`
                }
            }
        );

        const data = await response.json();

        const container = document.getElementById("products-container");
        container.innerHTML = "";

        data.results.forEach(item => {
            const div = document.createElement("div");
            div.className = "product";
            div.innerHTML = `
                <h2>${item.Name || "بدون اسم"}</h2>
                <p><strong>السعر:</strong> ${item.Price || "غير محدد"}</p>
                <p><strong>الوصف:</strong> ${item.Description || "لا يوجد"}</p>
            `;
            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error:", error);
    }
}

loadProducts();

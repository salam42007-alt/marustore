const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const searchInput = document.getElementById("search-input"); 
let currentCategory = "home";

// Airtable API setup
const AIRTABLE_BASE_ID = "Products"; // ضع Base ID هنا
const AIRTABLE_API_KEY = "patJpjR5vKxyqH4l9.253ce37e20e0a23b0bbb1ec824849b98ec3dab98941bbaac9c49c0d756e71085"; // ضع التوكن هنا
const AIRTABLE_TABLE = "my_products";

// -----------------------------------
// دوال التعامل مع Airtable
// -----------------------------------
async function fetchProducts(category) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}?view=Grid%20view`;
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
    });
    const data = await res.json();
    if(category) return data.records.filter(r=>r.fields.category===category);
    return data.records;
}

// إنشاء بطاقة منتج
function createProductCard(item) {
    const card = document.createElement("div");
    card.className = `product-card ${item.fields.category}`;
    
    const img = document.createElement("img");
    img.src = item.fields.main_image;
    img.alt = item.fields.title;
    
    const info = document.createElement("div");
    info.className = "product-info";
    info.innerHTML = `<h3>${item.fields.title}</h3><p>${item.fields.price}</p>`;
    
    card.appendChild(img);
    card.appendChild(info);
    
    card.onclick = () => showProductDetailsPage(item);
    
    return card;
}

// عرض تفاصيل المنتج
function showProductDetailsPage(item){
    searchInput.style.visibility='hidden';
    content.innerHTML='';
    
    const container = document.createElement("div");
    container.className='product-details-page';
    
    const backButton = document.createElement("button");
    backButton.className='back-button';
    backButton.textContent='← العودة إلى القائمة';
    backButton.onclick=()=>showCategory(item.fields.category);
    
    const largeImg = document.createElement("img");
    largeImg.src=item.fields.main_image;
    largeImg.alt=item.fields.title;
    largeImg.style.maxWidth='100%';
    
    const innerImages = item.fields.inner_images || [];
    let innerHTML = `<h2>${item.fields.title}</h2><p>${item.fields.description}</p><p>${item.fields.price}</p>`;
    innerImages.forEach(url=>{innerHTML+=`<img src="${url}" style="width:100%; margin-top:10px;">`;});
    
    container.appendChild(backButton);
    container.innerHTML+=innerHTML;
    content.appendChild(container);
}

// عرض فئة معينة
async function showCategory(cat){
    currentCategory = cat;
    searchInput.value='';
    searchInput.style.visibility=(cat==='home')?'hidden':'visible';
    
    if(cat==='home'){
        content.innerHTML=`<div style="text-align:center; padding:50px; background-color:rgba(31,41,55,0.8); border-radius:15px;">
        <h2>التواصل والدعم الفني</h2>
        <p>لتواصل معنا افتح تكت على ديسكورد</p>
        <a href="https://discord.com/channels/1441100233806319668/1441389509114724452" target="_blank">فتح التذكرة</a>
        </div>`;
        return;
    }
    
    if(cat==='add_product'){
        document.getElementById('add-product-modal').style.display='flex';
        return;
    }
    
    const products = await fetchProducts(cat);
    content.innerHTML='';
    products.forEach(p=>content.appendChild(createProductCard(p)));
}

// البحث
searchInput.addEventListener("input", async ()=>{
    const allProducts = await fetchProducts();
    const term = searchInput.value.toLowerCase();
    const filtered = allProducts.filter(p=>p.fields.title.toLowerCase().includes(term)||p.fields.description.toLowerCase().includes(term));
    content.innerHTML='';
    filtered.forEach(p=>content.appendChild(createProductCard(p)));
});

// التبويبات
tabs.forEach(tab=>tab.addEventListener("click",()=>{tabs.forEach(t=>t.classList.remove("tab-active")); tab.classList.add("tab-active"); showCategory(tab.dataset.target);}));

// نافذة إضافة المنتج
const addModal=document.getElementById('add-product-modal');
document.getElementById('cancel-add').onclick=()=>addModal.style.display='none';
document.getElementById('add-product-form').onsubmit=async(e)=>{
    e.preventDefault();
    const title=document.getElementById('product-title').value;
    const description=document.getElementById('product-description').value;
    const price=document.getElementById('product-price').value;
    const manager=document.getElementById('product-manager').value;
    const category=document.getElementById('product-category').value;
    const main_image=document.getElementById('main-image').value;
    const inner_images=document.getElementById('inner-images').value.split(',').map(s=>s.trim());
    
    await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE}`,{
        method:'POST',
        headers:{Authorization:`Bearer ${AIRTABLE_API_KEY}`, 'Content-Type':'application/json'},
        body:JSON.stringify({fields:{title,description,price,manager_name:manager,category,main_image,inner_images}})
    });
    
    addModal.style.display='none';
    showCategory(category);
};

// الإعداد الأولي
showCategory('home');
document.querySelector('button[data-target="home"]').classList.add("tab-active");

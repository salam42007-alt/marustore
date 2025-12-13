const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const searchInput = document.getElementById("search-input"); 
let currentCategory = "home"; 

// البيانات
const data = {
  houses: [
    {name:"house1", ext:"webp", desc:"بيت عملي وكبير، مناسب للعمل الجماعي وفِرق الاستكشاف", price:"10 ألف كريديت"},
    {name:"house2", ext:"webp", desc:"منزل ياباني واسع وأنيق", price:"30 ألف كريديت"},
    {name:"house3", ext:"webp", desc:"منزل ريفي صغير وهادئ", price:"20 ألف كريديت"},
    {name:"house4", ext:"webp", desc:"منزل ريفي متوسط، رائع وسهل إضافة الغرف", price:"مجاني للجدد و10 آلاف كريديت"},
    {name:"house5", ext:"webp", desc:"منزل قروي عملاق وفسيح", price:"6 آلاف كريديت"},
    {name:"house6", ext:"webp", desc:"منزل ريفي كبير، مناسب لثلاثة أشخاص", price:"11 ألف كريديت"}
  ],
  tools: [
    {name:"tool1", ext:"webp", desc:"بيكاكس قوي جداً، قادر على كسر مساحة 3×3 بسهولة", price:"4 آلاف كريديت"},
    {name:"tool2", ext:"jpg", desc:"فأس قوي جداً لأعمال التعدين والتحطيم", price:"3 آلاف كريديت"},
    {name:"tool3", ext:"jpg", desc:"سيف قوي يضرب البرق، مع تطويرات مميزة", price:"3 آلاف كريديت"}
  ],
  ranks: [
    {name:"rank1", ext:"jpg", desc:"Elite: +500 بلوكة كليم، سيف سوبر، 300 فلوس", price:"20 ألف كريديت"},
    {name:"rank2", ext:"jpg", desc:"VIP: +1000 بلوكة كليم، سيف سوبر، 3000 فلوس", price:"30 ألف كريديت"},
    {name:"rank3", ext:"jpg", desc:"Golding: +2000 بلوكة كليم، سيف سوبر، 5000 فلوس", price:"40 ألف كريديت"}
  ],
  claims: [
    {name:"cliam", ext:"jpg", desc:"100 بلوكة", price:"1 ألف كريديت"},
    {name:"cliam", ext:"jpg", desc:"300 بلوكة", price:"3 آلاف كريديت"},
    {name:"cliam", ext:"jpg", desc:"400 بلوكة", price:"4 آلاف كريديت"},
    {name:"cliam", ext:"jpg", desc:"1000 بلوكة", price:"10 آلاف كريديت"}
  ],
  chests: [
    {name:"chastes", ext:"jpg", desc:"صندوق ذو مزايا عشوائية", price:"50 ألف كريديت"} 
  ]
};

// دالة عرض صفحة تفاصيل المنتج
function showProductDetailsPage(item, category) {
    searchInput.style.visibility = 'hidden'; 
    content.innerHTML = ""; 

    const detailsContainer = document.createElement("div");
    detailsContainer.className = "product-details-page";
    detailsContainer.style.textAlign = 'center';

    const backButton = document.createElement('button');
    backButton.textContent = '← العودة إلى القائمة';
    backButton.className = 'back-button';
    backButton.onclick = () => showCategory(category);
    
    const largeImg = document.createElement("img");
    largeImg.src = `images/${item.name}.${item.ext}`;
    largeImg.alt = item.name;
    largeImg.style.maxWidth = '100%';
    largeImg.style.maxHeight = '400px';
    largeImg.style.borderRadius = '15px';
    largeImg.style.margin = '20px auto';
    largeImg.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';

    const displayName = (category === 'chests') ? item.desc : (item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2'));
    
    let detailsDesc = item.desc;
    if (category === 'chests') {
        detailsDesc = "صندوق يحتوي على مزايا نادرة أو أدوات قوية عشوائية بقيمة تفوق سعر الشراء!";
    }

    const infoHtml = 
        `<h2 style="color: #FFD700;">${displayName}</h2>
        <p style="font-size: 1.2em; max-width: 600px; margin: 0 auto 20px auto;">${detailsDesc}</p>
        <p style="font-size: 1.5em; font-weight: bold; color: #7CFC00;">السعر: ${item.price}</p>
        <button class="buy-button">طلب الشراء (تواصل معنا)</button>`;

    detailsContainer.appendChild(backButton);
    detailsContainer.appendChild(largeImg);
    detailsContainer.innerHTML += infoHtml; 

    content.appendChild(detailsContainer);
}

// دالة إنشاء بطاقة المنتج
function createProductCard(item, category) {
    const card = document.createElement("div");
    card.className = `product-card ${category}`; 

    const img = document.createElement("img");
    img.src = `images/${item.name}.${item.ext}`;
    img.alt = item.name;
    img.loading = "lazy"; 

    const info = document.createElement("div");
    info.className = "product-info";
    
    const displayName = (category === 'chests') ? item.desc : (item.name.charAt(0).toUpperCase() + item.name.slice(1).replace(/([a-zA-Z]+)(\d+)/, '$1 $2'));
    
    info.innerHTML = `<h3>${displayName}</h3><p>${item.price}</p>`;
    
    card.appendChild(img);
    card.appendChild(info);

    card.onclick = () => {
        showProductDetailsPage(item, category);
    };
    
    return card;
}

// عرض الفئة
function renderProducts(products, cat) {
    content.innerHTML = "";
    if (products.length === 0) {
        content.innerHTML = `<p style="text-align: center; margin-top: 50px;">عذراً، لم يتم العثور على منتجات مطابقة في فئة ${cat} هذه.</p>`;
        return;
    }
    products.forEach(item => {
        content.appendChild(createProductCard(item, cat));
    });
}

function showCategory(cat) {
    currentCategory = cat;
    searchInput.value = ''; 

    searchInput.style.visibility = (cat === 'home') ? 'hidden' : 'visible'; 

    if (cat === 'home') {
        content.innerHTML = 
            `<div style="text-align: center; padding: 50px 20px; max-width: 600px; margin: 50px auto; background-color: rgba(31, 41, 55, 0.8); border-radius: 15px; box-shadow: 0 0 20px rgba(0,0,0,0.5);">
                <h2 style="color: #FFD700; margin-bottom: 30px;">التواصل والدعم الفني</h2>
                <p style="font-size: 1.5em; margin-bottom: 30px; line-height: 1.6;">
                    للتواصل معنا تعال هنا و اتفح تكت
                </p>
                <a href="https://discord.com/channels/1426180827011743757/1449037953341984768" 
                   target="_blank" 
                   style="display: inline-block; padding: 15px 30px; background-color: #5865F2; color: white; border-radius: 8px; text-decoration: none; font-size: 1.2em; font-weight: bold; transition: background-color 0.2s;">
                   انقر هنا لفتح تذكرة على ديسكورد
                </a>
                <p style="margin-top: 15px; font-size: 0.9em; color: #ccc;">(يفتح الرابط في نافذة جديدة)</p>
            </div>`;
        return;
    }
    
    renderProducts(data[cat], cat);
}

// البحث
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (currentCategory === 'home') return; 
    
    const filteredProducts = data[currentCategory].filter(item => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm);
        const descMatch = item.desc.toLowerCase().includes(searchTerm);
        return nameMatch || descMatch;
    });
    
    renderProducts(filteredProducts, currentCategory);
}

// مستمعات الأحداث
tabs.forEach(tab=>{
  tab.addEventListener("click", ()=>{
    tabs.forEach(t=>t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    showCategory(tab.dataset.target);
  });
});

searchInput.addEventListener("input", filterProducts);

showCategory('home');
document.querySelector('button[data-target="home"]').classList.add("tab-active");

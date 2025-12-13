const tabs = document.querySelectorAll(".tab");
const content = document.getElementById("content");
const searchInput = document.getElementById("search-input");
let currentCategory = "home";

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

function createProductCard(item, category) {
  const card = document.createElement("div");
  card.className = `product-card ${category}`;

  card.innerHTML = `
    <img src="images/${item.name}.${item.ext}">
    <div class="product-info">
      <h3>${item.desc}</h3>
      <p>${item.price}</p>
    </div>
  `;

  return card;
}

function renderProducts(products, cat) {
  content.innerHTML = "";
  products.forEach(item => {
    content.appendChild(createProductCard(item, cat));
  });
}

function showCategory(cat) {
  currentCategory = cat;
  searchInput.value = "";
  searchInput.style.visibility = (cat === "home") ? "hidden" : "visible";

  if (cat === "home") {
    content.innerHTML = `
      <div class="home-box">
        <h2>التواصل والدعم الفني</h2>
        <p>للتواصل معنا افتح تذكرة على ديسكورد</p>
        <a href="https://discord.com/channels/1426180827011743757/1449037953341984768" target="_blank">
          فتح تذكرة
        </a>
      </div>
    `;
    return;
  }

  renderProducts(data[cat], cat);
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("tab-active"));
    tab.classList.add("tab-active");
    showCategory(tab.dataset.target);
  });
});

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = data[currentCategory].filter(i =>
    i.desc.toLowerCase().includes(term)
  );
  renderProducts(filtered, currentCategory);
});

showCategory("home");
document.querySelector('[data-target="home"]').classList.add("tab-active");

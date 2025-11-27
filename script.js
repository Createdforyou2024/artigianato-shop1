const products = [
  { id:1, name:"Targa in Legno Personalizzata", price:25, images:["https://via.placeholder.com/300x200?text=Legno+1","https://via.placeholder.com/300x200?text=Legno+2","https://via.placeholder.com/300x200?text=Legno+3"], customizable:true },
  { id:2, name:"Decorazione Plexiglass Incisa", price:18, images:["https://via.placeholder.com/300x200?text=Plexi+1","https://via.placeholder.com/300x200?text=Plexi+2"], customizable:true },
  { id:3, name:"Candela Profumata Personalizzata", price:12, images:["https://via.placeholder.com/300x200?text=Candela+1","https://via.placeholder.com/300x200?text=Candela+2","https://via.placeholder.com/300x200?text=Candela+3"], customizable:true }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];

function saveData() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('orders', JSON.stringify(orders));
}

function showSection(sec) {
  document.getElementById('shop').style.display = sec==='shop'?'block':'none';
  document.getElementById('dashboard').style.display = sec==='dashboard'?'block':'none';
  if(sec==='dashboard') renderDashboard();
}

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML='';
  products.forEach(p=>{
    const card = document.createElement('div');
    card.className='card';
    card.innerHTML=`
      <img id="main-${p.id}" src="${p.images[0]}" alt="${p.name}">
      <div class="thumbs">${p.images.map(img=>`<img src="${img}" onclick="setMainImage(${p.id}, '${img}')">`).join('')}</div>
      <h3>${p.name}</h3>
      <p>Prezzo: €${p.price}</p>
      <label>Personalizzazione:<br><input id="custom-${p.id}" placeholder="Testo opzionale"></label><br><br>
      <button class="btn" onclick="addToCart(${p.id})">Aggiungi al carrello</button>
      <button class="btn" onclick="checkout(${p.id})">Acquista ora</button>
    `;
    list.appendChild(card);
  });
}

function setMainImage(id,img){document.getElementById(`main-${id}`).src=img;}
function addToCart(id){const product=products.find(p=>p.id===id);const customValue=document.getElementById(`custom-${id}`).value;cart.push({...product,customization:customValue});saveData();renderCart();}
function checkout(id){const product=products.find(p=>p.id===id);const customValue=document.getElementById(`custom-${id}`).value;const order={...product,customization:customValue,date:new Date().toLocaleString(),status:"In attesa"};orders.push(order);saveData();alert("Ordine inviato! Controlla la Dashboard.");renderDashboard();}
function renderCart(){const list=document.getElementById('cartItems');list.innerHTML='';cart.forEach(item=>{const li=document.createElement('li');li.textContent=`${item.name} - €${item.price} - Personalizzazione: ${item.customization||'Nessuna'}`;list.appendChild(li);});}
function updateStatus(index,newStatus){orders[index].status=newStatus;saveData();renderDashboard();}
function renderDashboard(){const list=document.getElementById('orderList');list.innerHTML=orders.length===0?"<li>Nessun ordine ricevuto.</li>":"";orders.forEach((o,i)=>{const li=document.createElement('li');li.innerHTML=`<strong>${o.name}</strong> - €${o.price}<br>Personalizzazione: ${o.customization||'Nessuna'}<br>Data: ${o.date}<br><b>Stato:</b> ${o.status}<br><button class="status-btn pending" onclick="updateStatus(${i}, 'In attesa')">In attesa</button><button class="status-btn working" onclick="updateStatus(${i}, 'In lavorazione')">In lavorazione</button><button class="status-btn shipped" onclick="updateStatus(${i}, 'Spedito')">Spedito</button>`;list.appendChild(li);});}

renderProducts();renderCart();
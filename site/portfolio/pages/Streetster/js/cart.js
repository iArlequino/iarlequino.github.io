const orderSnackbar=document.getElementById("snackbar-form-submit"),orderList=document.querySelector(".order-info__list");let productArray=[];const generateOrderProduct=(e,t,r,n)=>`\n\t\t<li class="order-info__item">\n\t\t\t<article class="o-item" data-id="${n}">\n\t\t\t\t<img src="${e}" alt="${t}" class="o-item__image">\n\t\t\t\t<h4 class="o-item__title">${t}</h4>\n\t\t\t\t<span class="o-item__price">${normalPrice(r)}</span>\n\t\t\t\t<button class="o-item__delete btn-reset" aria-label="Удалить товар">\n\t\t\t\t\t×\n\t\t\t\t</button>\n\t\t\t</article>\n\t\t</li>\n\t`;function cartOrderItems(){let e=cartProductsList.children,t=fullPrice.textContent,r=e.length;document.querySelector(".order-info__summ").textContent=""+t,0==r?document.querySelector(".order-info__quantity-numb").textContent="нет товаров":1==r?document.querySelector(".order-info__quantity-numb").textContent=r+" товар":r<5&&r>1?document.querySelector(".order-info__quantity-numb").textContent=r+" товара":r>=5&&(document.querySelector(".order-info__quantity-numb").textContent=r+" товаров");for(let t=0;t<e.length;t++){let r=e[t],n=r.querySelector(".c-item__image").getAttribute("src"),o=priceWithoutSpaces(r.querySelector(".c-item__price").textContent),a=r.querySelector(".c-item__title").textContent,c=r.querySelector(".c-item").dataset.id;orderList.insertAdjacentHTML("afterbegin",generateOrderProduct(n,a,o,c));let l={};l.title=a,l.price=o,productArray.push(l)}}cartOrderItems();const updateOrderItems=()=>{let e=cartProductsList.children,t=fullPrice.textContent,r=e.length;document.querySelector(".order-info__summ").textContent=""+t,0==r?document.querySelector(".order-info__quantity-numb").textContent="нет товаров":1==r?document.querySelector(".order-info__quantity-numb").textContent=r+" товар":r<5&&r>1?document.querySelector(".order-info__quantity-numb").textContent=r+" товара":r>=5&&(document.querySelector(".order-info__quantity-numb").textContent=r+" товаров")};function ValidMail(){let e=document.querySelector(".cf-top__input-mail").value,t=/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(e);return t?output="Email введен правильно!":(output="Email введен неправильно!",orderSnackbar.textContent="Неправильно введен Email! Проверьте ваши данные!",orderSnackbar.className="show--red",setTimeout((function(){orderSnackbar.className=orderSnackbar.className.replace("show--red","")}),5500)),t}function ValidPhone(){let e=document.querySelector(".cf-top__input--tel").value,t=/^\d[\d\(\)\ -]{7,14}\d$/.test(e);return t?output="Номер телефона введен правильно!":(output="Номер телефона  введен неправильно!",orderSnackbar.textContent="Неправильно введен номер телефона! Проверьте ваши данные!",orderSnackbar.className="show--red",setTimeout((function(){orderSnackbar.className=orderSnackbar.className.replace("show--red","")}),5500)),t}document.querySelector(".order-info__list").addEventListener("click",e=>{if(e.target.classList.contains("o-item__delete")){let t=e.target.closest(".o-item").dataset.id,r=document.querySelector(`.c-item[data-id='${t}']`).closest("li");deleteProducts(r),e.target.closest(".o-item").remove(),updateOrderItems()}}),[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach((function(e){e.hasOwnProperty("append")||Object.defineProperty(e,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach((function(e){var r=e instanceof Node;t.appendChild(r?e:document.createTextNode(String(e)))})),this.appendChild(t)}})})),[Element.prototype,CharacterData.prototype,DocumentType.prototype].forEach((function(e){e.hasOwnProperty("after")||Object.defineProperty(e,"after",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach((function(e){var r=e instanceof Node;t.appendChild(r?e:document.createTextNode(String(e)))})),this.parentNode.insertBefore(t,this.nextSibling)}})})),document.querySelector(".order__form").addEventListener("submit",e=>{e.preventDefault();let t=e.currentTarget,r=new FormData(t),n=t.querySelector('[name="Имя"]').value,o=t.querySelector('[name="Фамилия"]').value,a=t.querySelector('[name="Номер телефона"]').value,c=t.querySelector('[name="E-mail"]').value,l=t.querySelector('[name="Способ оплаты"]').value,s=t.querySelector('[name="Способ получения"]').value,u=t.querySelector('[name="Город"]').value,i=t.querySelector('[name="Адрес доставки"]').value;r.append("Товары",JSON.stringify(productArray)),r.append("Имя",n),r.append("Фамилия",o),r.append("Номер телефона",a),r.append("E-mail",c),r.append("Способ оплаты",l),r.append("Способ получения",s),r.append("Город",u),r.append("Адрес доставки",i);let d=new XMLHttpRequest;d.onreadystatechange=function(){4===d.readyState&&(200===d.status?(orderSnackbar.textContent="Заказ оформлен! В скором времени с вами свяжется наш оператор!",orderSnackbar.className="show",setTimeout((function(){orderSnackbar.className=orderSnackbar.className.replace("show","")}),5500)):(orderSnackbar.textContent="Вы все сделали правильно! Извините, сервер недоступен!",orderSnackbar.className="show--red",setTimeout((function(){orderSnackbar.className=orderSnackbar.className.replace("show--red","")}),5500)))},d.open("POST","/resources/mail.php",!0),ValidPhone()&&ValidMail()&&(null!==localStorage.getItem("products")?(d.send(r),t.reset()):(orderSnackbar.textContent="Корзина пуста! Сначала требуется добавить товар!",orderSnackbar.className="show--red",setTimeout((function(){orderSnackbar.className=orderSnackbar.className.replace("show--red","")}),5500)))});const selects=document.querySelectorAll(".select");for(let e=0;e<selects.length;e++){const t=selects[e],r=t.querySelectorAll("option"),n=document.createElement("div"),o=document.createElement("div"),a=document.createElement("div");t.setAttribute("tabindex","-1"),n.className="custom-select",o.className="custom-select__list",a.className="custom-select__current",a.setAttribute("type","button"),n.append(a,o),t.after(n);const c=()=>{n.classList.toggle("custom-select--show")},l=()=>{a.addEventListener("click",c)},s=()=>{for(let e=0;e<selects.length;e++){let t=selects[e];t.addEventListener("change",()=>{t.nextElementSibling.querySelector(".custom-select__current").textContent=t.value})}};function detectmob(e,t){navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)?e():t()}(function(e,t){let n="";for(var a=0;a<r.length;a++)n+='<button type="button" class="custom-select__item" data-value="'+r[a].value+'">'+r[a].text+"</button>";o.innerHTML=n,e(),t()})(()=>a.textContent=o.children[0].textContent,()=>{const e=o.children;for(var r=0;r<e.length;r++){let o=e[r].getAttribute("data-value"),c=e[r].textContent;e[r].addEventListener("click",()=>{n.classList.remove("custom-select--show"),a.textContent=c,t.value=o})}}),document.addEventListener("mouseup",e=>{n.contains(e.target)||n.classList.remove("custom-select--show")}),detectmob(s,l)}
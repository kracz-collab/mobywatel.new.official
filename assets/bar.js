var params = new URLSearchParams(window.location.search);
var ROUTES = {
    home: 'home.html',
    services: 'services.html',
    search: 'search.html',
    qr: 'qr.html',
    more: 'more.html',
    moreid: 'moreid.html',
    id: 'id.html',
    shortcuts: 'shortcuts.html',
    pesel: 'pesel.html',
    scanqr: 'scanqr.html',
    showqr: 'showqr.html',
    gen: 'gen.html',
    card: 'card.html',
};

function sendTo(key){
    var qs = params.toString();
    var file = ROUTES[String(key)] || (String(key).endsWith('.html') ? String(key) : String(key) + '.html');
    var href = file + (qs ? `?${qs}` : '');
    location.href = href;
}

function injectDemoUi() {
    if (!document.getElementById('codex-demo-ui-style')) {
        var style = document.createElement('style');
        style.id = 'codex-demo-ui-style';
        style.textContent = `
            .search_nav {
                position: relative;
                background-image: none !important;
            }
            .search_nav::before {
                content: "";
                position: absolute;
                left: 7px;
                top: 6px;
                width: 14px;
                height: 14px;
                border: 3px solid #fff;
                border-radius: 50%;
            }
            .search_nav::after {
                content: "";
                position: absolute;
                left: 21px;
                top: 22px;
                width: 11px;
                height: 3px;
                border-radius: 999px;
                background: #fff;
                transform: rotate(45deg);
                transform-origin: left center;
            }
            .search_open::before {
                border-color: var(--text, #4ba4fe);
            }
            .search_open::after {
                background: var(--text, #4ba4fe);
            }
        `;
        document.head.appendChild(style);
    }

}

function ensureSearchTab() {
    var grid = document.querySelector('.bottom_bar_grid');
    if (!grid || grid.querySelector('[send="search"]')) {
        return;
    }

    var item = document.createElement('div');
    item.className = 'bottom_element_grid';
    item.setAttribute('send', 'search');
    item.innerHTML = '<div class="bottom_element_image search_nav"></div><p class="bottom_element_text">Szukaj</p>';

    var more = grid.querySelector('[send="more"]');
    if (more) {
        grid.insertBefore(item, more);
    } else {
        grid.appendChild(item);
    }

    grid.style.gridTemplateColumns = 'repeat(' + grid.children.length + ', 1fr)';

    var currentFile = location.pathname.split('/').pop() || 'home.html';
    if (currentFile === 'search.html') {
        grid.querySelectorAll('.bottom_element_image').forEach(function(icon) {
            icon.classList.remove('home_open', 'services_open', 'qr_open', 'more_open', 'search_open');
        });
        grid.querySelectorAll('.bottom_element_text').forEach(function(label) {
            label.classList.remove('open');
        });
        item.querySelector('.bottom_element_image').classList.add('search_open');
        item.querySelector('.bottom_element_text').classList.add('open');
    }
}

injectDemoUi();
ensureSearchTab();

document.querySelectorAll(".bottom_element_grid").forEach((element) => {
    if (element.dataset.navReady === 'true') {
        return;
    }
    element.dataset.navReady = 'true';
    element.addEventListener('click', () => {
        sendTo(element.getAttribute("send"))
    })
})

function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
    if (/windows phone/i.test(userAgent)) {
        return 1;
    }
  
    if (/android/i.test(userAgent)) {
        return 2;
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 3;
    }
  
    return 4;
  }
  
  if (getMobileOperatingSystem() == 2){
      var bottomBar = document.querySelector(".bottom_bar");
      if (bottomBar) {
          bottomBar.style.height = "70px";
      }
}

// scriptsa/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.user-nav__login');
  const modalOverlay = document.getElementById('login-modal');
  const closeBtn = modalOverlay.querySelector('.modal__close');

  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modalOverlay.classList.remove('visually-hidden');
  });

  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.add('visually-hidden');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add('visually-hidden');
    }
  });

  // Функциональность для кнопки "Как добраться"
  const showMapBtn = document.getElementById('show-map-btn');
  const mapPopup = document.getElementById('map-popup');
  const closeMapBtn = mapPopup.querySelector('.map-popup__close');

  showMapBtn.addEventListener('click', () => {
    mapPopup.classList.remove('visually-hidden');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    
    // Применяем альтернативные CSS решения для z-index
    mapPopup.classList.add('map-popup--sticky', 'map-popup--transform', 'map-popup--backdrop');
    
    // Принудительно устанавливаем очень высокий z-index
    mapPopup.style.zIndex = '999999';
    mapPopup.style.position = 'fixed';
  });

  closeMapBtn.addEventListener('click', () => {
    mapPopup.classList.add('visually-hidden');
    document.body.style.overflow = ''; // Возвращаем прокрутку страницы
    
    // Удаляем альтернативные CSS классы
    mapPopup.classList.remove('map-popup--sticky', 'map-popup--transform', 'map-popup--backdrop');
    
    // Возвращаем исходные стили
    mapPopup.style.zIndex = '';
    mapPopup.style.position = '';
  });

  // Дополнительная проверка для кнопки закрытия
  if (closeMapBtn) {
    closeMapBtn.addEventListener('click', () => {
      mapPopup.classList.add('visually-hidden');
      document.body.style.overflow = '';
    });
  }

  // Закрытие по клику на фон
  mapPopup.addEventListener('click', (e) => {
    if (e.target === mapPopup) {
      mapPopup.classList.add('visually-hidden');
      document.body.style.overflow = '';
      
      // Удаляем альтернативные CSS классы
      mapPopup.classList.remove('map-popup--sticky', 'map-popup--transform');
      
      // Возвращаем исходные стили
      mapPopup.style.zIndex = '';
      mapPopup.style.position = '';
    }
  });

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mapPopup.classList.contains('visually-hidden')) {
      mapPopup.classList.add('visually-hidden');
      document.body.style.overflow = '';
      
      // Удаляем альтернативные CSS классы
      mapPopup.classList.remove('map-popup--sticky', 'map-popup--transform');
      
      // Возвращаем исходные стили
      mapPopup.style.zIndex = '';
      mapPopup.style.position = '';
    }
  });
});

// Пагинация для страницы новостей
document.addEventListener('DOMContentLoaded', function() {
  const newsItems = document.querySelectorAll('.news-page__item');
  const paginationLinks = document.querySelectorAll('.news-page__pagination-link');
  const paginationCurrent = document.querySelector('.news-page__pagination-current');
  
  if (newsItems.length > 0) {
    let currentPage = 1;
    const itemsPerPage = 4;
    const totalPages = Math.ceil(newsItems.length / itemsPerPage);
    
    // Функция для показа страницы
    function showPage(page) {
      // Скрываем все новости
      newsItems.forEach(item => {
        item.style.display = 'none';
      });
      
      // Показываем новости для текущей страницы
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      for (let i = startIndex; i < endIndex && i < newsItems.length; i++) {
        newsItems[i].style.display = 'grid';
      }
      
      // Обновляем состояние кнопок пагинации
      const prevLink = document.querySelector('.news-page__pagination-link--prev');
      const nextLink = document.querySelector('.news-page__pagination-link--next');
      
      if (prevLink) {
        if (page === 1) {
          prevLink.style.opacity = '0.5';
          prevLink.style.pointerEvents = 'none';
        } else {
          prevLink.style.opacity = '1';
          prevLink.style.pointerEvents = 'auto';
        }
      }
      
      if (nextLink) {
        if (page === totalPages) {
          nextLink.style.opacity = '0.5';
          nextLink.style.pointerEvents = 'none';
        } else {
          nextLink.style.opacity = '1';
          nextLink.style.pointerEvents = 'auto';
        }
      }
      
      // Обновляем активную страницу в пагинации
      const paginationLinks = document.querySelectorAll('.news-page__pagination-link');
      const paginationCurrent = document.querySelector('.news-page__pagination-current');
      
      // Убираем активное состояние со всех ссылок и элемента "1"
      paginationLinks.forEach(link => {
        link.classList.remove('news-page__pagination-link--active');
        link.style.pointerEvents = 'auto';
      });
      
      if (paginationCurrent) {
        paginationCurrent.classList.remove('news-page__pagination-current--active');
      }
      
      // Добавляем активное состояние к текущей странице
      if (page === 1) {
        if (paginationCurrent) {
          paginationCurrent.classList.add('news-page__pagination-current--active');
        }
      } else {
        // Находим ссылку с номером текущей страницы
        paginationLinks.forEach(link => {
          if (link.textContent.trim() === page.toString()) {
            link.classList.add('news-page__pagination-link--active');
            link.style.pointerEvents = 'none';
          }
        });
      }
    }
    
         // Обработчики для кнопок пагинации
     paginationLinks.forEach(link => {
       link.addEventListener('click', function(e) {
         e.preventDefault();
         
         // Не обрабатываем клики по активной странице
         if (this.classList.contains('news-page__pagination-link--active')) {
           return;
         }
         
         if (this.classList.contains('news-page__pagination-link--prev')) {
           if (currentPage > 1) {
             currentPage--;
             showPage(currentPage);
           }
         } else if (this.classList.contains('news-page__pagination-link--next')) {
           if (currentPage < totalPages) {
             currentPage++;
             showPage(currentPage);
           }
         } else {
           // Клик по номеру страницы
           const pageNumber = parseInt(this.textContent);
           if (pageNumber && pageNumber !== currentPage) {
             currentPage = pageNumber;
             showPage(currentPage);
           }
         }
       });
     });
     
     // Обработчик для элемента "1" (paginationCurrent)
     if (paginationCurrent) {
       paginationCurrent.addEventListener('click', function(e) {
         e.preventDefault();
         
         // Не обрабатываем клики по активной странице
         if (this.classList.contains('news-page__pagination-current--active')) {
           return;
         }
         
         // Переходим на первую страницу
         if (currentPage !== 1) {
           currentPage = 1;
           showPage(currentPage);
         }
       });
     }
    
    // Показываем первую страницу при загрузке
    showPage(1);
  }
});

// Функционал фильтрации товаров в каталоге
document.addEventListener('DOMContentLoaded', function() {
  const radioButtons = document.querySelectorAll('.catalog__filters-radio');
  const checkboxes = document.querySelectorAll('.catalog__filters-checkbox');
  const productCards = document.querySelectorAll('.product-card[data-category]');
  const breadcrumbCurrent = document.querySelector('.breadcrumb__current');
  const catalogTitle = document.querySelector('.catalog__title');
  const showButton = document.querySelector('.catalog__filters-btn');
  const paginationContainer = document.querySelector('.catalog__pagination');

  // Проверяем, что мы на странице каталога
  if (radioButtons.length === 0) {
    return;
  }

  // Объект с названиями категорий
  const categoryNames = {
    'shaving': 'Бритвенные принадлежности',
    'care': 'Средства для ухода',
    'accessories': 'Аксессуары'
  };

  // Объект с названиями производителей
  const brandNames = {
    'baxter': 'BAXTER OF CALIFORNIA',
    'suavecito': 'SUAVECITO',
    'american-crew': 'AMERICAN CREW',
    'gillette': 'GILLETTE',
    'mr-natty': 'MR NATTY',
    'malin-goetz': 'MALIN+GOETZ'
  };

  // Массив исключенных производителей
  let excludedBrands = [];

  // Функция создания пагинации
  function createPagination(totalItems) {
    if (!paginationContainer) return;
    
    // Очищаем контейнер пагинации
    paginationContainer.innerHTML = '';
    
    // Если товаров 4 или меньше, пагинация не нужна
    if (totalItems <= 4) {
      return;
    }
    
    // Определяем количество страниц
    let totalPages = 1;
    if (totalItems > 4 && totalItems <= 8) {
      totalPages = 2;
    } else if (totalItems > 8 && totalItems <= 12) {
      totalPages = 3;
    } else if (totalItems > 12 && totalItems <= 16) {
      totalPages = 4;
    }
    
    // Создаем кнопки пагинации
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement('a');
      link.href = '#';
      link.className = 'catalog__pagination-link';
      link.textContent = i;
      
      // Первая страница активна по умолчанию
      if (i === 1) {
        link.classList.add('catalog__pagination-link--active');
      }
      
      // Добавляем обработчик клика
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Убираем активный класс со всех ссылок
        paginationContainer.querySelectorAll('.catalog__pagination-link').forEach(link => {
          link.classList.remove('catalog__pagination-link--active');
        });
        
        // Добавляем активный класс к текущей ссылке
        this.classList.add('catalog__pagination-link--active');
        
        // Показываем товары для выбранной страницы
        showPage(i);
      });
      
      paginationContainer.appendChild(link);
    }
  }

  // Функция показа страницы
  function showPage(page) {
    const checkedRadio = document.querySelector('.catalog__filters-radio:checked');
    if (!checkedRadio) return;
    
    const category = checkedRadio.value;
    const visibleCards = Array.from(productCards).filter(card => 
      card.dataset.category === category && !excludedBrands.includes(card.dataset.brand)
    );
    
    // Скрываем все товары
    productCards.forEach(card => {
      card.classList.add('hidden');
    });
    
    // Показываем товары для выбранной страницы (4 товара на страницу)
    const startIndex = (page - 1) * 4;
    const endIndex = startIndex + 4;
    
    visibleCards.slice(startIndex, endIndex).forEach(card => {
      card.classList.remove('hidden');
    });
  }

  // Функция фильтрации товаров
  function filterProducts(category) {
    // Скрываем все товары
    productCards.forEach(card => {
      card.classList.add('hidden');
    });

    // Показываем только товары выбранной категории, исключая выбранных производителей
    const visibleCards = Array.from(productCards).filter(card => 
      card.dataset.category === category && !excludedBrands.includes(card.dataset.brand)
    );

    // Показываем первые 4 товара
    visibleCards.slice(0, 4).forEach(card => {
      card.classList.remove('hidden');
    });

    // Создаем пагинацию в зависимости от количества товаров
    createPagination(visibleCards.length);

    // Обновляем хлебные крошки
    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = categoryNames[category];
    }

    // Обновляем заголовок страницы
    if (catalogTitle) {
      catalogTitle.textContent = categoryNames[category].toUpperCase();
    }
  }

  // Обработчики для чекбоксов производителей
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const brand = this.value;
      
      if (this.checked) {
        // Добавляем производителя в список исключенных
        if (!excludedBrands.includes(brand)) {
          excludedBrands.push(brand);
        }
      } else {
        // Убираем производителя из списка исключенных
        excludedBrands = excludedBrands.filter(b => b !== brand);
      }

      // Применяем фильтрацию к текущей категории
      const selectedCategory = document.querySelector('.catalog__filters-radio:checked');
      if (selectedCategory) {
        filterProducts(selectedCategory.value);
      }
    });
  });

  // Обработчик для кнопки "ПОКАЗАТЬ"
  if (showButton) {
    showButton.addEventListener('click', function() {
      const checkedRadio = document.querySelector('.catalog__filters-radio:checked');
      if (checkedRadio) {
        filterProducts(checkedRadio.value);
      }
    });
  }

  // Инициализация - показываем товары категории "care" (средства для ухода)
  const checkedRadio = document.querySelector('.catalog__filters-radio[value="care"]');
  if (checkedRadio && checkedRadio.checked) {
    filterProducts('care');
  }
});
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
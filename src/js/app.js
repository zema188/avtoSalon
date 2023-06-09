// "use strict"

function changerActive(list) {
    for(let i = 0; i < list.length; i++) {
        list[i].classList.remove('active')
    }
    list = 0
}
function deleteSpace(str) {
  return str.replace(/\s+/g, ' ').trim()
}
function deleteLetter(str) {
  return str.replace(/[^0-9]/g,"").trim()
}
//Popup close 
//filter list close
document.addEventListener("click",
function(event) {
  event = event || window.event;
  let target = event.target
  if(target.classList.contains('popup') && !target.classList.contains('gallery') && !target.classList.contains('filter') ) {
    target.classList.remove('active')
    bodyScrollLock.enableBodyScroll(target);
    // bodyNotFixed()
    let carDiscountBtn = document.querySelector('.car__discount-btn_mob')
    if(carDiscountBtn !== null)
    carDiscountBtn.classList.remove('active')
  }
  if(event.target.closest('.filter__item-content') !== null || event.target.classList.contains('filter__item-content')) {
  } else {
    if(!event.target.classList.contains('filter__item-subtitle') && !event.target.classList.contains('new-text')) {
      let filterItem = document.querySelectorAll('.filter__item')
      changerActive(filterItem)
    }
  }
}
)

let popupClose = document.querySelectorAll('.popup-close')
for(let i=0 ; i < popupClose.length ; i++) {
    popupClose[i].addEventListener("click",
    function() {
      let popup = popupClose[i].closest('.popup')
      if(popup.classList.contains('filter')) {
        popup.classList.remove('popup')
      } else {
        popup.classList.remove('active')
      }
        bodyScrollLock.enableBodyScroll(popup);
        // bodyNotFixed()
        let carDiscountBtn = document.querySelector('.car__discount-btn_mob')
        if(carDiscountBtn !== null)
        carDiscountBtn.classList.remove('active')
    })
}




let headerMenuBtn = document.querySelectorAll('.toggle-menu')
let mobileMenu = document.querySelector('.header-m')
for (let i = 0; i < headerMenuBtn.length; i++) {
  headerMenuBtn[i].addEventListener('click', function() {
    toggleMobileMenu()
  })
}

function toggleMobileMenu() {
  for (let i = 0; i < headerMenuBtn.length; i++) {
    headerMenuBtn[i].classList.toggle('open')
  }
  mobileMenu.classList.toggle('active')
}
const filter = document.querySelector('.filter')
// Size-control
window.addEventListener('resize', function(event){
    let popups = document.querySelectorAll('.popup')
    if(window.innerWidth >= 1024) {
      mobileMenu.classList.remove('active')
      for (let i = 0; i < headerMenuBtn.length; i++) {
        headerMenuBtn[i].classList.remove('open')
      }
      let popupActive = false
      for (let i = 0; i < popups.length; i++) {
        if (popups[i].classList.contains('active')) {
          popupActive = true
          break
        }
      }
    }
})

//preview-swiper
const previewSwiper = new Swiper('.preview-swiper', {
    slidesPerView: 2,
    speed: 400,
    spaceBetween: 25,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
        el: '.preview-swiper__pagination',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
    }
})


//types-swiper
const typesSwiper = new Swiper('.types-swiper', {
    slidesPerView: 3.5,
    speed: 400,
    spaceBetween: 15,
    // centeredSlides: true,
})


//advantages swiper 
const advantagesSwiper = new Swiper('.advantages-swiper', {
  // slidesPerView: 3,
  speed: 400,
  spaceBetween: 25,
  slidesPerView: "auto",
  breakpoints: {
    0: {
      spaceBetween: 14,
    },
    540: {
      spaceBetween: 14,
    },
    768: {
      spaceBetween: 25,
    },
  }
})


//parnters swiper 
const partnersSwiper = new Swiper('.partners-swiper', {
  speed: 400,
  spaceBetween: 14,
  breakpoints: {
    0: {
      slidesPerView: "auto",
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 14,
    },
  }
})


if(document.querySelectorAll('.credit__form').length) {
  // рассчет при загрузке страницы
  // calc()
  //связываем поля друг с другом
  //поля ввода
  let fields = document.querySelectorAll('[range-for]')
  link_Feilds(fields)
  let fieldsRange = document.querySelectorAll('[range-name]')
  link_Feilds_Range(fieldsRange)
  //новый ползунок связывание
  let jsRangeSlider = document.querySelectorAll('.js-range-slider')
  for(let i = 0; i < jsRangeSlider.length; i++) {
    $(jsRangeSlider[i]).ionRangeSlider({
      grid: false,
      skin: "round",
      hide_min_max: true,
      hide_from_to: true,
      onChange: function (data) {
        let id = $(jsRangeSlider[i]).attr('range-name')
        let field = document.querySelector('[range-for="'+id+'"]')
        let suffix = $(jsRangeSlider[i]).attr('suffix')
        field.value = numberWithCommas(data.from) + '' + suffix
        calc()
      },
    })
  }
}

//link fields for calc поля ввода 
function link_Feilds(fields) {
  for(let i = 0; i < fields.length; i++) {
    let id = fields[i].getAttribute('range-for')
    let suffix = fields[i].getAttribute('suffix')
    let min = fields[i].getAttribute('min')
    let max = fields[i].getAttribute('max')
    let range = document.querySelector('[range-name="'+id+'"]')



    fields[i].addEventListener('blur', function() {
      addSuffix(fields[i], suffix, min, max)
      let number = getNumber(fields[i].value)
      range.value = number
    }) 


    
    fields[i].addEventListener('input', function() {
      let number = getNumber(fields[i].value)
      $(range).data("ionRangeSlider").update({
        from: number,
      });
      // ChangeRange(range)
      calc()
    })
    fields[i].addEventListener('click', function() {
    })
  }
}

function link_Feilds_Range(range) {
  for(let i = 0; i < range.length; i++) {
    let id = range[i].getAttribute('range-name')
    let field = document.querySelector('[range-for="'+id+'"]')
    let suffix = range[i].getAttribute('suffix')
    range[i].addEventListener('input', function() {
      field.value = numberWithCommas(range[i].value) + ' ' + suffix
      calc()
    })
  }
}

for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
  e.style.setProperty('--value', e.value);
  e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  e.style.setProperty('--max', e.max == '' ? '100' : e.max);
  e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
function ChangeRange(e) {
  e.style.setProperty('--value', e.value);
  e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  e.style.setProperty('--max', e.max == '' ? '100' : e.max);
  e.style.setProperty('--value', e.value)
}



function getNumber(str){
  return +str.replace(/[\D]+/g, '') 
}
function addSuffix(field, text, min, max) {

  let value = field.value;
  let number = min
  if(value) {
    value = value.split(' ').join('')
    number = parseInt(value.match(/\d+/)[0], 10);
  }
  if(number > max)
    number = max
  field.value = ""
  field.value = numberWithCommas(number) + ' ' + text;
}


function calc() {


  let price = document.querySelector('.car__price-now').innerHTML
  price =  parseInt(price.split(' ').join(''))
  let months = document.querySelector('[range-for="months"').value
  months =  parseInt(months)
  let procents = document.querySelector('.credit-year-procent').innerHTML
  procents =  parseFloat(procents.split(' ').join(''))
  procents = (procents / 100) / 12
  let firstPay = document.querySelector('[range-name="deposit"').value
  price = price - (price / 100 * firstPay)

  let res =  (price * procents) / (1 - Math.pow((1 + procents),(-months)))
  res = parseInt(res)
  res = numberWithCommas(res)
  let creditResult = document.querySelector('.credit-result')
  
  creditResult.innerHTML = res + ' ₽'
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

//gallery swiper
if(document.querySelectorAll('.gallery__swiper').length) {
  const gallery = document.querySelector('.gallery')
  const miniImage = gallery.querySelectorAll('.gallery__swiper-slide')
  const bigImage = gallery.querySelectorAll('.gallery__list-item')
  const gallerySwiperList = gallery.querySelector('.gallery__swiper-list')
  const galleryPrevBtn = gallery.querySelector('.gallery__swiper-prev')
  const galleryNextBtn = gallery.querySelector('.gallery__swiper-next')
  let activeId = 0

  // открыть галарею по клику на фото
  const openGallery = document.querySelectorAll('.open-gallery')
  for(let i = 0; i < openGallery.length; i++) {
    openGallery[i].addEventListener('click', function() {
      gallery.classList.add('active')
      bodyScrollLock.disableBodyScroll(gallery);
    })
  }


  //скролл по кнопкам
  galleryPrevBtn.onclick = function() {
    if(activeId > 0) {
      changeActiveSlide(-1)
    } else {
      changeActiveSlide(miniImage.length-1)
    }
  }
  galleryNextBtn.onclick = function() {
    if(activeId < miniImage.length - 1) {
      changeActiveSlide(1)
    } else {
      changeActiveSlide(-miniImage.length+1)
    }
  }

  function changeActiveSlide(side) {
      activeId += side
      miniImage[activeId].scrollIntoView();
      bigImage[activeId].scrollIntoView();
      changerActive(miniImage)
      miniImage[activeId].classList.add('active')

  }
  //scroll by click in mini image
  for(let i = 0; i < miniImage.length; i++) {
    miniImage[i].addEventListener('click', function() {
      changerActive(miniImage)
      this.classList.add('active')
      activeId = i
      bigImage[i].scrollIntoView();
    })
  }


  // change mini images by scroll
  gallery.addEventListener('scroll', function(){
    for(let i = 0; i < bigImage.length; i++) {
      checkIfElementIs100pxBelowViewport(bigImage[i],i)
    }
  });


  function checkIfElementIs100pxBelowViewport(element,number) {
    const rect = element.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const isAboveMidpoint = rect.top < windowHeight / 2;
    const isBelowMidpoint = rect.bottom > windowHeight / 2;
  
    if (isAboveMidpoint && isBelowMidpoint) {
      activeId = number
      changerActive(miniImage)
      miniImage[number].classList.add('active')
      miniImage[number].scrollIntoView();
    }
  }

}



//filter 

if(document.querySelectorAll('.filter').length) {
  const filter = document.querySelector('.filter')
  const filteritem = filter.querySelectorAll('.filter__item')
  const filterInputs = filter.querySelectorAll('input')
  const filterReset = filter.querySelectorAll('.btn_reset')
  let activeMinYearId = 0
  let activeMaxYearId = 0
  for (let i = 0; i < filteritem.length; i++) {
    filteritem[i].addEventListener('click', function(e) {
      if(e.target.classList.contains('filter__item-subtitle') || e.target.classList.contains('new-text')) {
        if(this.classList.contains('active')) {
          changerActive(filteritem)
        } else {
          changerActive(filteritem)
          this.classList.add('active')
        }
      }
      if(e.target.classList.contains('filter__item-close-btn')) {
        this.classList.remove('active')
      }
      if(e.target.classList.contains('filter__item-content-reset')) {
        let inputs = this.querySelectorAll('input')
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].checked = false
          inputs[i].value = ''
          e.target.closest('.filter__item').querySelector('.filter__item-subtitle').querySelector('span').innerHTML = ''
          e.target.closest('.filter__item').classList.remove('arrow-hidden')
        }
      }
      if(e.target.classList.contains('reset-year')) {
        activeMinYearId = 0
        activeMaxYearId = 0
        yearSwiper[0].slideTo(0, 400)
        yearSwiper[1].slideTo(0, 400)
      }
    })
  }

  //закрытие фильтра на крестик
  let filterClose = filter.querySelector('.filter__header-close')
  filterClose.onclick = function() {
    if(filter.classList.contains('filter_catalog')) {
      filter.classList.remove('active')
      filter.classList.remove('popup')
      filter.style.display = 'none'
    }
  }


  let labels = filter.querySelectorAll('label')
  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', function(e) {
      labels[i].querySelector('input').checked = !labels[i].querySelector('input').checked
      e.preventDefault()
    })
  }



  //показ что выбрал пользователь в фильтрах
  //checbox list 
  let listCheckbox = filter.querySelectorAll('.list-checkbox')
  for (let i = 0; i < listCheckbox.length; i++) {
    listCheckbox[i].addEventListener('click', function(e) {
      let target = e.target
      if(!target.classList.contains('filter__item-list'))
      addSelector(target)
    })
  }


  function addSelector(target) {
    let parent = target.closest('label')
    let text = parent.querySelector('span').innerHTML
    let filterItem = parent.closest('.filter__item')
    let subtitle = filterItem.querySelector('.filter__item-subtitle')
    let span = subtitle.querySelector('span')
    let input = parent.querySelector('input')
    let inputs = filterItem.querySelectorAll('input')
    let checked = 0


    text = deleteSpace(text)
    if(input.checked) {
      if(deleteSpace(span.innerHTML) == '') {
        span.innerHTML += text
      } else {
        if(!deleteSpace(span.innerHTML).includes(text) && !deleteSpace(span.innerHTML).includes('+')) {
          span.innerHTML += ' +'
        }
      }
    } else {
      if(deleteSpace(span.innerHTML).includes(text)) {
        span.innerHTML = ''
        for (let i = 0; i < inputs.length; i++) {
          if(inputs[i].checked && !checked) {
            span.innerHTML += inputs[i].closest('label').querySelector('span').innerHTML
            checked++
          } else if (inputs[i].checked) {
            checked++
          }
        }
        if(checked>1)
        span.innerHTML += ' +'
      }
    }
    if(!deleteSpace(span.innerHTML) == '') {
      filterItem.classList.add('arrow-hidden')
    } else {
      filterItem.classList.remove('arrow-hidden')
    }
    checkForReset()

  }



  //то что в инпутах
  let inputsSelector = filter.querySelectorAll('.filter__item-input')
  for (let i = 0; i < inputsSelector.length; i++) {
    inputsSelector[i].addEventListener('input', function() {
      addSelectorFromInput(this)
    })
    inputsSelector[i].addEventListener('focus', function() {
      inputsSelector[i].value = numberWithCommas(deleteLetter(inputsSelector[i].value))
    })
    inputsSelector[i].addEventListener('blur', function() {
      let prefix = inputsSelector[i].getAttribute('name-limit')
      let type = inputsSelector[i].getAttribute('name-type')
      inputsSelector[i].value = `${prefix} ${numberWithCommas(deleteLetter(inputsSelector[i].value))} ${type}`
    })
  }
  function addSelectorFromInput(target) {
    let filterItem = target.closest('.filter__item')
    let title = filterItem.querySelector('.filter__item-subtitle').querySelector('span')
    let min = filterItem.querySelector('[name-limit$="от"]')
    let max = filterItem.querySelector('[name-limit$="до"]')
    let text = ''
    let type = target.getAttribute('name-type')
    target.value = numberWithCommas(deleteLetter(target.value))
    if(target.value.length >=15) {
      target.value = target.value.slice(0, 14);
    }
    if(min.value) {
      text += `от ${numberWithCommas(deleteLetter(min.value))} ${type} `
    }
    if(max.value) {
      text += `до ${numberWithCommas(deleteLetter(max.value))} ${type}`
    }
    title.innerHTML = text
    
    if(text) {
      filterItem.classList.add('arrow-hidden')
    } else {
      filterItem.classList.remove('arrow-hidden')
    }
    checkForReset()

  }


// селектор марка модель
const filterModelMark = filter.querySelector('.filter__model-mark')
let btnPreview = filterModelMark.querySelectorAll('.btn-preview')
const selectorModelMarkItem = filterModelMark.querySelectorAll('.filter__model-mark-item')


//колонки
const marksCol = filterModelMark.querySelector('.filter__mark-list')
const modelsCol = filterModelMark.querySelector('.filter__models-col')
const generationCol = filterModelMark.querySelector('.filter__generation-col')



//марки
let marksItem = marksCol.querySelectorAll('.filter__model-mark-item')


filterModelMark.addEventListener('click', function(e) {
  let target = e.target
//открытие колонки с моделями по клику на стрелочку на марке
  if(target.classList.contains('btn-show-models')) {
    showModels(target)
  }
//открытие колонки с моделями по клику на стрелочку на марке
  if(target.classList.contains('btn-show-generation')) {
    showGeneration(target)
  }
//клик по чекбоксу марки
  if(target.classList.contains('filter__item-checkbox-mark') || target.closest('.filter__item-checkbox-mark')) {
    changeCheckBoxMark(target)
  }
//клик по чекбоксу модели
  if(target.classList.contains('filter__item-checkbox-model') || target.closest('.filter__item-checkbox-model')) {
    changeCheckBoxModel(target)
  }
//клик по чекбоксу генерации
  if(target.classList.contains('filter__item-checkbox-generation') || target.closest('.filter__item-checkbox-generation')) {
    changeCheckBoxGeneration(target)
  }
})

//функция для открытия моделей 
function showModels(btn) {
  let mark = btn.closest('.filter__model-mark-item')
  let title = mark.querySelector('.mark-title')
  let currentModelsList = mark.querySelector('.filter__models-list')
  if(window.innerWidth >= 540)
  closeModelsGenerations(mark)
  if(mark.classList.contains('active')) {
    mark.classList.remove('active')
  } else {
    changerActive(marksItem)
    mark.classList.add('active')
    if(window.innerWidth >= 540) {
      modelsCol.innerHTML = ''
      modelsCol.appendChild(title.cloneNode(true))   
      modelsCol.appendChild(currentModelsList).style.display = 'block'
    } else {

    }
  }
}

//функция для открытия генераций 
function showGeneration(btn) {
  let model = btn.closest('.filter__models-item')
  let title = model.querySelector('.model-title')
  let currentGenerationList = model.querySelector('.filter__generation-list')
  let modelsItem = modelsCol.querySelectorAll('.filter__models-item')
  if(window.innerWidth >= 540)
  closeGenerations()
  if(model.classList.contains('active')) {
    model.classList.remove('active')
    generationCol.innerHTML = ''
  } else {
    changerActive(modelsItem)
    model.classList.add('active')
    if(window.innerWidth >= 540) {
      generationCol.innerHTML = ''
      generationCol.appendChild(title.cloneNode(true))   
      generationCol.appendChild(currentGenerationList).style.display = 'block'
    }
  }
}
//функция когда кликаем на чекбокс марки
function changeCheckBoxMark(target) {
  let mark = target.closest('.filter__model-mark-item')
  let checkBoxMark = mark.querySelector('.filter__item-checkbox-mark')
  let currentInput = checkBoxMark.querySelector('input')

  if(currentInput.checked) {

  } else {
    // если выбрана марка
    if(mark.querySelectorAll('.filter__item-checkbox-model').length) {
      clearCheckbox(mark,'filter__item-checkbox-model')
      clearCheckbox(mark,'filter__item-checkbox-generation')
    } else {
      clearCheckbox(modelsCol,'filter__item-checkbox-model')
      clearCheckbox(modelsCol,'filter__item-checkbox-generation')
      if(deleteSpace(generationCol.innerHTML) != '') {
        clearCheckbox(generationCol,'filter__item-checkbox-generation')
      }
    }
  }
}
//функция когда кликаем на чекбокс марки
function changeCheckBoxModel(target) {
  let model = target.closest('.filter__models-item')
  let checkBoxMark = model.querySelector('.filter__item-checkbox-model')
  let currentInput = checkBoxMark.querySelector('input')

  if(currentInput.checked) {
    if(model.closest('.filter__model-mark-item'))
      model.closest('.filter__model-mark-item').querySelector('.filter__item-checkbox-mark').querySelector('input').checked = true
    else
      marksCol.querySelector('.filter__model-mark-item.active').querySelector('.filter__item-checkbox-mark').querySelector('input').checked = true
  } else {
    if(model.querySelectorAll('.filter__item-checkbox-generation').length)
      clearCheckbox(model,'filter__item-checkbox-generation')
    else
      clearCheckbox(generationCol,'filter__item-checkbox-generation')
  }
}

//функция когда кликаем на чекбокс марки
function changeCheckBoxGeneration(target) {
  let generation = target.closest('.filter__item-checkbox-generation')
  let currentInput = generation.querySelector('input')
  if(currentInput.checked) {
    if(generation.closest('.filter__model-mark-item')) {
      generation.closest('.filter__model-mark-item').querySelector('.filter__item-checkbox-mark').querySelector('input').checked = true
      generation.closest('.filter__models-item').querySelector('.filter__item-checkbox-model').querySelector('input').checked = true
    } else {
      marksCol.querySelector('.filter__model-mark-item.active').querySelector('.filter__item-checkbox-mark').querySelector('input').checked = true
      modelsCol.querySelector('.filter__models-item.active').querySelector('.filter__item-checkbox-model').querySelector('input').checked = true
    }
  } else {

  }
}


function clearCheckbox(container,checkbox) {
  let elems = container.querySelectorAll(`.${checkbox}`)
  if(elems.length) {
    for(let i = 0; i < elems.length; i++) {
      elems[i].querySelector('input').checked = false
    }
  }
}





//закрытие модели + генерация
function closeModelsGenerations(mark) {
  closeGenerations()
  if(deleteSpace(modelsCol.innerHTML) != '') {
    let activeMark = marksCol.querySelector('.filter__model-mark-item.active')
    let currentModelsList = modelsCol.querySelector('.filter__models-list')
    let activeModel = currentModelsList.querySelector('.filter__models-item.active')
    $(currentModelsList).attr('style', '')
    activeMark.appendChild(currentModelsList)
    modelsCol.innerHTML = ''
    if(activeModel !== null)
    activeModel.classList.remove('active')
  }
}
//закрытие генераций
function closeGenerations() {
  if(deleteSpace(generationCol.innerHTML) != '') {
    let activeModel = modelsCol.querySelector('.filter__models-item.active')
    let currentGenerationList = generationCol.querySelector('.filter__generation-list')
    $(currentGenerationList).attr('style', '')
    activeModel.appendChild(currentGenerationList)
    generationCol.innerHTML = ''
  }
}


window.onresize = function() {
  if(window.innerWidth <= 539) {
    if(deleteSpace(generationCol.innerHTML) != '' || deleteSpace(modelsCol.innerHTML) != '') {
      let activeMark = filter.querySelector('.filter__model-mark-item active')
      closeModelsGenerations(activeMark)
    }
  }
}


function checkForReset() {
  let filterResetBtn = filter.querySelector('.filter__footer-btn_reset')
  let spans = filter.querySelectorAll('.new-text')
  let isActive = false
  for (let i = 0; i < spans.length; i++) {
    if(deleteSpace(spans[i].innerHTML) != '') {
      isActive =  true
      break
    }
  } 
  if(isActive) {
    filterResetBtn.classList.add('active')
  } else {
    filterResetBtn.classList.remove('active')
  }
}

// год выпуска
let filterItemListYear = filter.querySelector('.filter__item-list_year')
filterItemListYear.addEventListener('click', function(e) {
  let target = e.target
  if(!target.classList.contains('filter__item-side') && !target.classList.contains('filter__item-list')) {
    addYears(target)
  }
})



function addYears(target) {
  let parent = target.closest('label')

    let span = parent.querySelector('span')
    let filterItem = target.closest('.filter__item')
    let list = target.closest('.pc-list-year')
    let filterItemSubtitleSpan = filterItem.querySelector('.filter__item-subtitle').querySelector('span')
    let text = ""
  
    let min = list.querySelectorAll('[name$="min-year"]')
    let max = list.querySelectorAll('[name$="max-year"]')
    let minText = ''
    let maxText = ''
    let a = 0
    let b = 0
    


    if(parent.classList.contains('disabled')) {
      let input = parent.querySelector('input')
      input.checked = false
      if(!min[activeMinYearId].classList.contains('disabled')) {
        min[activeMinYearId].querySelector('input').checked = true
      }
      if(!max[activeMaxYearId].classList.contains('disabled')) {
        max[activeMaxYearId].querySelector('input').checked = true
      }
      
    } else {
      
    }


    for (let i = 0; i < min.length; i++) {
      min[i].classList.remove('disabled')
      max[i].classList.remove('disabled')
      if(min[i].querySelector('input').checked) {
        minText = min[i].querySelector('span').innerHTML
        minText = deleteSpace(minText)
        activeMinYearId = i
        if(i)
        b = i
      }
      if(max[i].querySelector('input').checked) {
        maxText = max[i].querySelector('span').innerHTML
        maxText = deleteSpace(maxText)
        activeMaxYearId = i
        if(i)
        a = i + 1 
      }
    }
    if(b)
    for (b; b < max.length; b++) {
      max[b].classList.add('disabled')
    }
    if(a)
    for (let i = 0; i < a; i++) {
      min[i].classList.add('disabled')
    }
  
    
    if(minText == maxText) {
      text = minText
    } else {
      if (minText && minText!='Любой') {
        text += 'от ' + minText
      } 
      if (maxText && maxText!='Любой') {
        text += ' до ' + maxText
      } 
    }
    filterItemSubtitleSpan.innerHTML = text
    if(!deleteSpace(filterItemSubtitleSpan.innerHTML) == '') {
      filterItem.classList.add('arrow-hidden')
    } else {
      filterItem.classList.remove('arrow-hidden')
    }
    checkForReset()
}

//show filter by click
  let showFilterBtn = document.querySelector('.btn-show-filter')
  $( showFilterBtn ).on( "click", function() {
    if(window.innerWidth <= 539) {
      filter.classList.add('active')
      filter.classList.add('popup')
      filter.style.display = 'block'
      bodyScrollLock.disableBodyScroll(filter)
      // bodyFixed()
    } else {
      $( filter ).slideToggle( "slow", function() {
        // Animation complete.
      });
    }
  });
//close filter by click
  let closeFilterBtn = filter.querySelector('.filter__footer-btn_close')
  $( closeFilterBtn ).on( "click", function() {
    $( filter ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });
  let filterSubtitle = filter.querySelectorAll('.filter__item-subtitle')
  let filterResetBtn = filter.querySelector('.filter__footer-btn_reset')

  //reset settings
  for (let i = 0; i < filterReset.length; i++) {
    filterReset[i].addEventListener("click", function() {
      filterResetBtn.classList.remove('active')
      for (let i = 0; i < filterInputs.length; i++) {
        filterInputs[i].checked = false;
        filterInputs[i].value = '';
        activeMinYearId = 0
        activeMaxYearId = 0
        yearSwiper[0].slideTo(0, 400)
        yearSwiper[1].slideTo(0, 400)
      }
      for (let i = 0; i < filteritem.length; i++) {
        if(filterSubtitle[i].querySelector('span') !== null) {
          filterSubtitle[i].querySelector('span').innerHTML = ''
        }
        filteritem[i].classList.remove('arrow-hidden')
      }
      for (let i = 0; i < labels.length; i++) {
        labels[i].classList.remove('disabled')
      }
    });
  }



  //add filter popup for mobile
  const filterShowBtnMobile = document.querySelector('.filter__footer_filter')
  filterShowBtnMobile.onclick = function() {
    filter.classList.add('popup')
    bodyScrollLock.disableBodyScroll(filter)
    // bodyFixed()
  }
}


//show phone by blick btns

if(document.querySelectorAll('.show-modal-phone').length) {
  let showModalPhone = document.querySelectorAll('.show-modal-phone')
  let popupPhone = document.querySelector('.popup-phone')
  for (let i = 0; i < showModalPhone.length; i++) {
    showModalPhone[i].addEventListener('click', function() {
      popupPhone.classList.add('active')
      bodyScrollLock.disableBodyScroll(popupPhone)
      if(window.innerWidth >= 540) {
        // bodyFixed()
      }
    })
  }
}


//credit open in mobile 
if(document.querySelectorAll('.open-credit-btn').length) {
  let showCreditModalBtn = document.querySelectorAll('.open-credit-btn')
  let credit = document.querySelector('.credit')
  for(let i = 0; i<showCreditModalBtn.length; i++) {
    showCreditModalBtn[i].onclick = function() {
      credit.classList.add('active')
      credit.classList.add('popup')
      bodyScrollLock.disableBodyScroll(credit)
      // bodyFixed()
    }
  }
}


//credit page 
function addLock(elem) {
  elem.classList.add('lock')
  elem.querySelector('span').innerHTML = ''
  let li = elem.querySelectorAll('li')
  changerActive(li)
  inputs = elem.querySelectorAll('input')
  for(let i = 0; i < inputs.length; i++) {
    inputs[i].checked = false
  }
}
function addHidden(elem) {
  elem.classList.add('hidden')
}


if(document.querySelectorAll('.additionally').length) {
  let additionally = document.querySelector('.credit__form')
  let additionallyItem = document.querySelectorAll('.additionally__item')

  let labels = additionally.querySelectorAll('label')
  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', function(e) {
      labels[i].querySelector('input').checked = !labels[i].querySelector('input').checked
      e.preventDefault()
    })
  }



  allLi = additionally.querySelectorAll('li')
  allSpans = additionally.querySelectorAll('span')

  additionally.addEventListener('click', function(e) {
    let target = e.target
    let parent = target.closest('.additionally__item')
    let currentList = target.closest('.additionally__list')
    if(target.tagName == 'LI' || target.closest('LI')) {
      let currentLi = target.closest('LI')
      let span = parent.querySelector('.additionally__subtilte').querySelector('span')
      let li = parent.querySelectorAll('li')
      if(currentLi.classList.contains('active')) {
        changerActive(li)
        span.innerHTML = ''
        switch(parent.getAttribute('name')) {
          case 'mark': {
            addLock(currentList.querySelector('[name$="model"]'))
            addLock(currentList.querySelector('[name$="ads"]'))
            addHidden(document.querySelector('[data-name$="calc"]'))
            addHidden(currentList.querySelector('[name$="ads-item"]'))
            break
          }
          case 'model': {
            addLock(currentList.querySelector('[name$="ads"]'))
            addHidden(document.querySelector('[data-name$="calc"]'))
            addHidden(currentList.querySelector('[name$="ads-item"]'))
            break
          }
          case 'ads': {
            addHidden(document.querySelector('[data-name$="calc"]'))
            addHidden(currentList.querySelector('[name$="ads-item"]'))
            break
          }
        }
      } else {
        changerActive(li)
        currentLi.classList.add('active')
        span.innerHTML = deleteSpace(currentLi.querySelector('span').innerHTML)
        parent.classList.remove('active')
        switch(parent.getAttribute('name')) {
          case 'mark': {
            currentList.querySelector('[name$="model"]').classList.remove('lock')
            break
          }
          case 'model': {
            currentList.querySelector('[name$="ads"]').classList.remove('lock')
            break
          }
          case 'ads': {
            if(document.querySelector('[data-name$="calc"]') !== null) {
              document.querySelector('[data-name$="calc"]').classList.remove('hidden')
            }

            if(currentList.querySelector('[name$="ads-item"]') !== null) {
              currentList.querySelector('[name$="ads-item"]').classList.remove('hidden')
            }
            calc()
            break
          }
        }
      }



    }
    if(target.classList.contains('close')) {
      parent.classList.remove('active')
    }
    
  })

  // открытие 

  let additionallySubtilte = document.querySelectorAll('.additionally__subtilte')
  for (let i = 0; i < additionallySubtilte.length; i++) {
    additionallySubtilte[i].addEventListener('click', function() {
      let parent = additionallySubtilte[i].closest('.additionally__item')


      if(parent.classList.contains('active')) {
        changerActive(additionallyItem)
      } else {
        changerActive(additionallyItem)
        if(!parent.classList.contains('lock')) {
          parent.classList.add('active')
        }
      }
      
    })
  }
}


if(document.querySelectorAll('.header_car').length) {
  let header = document.querySelector('.header_car')
  document.addEventListener('scroll', function() {
    if(window.pageYOffset>=20) {
      header.classList.add('fixed')
    } else {
      header.classList.remove('fixed')
    }
  })
}


//car page car__discount
if(document.querySelectorAll('.car__discount-btn_pc').length) {
  let carDiscountBtn = document.querySelector('.car__discount-btn_pc')
  let discount = document.querySelector('.car__discount_pc')

  $( carDiscountBtn ).on( "click", function() {
    this.classList.toggle('active')
    $( discount ).slideToggle( "slow", function() {
      // Animation complete.
    });
  });
}


//car page car__discount mobile
if(document.querySelectorAll('.car__discount-btn_mob').length) {
  let carDiscountBtn = document.querySelector('.car__discount-btn_mob')
  let discount = document.querySelector('.car__discount_mobile')
  carDiscountBtn.onclick = function() {
    this.classList.toggle('active')
    discount.classList.toggle('active')
    bodyScrollLock.disableBodyScroll(discount)
    // bodyFixed()
  }

}


//mask for input type tel 
  [].forEach.call( document.querySelectorAll('[type="tel"]'), function(input) {
  let keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      let matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)

});


//mobile year swiper
const yearSwiper = new Swiper('.mobile-year__swiper', {
  slidesPerView: 7,
  // slidesPerView: 'auto',
  spaceBetween: 0,
  direction: 'vertical',
  slideToClickedSlide: true,
  centeredSlides: true,
  freeMode: {
    enabled: true,
    sticky: true,
  },
  on: {
    slideChangeTransitionEnd: function (swiper) {
      let headerYear = document.querySelector('.filter__item_year')
      let title = headerYear.querySelector('.new-text')
      let minSwiper = document.querySelector('.mobile-year__swiper-min')
      let maxSwiper = document.querySelector('.mobile-year__swiper-max')
      currentMinSlideText = minSwiper.querySelector('.swiper-slide-active').querySelector('span').innerHTML
      currentMaxSlideText = maxSwiper.querySelector('.swiper-slide-active').querySelector('span').innerHTML
      title.innerHTML = ''
      if(deleteSpace(currentMinSlideText) != 'от') {
        title.innerHTML += 'от ' +  currentMinSlideText
      }
      if(deleteSpace(currentMaxSlideText) != 'до') {
        title.innerHTML += ' до ' +  currentMaxSlideText
      }
      if(parseInt(currentMinSlideText) >= parseInt(currentMaxSlideText)) {
        title.innerHTML = ''
        title.innerHTML += ' до ' +  currentMaxSlideText
      }
    }
  }
})


// прижимаем футер вниз на странице акции
if(document.querySelectorAll('.wrapper_stock').length) {
  let footer = document.querySelector('.footer-w')
  let wrapper = document.querySelector('.wrapper')
  function addPaddingWrapperFromFooter() {
    let margin = window.getComputedStyle(footer).marginTop
    wrapper.style.paddingBottom = footer.clientHeight + parseInt(margin) + 'px'
  }
  window.onresize = function() {
    addPaddingWrapperFromFooter()
  }
  addPaddingWrapperFromFooter()
}



// раскрытие текста в футере по клику на кнопку подробнее
if(document.querySelectorAll('.footer__dics-more-btn').length) {
  let footerBtnMore = document.querySelector('.footer__dics-more-btn')
  footerBtnMore.onclick = function() {
    this.classList.add('hidden')
    $('.footer__dics-hidden').slideToggle(400);
  }
}


//---------------------------------------------------------------------------------------------------------


//ползунок js-range-slider
let jsRangeSlider = document.querySelectorAll('.js-range-slider')
if(document.querySelectorAll('.js-range-slider').length) {
  for(let i = 0; i < jsRangeSlider.length; i++) {
    $(jsRangeSlider[i]).ionRangeSlider({
      grid: false,
      skin: "round",
      hide_min_max: true,
      hide_from_to: true,
    })
  }
}

//selector список
if(document.querySelectorAll('.selector')) {
  let selector = document.querySelectorAll('.selector')
  for(let i = 0; i < selector.length; i++) {
    removeClickLabel(selector[i])
    selector[i].addEventListener('click', function(e) {
      let target = e.target
      let subTitle = selector[i].querySelector('.selector__subtitle')
      //open close
      if(target.classList.contains('selector__subtitle')) {
        this.classList.toggle('active')
      }
      //close 
      if(target.classList.contains('close')) {
        this.classList.remove('active')
      }
      //select
      if(target.classList.contains('filter__custom-input') || target.classList.contains('selector__list-item') || target.tagName == "SPAN") {
        subTitle.innerHTML = target.closest('.filter__item-checkbox').querySelector('span').innerHTML
      }
    })
  }
}

function removeClickLabel(list) {
  let labels = list.querySelectorAll('label')
  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', function(e) {
      labels[i].querySelector('input').checked = !labels[i].querySelector('input').checked
      e.preventDefault()
    })
  }
}

// БЫСТРЫЙ ПОДБОР НОВОГО АВТОМОБИЛЯ selection__range
if(document.querySelectorAll('.selection__range-input').length) {
  console.log($('.selection__range-input'))
  $('.selection__range-input').ionRangeSlider({
    grid: false,
    skin: "round",
    hide_min_max: true,
    hide_from_to: true,
    onChange: function (data) {
      let valueField = document.querySelector('.selection__range-value')
      valueField.innerHTML = `До ${numberWithCommas(data.from)} р`
    },
  })
}


//блоки со скрытом контентом
if(document.querySelectorAll('.dropdown-block ').length) {
  let dropwodnBlock = document.querySelectorAll('.dropdown-block') 

  for(let i = 0; i < dropwodnBlock.length; i++) {
    equipmentToggle(dropwodnBlock[i])
  }

  function equipmentToggle(dropwodnBlock) {
    let dropdownHeader = dropwodnBlock.querySelectorAll('.dropdown-header')

    for(let i = 0; i < dropdownHeader.length; i++) {

      dropdownHeader[i].onclick = function() {
        let parent = this.closest('.dropdown-item')
        parent.classList.toggle('active')
        let hiddenContetn = parent.querySelector('.dropdown-hidden')
        $(hiddenContetn).slideToggle(200)
      }

    }

  }
}
$(function () {
  // смена цвета машины 
if(document.querySelector('.car__color-list') !== null) {

  //делаем color-swiper__slide
  let colors = document.querySelectorAll('.car__color-item')
  let colorSwiperWrapper = document.querySelector('.color-swiper__wrapper')

  for(let i = 0; i < colors.length; i++) {
    createColorSwiperSlides(colors[i],colorSwiperWrapper)
  }

  //делаем car-swiper__slide
  let carSwiperWrapper = document.querySelector('.car__preview-swiper-wrapper')

  for(let i = 0; i < colors.length; i++) {
    createCarSwiperSlides(colors[i],carSwiperWrapper)
  }

  // <!-- мобильный переключатель цвета авто -->
  const colorSwiper = new Swiper('.color-swiper', {
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: '.color-swiper__next',
      prevEl: '.color-swiper__prev',
    },
  })

  // события смена слайда мобильного 
  colorSwiper.on('slideChange', function () {
    let currentSlide = document.querySelectorAll('.color-swiper__slide')[colorSwiper.realIndex+1]
    CarSwiper.slideTo(colorSwiper.realIndex+1)
    changerActive(colorItem)
    colorItem[colorSwiper.realIndex].classList.add('active')

    //меняем название заголовка цвета
    let titleColorName = document.querySelector('.car__color-name')
    if(titleColorName !== null) {
      let titleBlock = titleColorName.querySelector('a')
      changeTextTitleColor(currentSlide,titleBlock)
    }
  });

  // <!-- слайдер с машинами -->
  const CarSwiper = new Swiper('.car__preview-swiper', {
    slidesPerView: 1,
    loop: true,
  })

  // события смена слайда машин 
  CarSwiper.on('slideChange', function () {
    colorSwiper.slideTo(CarSwiper.realIndex+1)
  });

  //смена цвета по клику на плитку цвета
  let colorList = document.querySelector('.car__color-list')
  let colorItem = document.querySelectorAll('.car__color-item')
  colorList.addEventListener('click', function(e) {
    let target = e.target
    if(target.classList.contains('car__color-item')) {
      changerActive(colorItem)
      target.classList.add('active')
      changeColorSwiperSlide(target)
    }

  })

  //функция создания слайда для мобильного слайдера
  function createColorSwiperSlides(colorItem, swiperWrapper) {

    let name = colorItem.dataset.name
    let imgPath = colorItem.dataset.img
    let color = window.getComputedStyle(colorItem).backgroundColor
    let slide = 
    `<div class="color-swiper__slide swiper-slide" data-name="${name}" data-img=${imgPath}>
      <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M3.5 8.47995V11C3.5 12.3903 4.09111 13.6702 5.08325 14.6876C5.01299 14.6332 4.9466 14.5718 4.88507 14.5035L0.385072 9.50346C-0.169117 8.88769 -0.119199 7.93926 0.496566 7.38507C1.11233 6.83088 2.06077 6.8808 2.61495 7.49657L3.5 8.47995Z" fill="${color}"/>
        <path d="M11.5 2.5V4C11.5 4.27614 11.2761 4.5 11 4.5C10.7239 4.5 10.5 4.27614 10.5 4V1.5C10.5 0.671573 9.82843 0 9 0C8.17157 0 7.5 0.671573 7.5 1.5V4C7.5 4.27614 7.27614 4.5 7 4.5C6.72386 4.5 6.5 4.27614 6.5 4V3C6.5 2.17157 5.82843 1.5 5 1.5C4.17157 1.5 3.5 2.17157 3.5 3V11C3.5 14.3137 6.85786 17 11 17C15.1421 17 18.5 14.3137 18.5 11V4.5C18.5 3.67157 17.8284 3 17 3C16.3435 3 15.7855 3.42173 15.5822 4.00905C15.4918 4.27 15.2761 4.5 15 4.5C14.7239 4.5 14.5 4.27614 14.5 4V2.5C14.5 1.67157 13.8284 1 13 1C12.1716 1 11.5 1.67157 11.5 2.5Z" fill="${color}" />
      </svg>
    </div>`
    swiperWrapper.innerHTML += slide
  }

  //функция создания слайда с фоткой машины
  function createCarSwiperSlides(colorItem, swiperWrapper) {

    let imgPath = colorItem.dataset.img
    let slide = 
    `<div class="car__preview_slide swiper-slide">
      <img src="${imgPath}" alt="car">
    </div>`
    swiperWrapper.innerHTML += slide
  }

  //функция смена цвета по клику на плитку цвета
  function changeColorSwiperSlide(colorItem) {
    let name = colorItem.dataset.name
    let slides = document.querySelectorAll('.color-swiper__slide')
    for(let i = 0; i < slides.length; i++) {
      if(slides[i].dataset.name == name)
        colorSwiper.slideTo(i)
    }
  }

  //функция смены название цвета в заголовке с названием цвета
  function changeTextTitleColor(coloroItem, titleBlock) {
    titleBlock.innerHTML = coloroItem.dataset.name
  }
}

});



// скролл до блока по клику на ticker-swiper__slide 
if(document.querySelectorAll('.ticker-swiper__slide').length) {
  let tickers = document.querySelectorAll('.ticker-swiper__slide')
  for(let i = 0; i < tickers.length; i++) {
    tickers[i].addEventListener('click', function() {
      let id = tickers[i].getAttribute('href')
      id = id.substring(1) 
      let blockToScroll = document.querySelector('[ticker-name="'+id+'"]')
      if(blockToScroll!== null) {
        $('body,html').animate({
          scrollTop: $(blockToScroll).offset().top - 78
        },500);
    }
    })
  }
}


// открытие формы с номером телефона и фио
if(document.querySelectorAll('.open-default-form').length) {
  let btnDefault = document.querySelectorAll('.open-default-form')
  let defaultForm = document.querySelector('.popup-form-default')
  for(let i = 0; i < btnDefault.length; i++) {
    btnDefault[i].addEventListener('click', function(e) {
      e.preventDefault()
      e.stopPropagation();
      defaultForm.classList.add('active')
      bodyScrollLock.disableBodyScroll(defaultForm)
    })
  }
}

//ввод только кириллицы
$('body').on('input', '.input-ru', function(){
	this.value = this.value.replace(/[^а-яё\s]/gi, '');
});

//footer btn credit, call 

// if(document.querySelectorAll('.car__footer-fixed').length) {
//   let carFooterFixed = document.querySelector('.car__footer-fixed')
//   document.addEventListener("scroll", function() {
//     if(window.pageYOffset > 50) {
//       carFooterFixed.classList.add('active')
//     } else {
//       carFooterFixed.classList.remove('active')
//     }
//   })
// }
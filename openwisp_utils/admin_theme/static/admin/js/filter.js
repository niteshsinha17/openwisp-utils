(function () {
  document.addEventListener('DOMContentLoaded', function(){
    initFilterDropdownHandler();
    initSliderHandlers();
    filterHandlers();
  }, false);
})();

function initFilterDropdownHandler(){
  const filters = document.querySelectorAll('.owFilter');
  filters.forEach(function(filter) {
    var toggler = filter.querySelector('.filter-title');
    var options = filter.querySelector('.filter-options')
    toggler.addEventListener('click', function(e){
      e.stopPropagation();
      var activeFilter = document.querySelector('.owFilter.active');
      if(activeFilter){
        activeFilter.classList.remove('active');
      }
      filter.classList.toggle('active');
    })
  })
  document.addEventListener('click',function(e){
    var activeFilter = document.querySelector('.owFilter.active');
    if(!activeFilter || activeFilter.contains(e.target)){
      return
    }
    activeFilter.classList.remove('active');
  })
  const filterRadios = document.querySelectorAll('.filter-options input');
  filterRadios.forEach(function(filterRadio){
    filterRadio.addEventListener('change', function(){
      let filter = document.querySelector('.owFilter.active');
      let view = document.querySelector('.owFilter.active .selected-option');
      let selectedElement = document.querySelector('.owFilter.active .selected');
      selectedElement.classList.remove('selected');
      filterRadio.previousElementSibling.classList.add('selected');
      view.innerHTML = filterRadio.previousElementSibling.innerHTML;
    })
  })
}

function ButtonAnimation(button){
  // Animates button by adding and removing classes
  button.classList.add('down');
    setTimeout(function() {
    button.classList.remove('down')
  },300)
}

function initSliderHandlers(){
  let leftArrow = document.querySelector('.left-arrow');
  let rightArrow = document.querySelector('.right-arrow');
  let slider =  document.querySelector('.owFilterSlider');
  // When left arrow is clicked
  leftArrow.addEventListener('click', function() {
    ButtonAnimation(leftArrow);
    slider.scrollLeft-='200';

  })
  // When right arrow is clicked
  rightArrow.addEventListener('click', function(){
    ButtonAnimation(rightArrow);
    slider.scrollLeft+='200';
  })
}

function filterHandlers(){
  document.querySelector('#ow-apply-filter').addEventListener('click', function (e) {
    const selectedInputs = document.querySelectorAll('.filter-options input:checked');
  //  create params map
    var path = window.location.href.split('?');
    var paramsMap ={}
    if(path.length>1){
      path[1].split('&').map(function(param){
        const [name,val] = param.split('=');
        paramsMap[name]=val
      })
    }
    console.log(paramsMap);
    var qs = {...paramsMap}
    selectedInputs.forEach(function (selectedInput){
      let value = selectedInput.value;
      let currParamsMap={}
      value.substring(1).split('&').forEach(function (param){
        if(param!=""){
          let [name,val] = param.split('=');
          currParamsMap[name] = val}
      });
      console.log(currParamsMap);
      Object.keys(paramsMap).forEach(function(key){
        if(key in qs){
          if(key in currParamsMap){
            if(currParamsMap[key] != paramsMap[key]){
              qs[key] = currParamsMap[key];
            }
          }
          else{
            delete qs[key]
          }
        }
        delete currParamsMap[key]

      })
      Object.keys(currParamsMap).forEach(function(key){
        qs[key] = currParamsMap[key]
      })
    })
    console.log(qs);
    // console.log(window.location.pathname+(Object.keys(qs).length?'?'+Object.keys(qs).map(q=>q).join('&'):''));
    window.location.href = window.location.pathname+(Object.keys(qs).length?'?'+Object.keys(qs).map(q=>`${q}=${qs[q]}`).join('&'):'')
  })
}
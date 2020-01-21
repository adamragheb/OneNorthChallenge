const wrapper = $('#rootList');
const userList = document.querySelector('#rootList');
const namesApp = {
  init: () => {
    namesApp.namesFunc();
    namesApp.sortNames();
  },
  namesFunc: () => {
    $.ajax({
      url: 'https://tech-challenge-db-output.herokuapp.com/api/people?sort=asc&page=1',
      type: 'GET',
      dataType: 'json',
      success: (result) => {
        namesApp.resultsFunc(result);
      }
    })
  },
  resultsFunc: (evt) => {
    var start = 0;
    var limit = 4;
    let btn = document.querySelector('button');
    let errorMsg = document.querySelector('.error_msg');

    function createResults() {
      var counter = 1;
      for (var i = start; i <= limit; i++) {
        if (i <= evt.length - 1) {
          let template = '';
          template += '<li>'
          template += '<span style="font-weight: 700">Name: '
          template += '</span>'
          template += `${evt[i].firstName} ${evt[i].lastName}`;
          template += '</li>'
          showResults(template, counter);
          counter++;
          if (limit > 4) {
            changeHeight()
          }
          //console.log(evt[i].firstName)
        } else {
          btn.setAttribute('disabled', '');
          errorMsg.classList.add('active');
          errorMsg.classList.remove('deactivated');
          setTimeout(() => {
            errorMsg.classList.remove('active');
            errorMsg.classList.add('deactivated');
          }, 2500, errorMsg);
        }
      }
      start += 5;
      limit += 5;
    }

    function changeHeight() {
      userList.style.height = userList.offsetHeight + 140 + 'px';
    }

    function loadMoreNames() {
      btn.addEventListener('click', () => {
        //console.log('load more names');
        createResults();
        //changeHeight();
      })
    }

    function showResults(template, counter) {
      setTimeout(() => {
        wrapper.append(template)
      }, 100 * counter)
    }
    loadMoreNames();
    createResults();
  },
  sortNames: function () {
    function sortingAscDesc() {
      var optAtt = sortSelect.options[sortSelect.selectedIndex].getAttribute('sort');
      var newArray = [];

      var listItems = userList.querySelectorAll('li');

      for (i = 0; i < listItems.length; i++) {
        newArray.push(listItems[i].textContent);
      }
      if (optAtt === 'asc') {
        console.log("sort Ascending")
        newArray.sort(function (a, b) {
          var nameA = a.toUpperCase();
          var nameB = b.toUpperCase();
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
        })
      }
      if (optAtt === 'desc') {
        console.log("sort Descending")
        newArray.sort(function (a, b) {
          var nameA = a.toUpperCase();
          var nameB = b.toUpperCase();
          if (nameA < nameB) {
            return 1
          }
          if (nameA > nameB) {
            return -1
          }
        });
      }

      userList.innerHTML = "";
      for (i = 0; i < newArray.length; i++) {
        //console.log(newArray[i].replace(/Name: /g, ''))
        userList.innerHTML += `<li>
        <span style="font-weight: 700">Name: </span>
        ${newArray[i].replace(/Name: /g, '')}</li>`;
      }
    }

    let sortSelect = document.querySelector('#sortList');
    sortSelect.addEventListener('change', _ => {
      sortingAscDesc()
    })
  }
};

document.addEventListener('DOMContentLoaded', _ => {
  namesApp.init();
})
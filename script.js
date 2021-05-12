$(document).ready(function(){
  $("#btnSrch").click(function(){
    var metro = $("#metro").val();
    if (metro==''){
      alert("Ошибка. Вы ничего не ввели. ");
    }
    else{
      $('#load').css('display', 'block');
      metro = metro.replace(/\s/g,'+');
      var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/metro";
      var token = "a6ba004f0c293213a42398cc000981e2549b74aa";
      var query = metro;
      var sity = '';
      var opennes = '';



      if ($('input[name=radios]:checked', '#mainForm').val()=="Msc"){
        sity = ''+7700000000000;
      }
      if ($('input[name=radios]:checked', '#mainForm').val()=="Spb"){
        sity = ''+7800000000000;
      }
      if ($('input[name=radios]:checked', '#mainForm').val()=="All"){
        sity = '';
      }


      if ($('select[name=msec]', '#mainForm').val()=="all"){
        opennes = '';
      }
      if ($('select[name=msec]', '#mainForm').val()=="open"){
        opennes = false;
      }
      if ($('select[name=msec]', '#mainForm').val()=="close"){
        opennes = true;
      }


      var options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token " + token
                },
      body: JSON.stringify({query: query, "filters": [
        {
            "city_kladr_id": sity,
            "is_closed": opennes
        }
    ]})
                    }
      $("#result").empty();
      var name = '';

      fetch(url, options)
      .then(response => response.text())
      .then(result => {
        var info = JSON.parse(result);
        console.log(info);
        if (info.suggestions.length==0) {
          alert("Ничего не найдено. Попробуйте иной ввод. ")
        }
        // ПОлучение и вывод Name (Навзание станции)
        for (let i = 0; i<info.suggestions.length; i++){
          var color = '#'+info.suggestions[i].data.color;
          name = '<div class="mrg">' + info.suggestions[i].data.name+'<b style="color:'+color+'"> ('+info.suggestions[i].data.line_name+')</b></div>';
          var doc = document.getElementById('result');
          var elem = document.createElement('div');
          elem.innerHTML = name;
          doc.appendChild(elem);
          var b = document.createElement('br');
          doc.appendChild(b);
        }
        $('#load').css('display', 'none');

      })
      .catch(error => alert("Ошибка."));
      //$('#result').append(output);

      }

  })
});

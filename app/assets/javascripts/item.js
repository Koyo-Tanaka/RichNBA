$(function(){

  var itemhover_flg = true

  //トップページスクロール時非同期商品読込
  var site_page = 1
  $(window).on('load scroll', function () {
    var scrollHeight= $(document).height(),
        scrollPosition = $(window).height() + $(window).scrollTop(),
        scrollRatio = (scrollHeight - scrollPosition) / scrollHeight;
    if (scrollRatio <= 0.01) {
      site_page += 1
      $.ajax({
        url: '/item/additem',
        type: 'GET',
        data: {
          url: site_page
        },
        dataType: 'json'
      }).done(function(data){
          /* 通信成功時 */
          $.each(data[0], function(index, item){
            if(data[1].indexOf(item.id) >= 0){
              var checkitem = '<i class="fas fa-clipboard-check yet_check"></i>'
            }else{
              var checkitem = '<i class="far fa-clipboard not_check"></i>'
            }
            var add_item = 
                          '<div class="main_category_items add">'+
                            '<a href='+item.siteurl+' target="_blank">'+
                              '<img src='+item.imageurl+'>'+
                              '<div class="main_category_items_cover">'+
                                '<div class="main_category_items_cover_item">'+
                                  '<div class="main_category_items_cover_item_name">'+
                                    '<p>'+item.name+'</p>'+
                                  '</div>'+
                                  '<div class="main_category_items_cover_item_check">'+
                                    '<div class="main_category_items_cover_item_check_circle">'+checkitem+'</div>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="main_category_items_cover_bottom"><i class="fas fa-bars"></i></div>'+
                              '</div>'+
                            '</a>'+
                            '<div class="main_category_items_detail">'+
                            '¥'+item.price.toLocaleString()+
                            '</div>'+
                          '</div>'
            $('.main_category.2').append(add_item);
          }) 
      }).fail(function(data){
          /* 通信失敗時 */
          // alert("失敗");
      });
    }
  });

  //個別商品取り置きアイコン(取り置きページ)押下時非同期通信
  $(document).on("click",".mypage_main_checkitem .main_category_items_cover_item_name i",function(){
    $(this).parent().parent().parent().parent().parent().remove();
    event.preventDefault();
    itemhover_flg = false
    var checkitem_flg = false
    var siteurl = $(this).parent().parent().parent().parent().parent().find("a").attr("href");
    $.ajax({
      url: '/item/checkitem',
      type: 'GET',
      data: {
        check: checkitem_flg,siteurl: siteurl
      },
      dataType: 'json'
    })
  })
  //個別商品取り置きアイコン(メイン)押下時非同期通信
  $(document).on("click",".main_category_items_cover_item_check_circle",function(){
    event.preventDefault();
    itemhover_flg = false
    var checkitem_flg
    var siteurl = $(this).parent().parent().parent().parent().parent().find("a").attr("href");
    if($(this).find("i").attr("class") == "far fa-clipboard not_check"){
      $(this).find("i").attr("class","fas fa-clipboard-check yet_check")
      checkitem_flg = true
    }else{
      $(this).find("i").attr("class","far fa-clipboard not_check")
      checkitem_flg = false
    }
    $.ajax({
      url: '/item/checkitem',
      type: 'GET',
      data: {
        check: checkitem_flg,siteurl: siteurl
      },
      dataType: 'json'
    })
  })

  //商品クリック数(ヘッダー)非同期増加
  $(document).on("click", ".head_right_top_logo_hover_goods a", function () {
    var siteurl = $(this).attr("href");
    $.ajax({
      url: '/item/click',
      type: 'GET',
      data: {
        url: siteurl
      },
      dataType: 'json'
    })
  })
  //商品クリック数(メイン)非同期増加
  $(document).on("click", ".main_category_items a", function () {
    if(itemhover_flg == true){
      var siteurl = $(this).attr("href");
      $.ajax({
        url: '/item/click',
        type: 'GET',
        data: {
          url: siteurl
        },
        dataType: 'json'
      })
    }else{
      itemhover_flg = true
    }
  })

  //「商品名を表示する」押下で全商品名表示
  $('.main_category p input').change(function() {
    var judge = $(this).prop('checked');
    if(judge == true){
      $(".main_category_items_cover_item").css("transition","0.5s ease-in-out");
      $(".main_category_items_cover_item").css("opacity","1.0");
      $(".main_category_items_cover_item").css("height","92%");
    }else{
      $(".main_category_items_cover_item").css("opacity","0");
      $(".main_category_items_cover_item").css("height","0px");
    }
    
})

  //商品ホバー時商品名表示
  $(document).on('mouseenter','.main_category_items_cover',function(){
    $(this).find(".main_category_items_cover_item").css("transition","0.5s ease-in-out");
    $(this).find(".main_category_items_cover_item").css("opacity","1.0");
    $(this).find(".main_category_items_cover_item").css("height","92%");
  });
  $(document).on('mouseleave','.main_category_items_cover',function(){
    $(this).find(".main_category_items_cover_item").css("opacity","0");
    $(this).find(".main_category_items_cover_item").css("height","0px");
  });
  
})
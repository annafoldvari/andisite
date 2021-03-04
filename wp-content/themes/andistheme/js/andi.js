(function($) {
  $(function () {

    // Setup header navigation background effect on scroll
    $(document).scroll(function () {
      var $nav = $("header nav");
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });

    // Setup "my works" tab switching
    $('#myworks .myworks-nav li').click(function() {
      var tab_id = $(this).data('tab');
      var $tab = $('#' + tab_id);
      if (!$tab.is(':visible')) {
        $('#myworks .myworks-tab').hide();
        $tab.show();
      }
    });
    $('#myworks .myworks-tab:not(:first)').hide();
  });

  // Generate gallery HTML
  $video_editing_container = $('#myworks-video-editing');
  $video_production_container = $('#myworks-video-production');
  $animation_container = $('#myworks-animation');
  $photography_container = $('#myworks-photography');

  for (var i=0; i < gallery_items.length; i++) {
    var elem = gallery_items[i];
    if (elem.category == 'video_editing') {
      $video = $(`
        <div class="video" style="background-image: url(${elem.placeholder})">
          <div class="video-info gallery-item" data-html='${elem.html}' data-index='${elem.index}' data-category='${elem.category}'>
            <h5>${elem.title}</h5>
            <p>${elem.type} - ${elem.role}</p>
            <p>${elem.description}</p>
          </div>
        </div>
      `); 
    $video_editing_container.append($video);     
    } else if (elem.category == 'video_production') {
      $video2 = $(`
        <div class="video" style="background-image: url(${elem.placeholder})">
          <div class="video-info gallery-item" data-html='${elem.html}' data-index='${elem.index}' data-category='${elem.category}'>
            <h5>${elem.title}</h5>
            <p>${elem.type} - ${elem.role}</p>
            <p>${elem.description}</p>
          </div>
        </div>
      `);
      $video_production_container.append($video2);  
    } else if (elem.category == 'animation') {
      $video3 = $(`
        <div class="video" style="background-image: url(${elem.placeholder})">
          <div class="video-info gallery-item" data-html='${elem.html}' data-index='${elem.index}' data-category='${elem.category}'>
            <h5>${elem.title}</h5>
            <p>${elem.description}</p>
          </div>
        </div>
      `);
      $animation_container.append($video3);
    } else if (elem.category == 'photo') {
      $photo = $(`
      <div class="photo gallery-item" style="background-image: url(${elem.url})" data-html='${elem.html}' data-index='${elem.index}' data-category='${elem.category}'>
      </div>  
    `);
      $photography_container.append($photo);
    }
  }

  $('.gallery-item').click(function() {
      var extra_window = $("<div class='lightbox'><div class='outerframe'><i class='fas fa-times closing-icon'></i><i class='fas fa-arrow-left prev-icon'></i><i class='fas fa-arrow-right next-icon'></i></div></div>");
      var outerframe = extra_window.find('.outerframe');
      var embeded_item = $(this).data('html');
      outerframe.append(embeded_item);
      $('body').append(extra_window);

      var original_index = parseInt($(this).data('index'))
      var category = $(this).data('category');

      outerframe.find('.closing-icon').click(function() {
        extra_window.remove();
      })

      var next_index = original_index;

      var category_array = gallery_items.filter(function(video) {
        return video.category == category;
      })

      if (original_index == 0) {
        outerframe.find('.prev-icon').addClass('disabled');
      }

      if (original_index == (category_array.length - 1)) {
        outerframe.find('.next-icon').addClass('disabled');
      }

      outerframe.find('.next-icon').click(function() {

        $('.prev-icon').removeClass('disabled');
        
        if((next_index + 1) >= category_array.length) {
          return;
        }
        
        
        next_index++;
      
        for(var i = 0; i < gallery_items.length; i++) {
          var element = gallery_items[i]
          if (element.index == next_index && element.category == category) {
            var current_element;
            if (category != 'photo') {
              current_element = outerframe.find('iframe');
            } else {
              current_element = outerframe.find('img');
            }
            var next_element = element.html
            current_element.remove();
            outerframe.append(next_element); 
          }       
        }

        if((next_index + 1) >= category_array.length) {
          $('.next-icon').addClass('disabled');
        }
      })

      outerframe.find('.prev-icon').click(function() {
        
        $('.next-icon').removeClass('disabled');

        if((next_index - 1) < 0) {
          return;
        }
        
        
        next_index--;
      
        for(var i = 0; i < gallery_items.length; i++) {
          var element = gallery_items[i]
          if (element.index == next_index && element.category == category) {
            var current_element;
            if (category != 'photo') {
              current_element = outerframe.find('iframe');
            } else {
              current_element = outerframe.find('img');
            }
            var next_element = element.html
            current_element.remove();
            outerframe.append(next_element); 
          }       
        }

        if((next_index - 1) < 0) {
          $('.prev-icon').addClass('disabled');
        }
      })
  });

})(jQuery);
if(typeof(console) === 'undefined'){var console = {};console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function() {};}

logPyxis = {
  contentMode: 'link',
  
  setContentMode: function(m) {
    this.contentMode = m;
    if (this.contentMode == 'link') {
      $('#link').show();
      $('#comments').hide();
    }
    else {
      $('#link').hide();
      $('#comments').show();
    }
    console.log('set content mode to '+m);
  },
  
  updateContent: function(el) {
    var a = $(el).find('a')[0];
    console.log(a);
    setTimeout(function(){ frames['link'].location = a.href; }, 0);
    setTimeout(function(){ frames['comments'].location = ['http://news.ycombinator.com/item?id=', $(a).data('id')].join(''); }, 0);
  },
  
  fetch: function() {
    $.ajax({
      dataType: 'jsonp',
      url: 'http://api.ihackernews.com/page?format=jsonp',
      success: Pyxis.callback,
    });
  },
  
  callback: function(data, textStatus, xhr) {
    if (!data) return;
    var h = $('#menu ul')[0];
    $.each(data.items, function(i, item) {
      $(h).append(['<li><a href="', item.url, '" data-id="', item.id, '">', item.title, '</a><br><small>', item.points, ' points, ', item.commentCount, ' comments</small></li>'].join(''));
    });
  }
};

$(document).ready(function(){
  Pyxis.setContentMode('link');
  $('#nav a').click(function(e){
    Pyxis.setContentMode(this.id.substr(2));
    e.preventDefault();
  });
  $('#menu li').live('click', function(e){
    Pyxis.updateContent($(this));
    e.preventDefault();
  });
  Pyxis.fetch();
});

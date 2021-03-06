(function(){

  Penny.ready(function(){
    
    var generateUniqueElementId = function(doc, page) {
      var i = 1;
      var id = doc + '-p' + page + '-i' + i;
      while (document.getElementById(id)) {
        id = id.replace(/-i[0-9]+$/, '-i' + i++);
      }
      return id;
    };

    var enhanceStubs = function() {
      var stubs = document.querySelectorAll('.DC-embed-stub');
      Penny.forEach(stubs, function (stub, i) {
        var href        = stub.querySelector('a').getAttribute('href');
        // TODO: Recognize resource type based on URL pattern and load 
        //       appropriate embed mechanism.
        var components  = href.match(/\/documents\/([A-Za-z0-9-]+)\.html\#document\/p([0-9]+)$/);
        var document_id = components[1];
        var page_number = components[2];
        var element_id  = generateUniqueElementId(document_id, page_number);

        stub.className = 'DC-embed';
        stub.setAttribute('id', element_id);

        DocumentCloud.embed.loadPage('https://www.documentcloud.org/documents/' + document_id + '.json', {
          page:      page_number,
          container: '#' + element_id
        });

      });
    };

    if (window.DocumentCloud) {
      enhanceStubs();
    } else if (!document.querySelector('script[src$="page_embed.js"]')) {
      var page_embed_js = document.createElement('script');
      page_embed_js.src = "dist/page_embed.js";
      Penny.on(page_embed_js, 'load', enhanceStubs);
      document.querySelector('body').appendChild(page_embed_js);
    }
  });

})();

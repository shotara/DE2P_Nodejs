module.exports = function() {
  var route = require('express').Router();

  route.get('/editor/ckeditor', function(rep,res) {
    res.render('editor/ckeditor_4.6.2_full_codemirror/ckeditor/samples/index');
  });

  // codemirror Test
  route.get('/editor/codemirror', function(rep,res) {
    res.render('editor/ckeditor_4.6.2_full_codemirror/ckeditor/plugins/codemirror-5.23.0/mode/clike/index');
  });

  return route;
}

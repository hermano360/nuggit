function activateAR () {
  var _scanner = document.getElementById('scanner');
  console.log('hiding the madness', _scanner);

  var _wrapper = document.getElementById('wrapper');
  _wrapper.classList.add('fade-out');
  // _wrapper.style.visibility = 'hidden';


  var _arStuff = document.createElement('div');
  _arStuff.setAttribute('id', 'container');
  console.log('document', document);
  document.body.appendChild(_arStuff);

  var _script = document.createElement('script');
  _script.setAttribute('type', 'text/javascript');
  _script.setAttribute('src', 'index.js');
  document.head.appendChild(_script);
}
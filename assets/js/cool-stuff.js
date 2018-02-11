function activateAR () {
  var _scanner = document.getElementById('scanner');
  console.log('hiding the madness');

  var _wrapper = document.getElementById('wrapper');
  _wrapper.classList.add('fade-out');


  var _arStuffContainer = document.createElement('div');
  _arStuffContainer.setAttribute('id', 'container');

  var _arStuffIndicator = document.createElement('div');
  var _arStuffIndicatorText = document.createTextNode('a');

  _arStuffIndicator.appendChild(_arStuffIndicatorText);
  _arStuffContainer.appendChild(_arStuffIndicator);
  document.body.appendChild(_arStuffContainer);

  var _script = document.createElement('script');
  _script.setAttribute('type', 'text/javascript');
  _script.setAttribute('src', 'index.js');
  document.head.appendChild(_script);
}
var renderer,
    scene,
    camera,
    container,
    state="";

var arSource,
    arContext,
    arMarker = [];

var
    mesh,
    sprite;

init();

function init(){

    container = document.getElementById('container');

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    scene = new THREE.Scene();
    camera = new THREE.Camera();

    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);
    scene.add(camera);
    // scene.visible = false;



    // material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture("assets/data/ARtangie2.png") });
    // mesh = new THREE.Mesh(new THREE.PlaneGeometry( 5, 5, 5 ), material);
    //
    //
    // scene.add(mesh);


    material = new THREE.SpriteMaterial( { map: THREE.ImageUtils.loadTexture( "assets/data/ARtangie2.png" ), color: 0xffffff, fog: true } );
    sprite = new THREE.Sprite( material );
    scene.add( sprite );





    arSource = new THREEx.ArToolkitSource({
        sourceType : 'webcam',
    });

    arContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: './assets/data/camera_para.dat',
        detectionMode: 'mono',
    });

    arMarker[0] = new THREEx.ArMarkerControls(arContext, camera, {
        type : 'pattern',
        patternUrl : './assets/data/patt.hiro',
        changeMatrixMode: 'cameraTransformMatrix'
    });

    arMarker[0].addEventListener('markerFound', function(){

      if(state !== 'gsc'){
        material = new THREE.SpriteMaterial( { map: THREE.ImageUtils.loadTexture( "assets/data/gsc.png" ), color: 0xffffff, fog: true } );
        sprite = new THREE.Sprite( material );
        scene.children[1] = sprite
        console.log(scene.children)
        state = 'gsc'
      }

    })

    arMarker[1] = new THREEx.ArMarkerControls(arContext, camera, {
        type : 'pattern',
        patternUrl : './assets/data/u4bi.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    });

    arMarker[1].addEventListener('markerFound', function(){
      if(state !== 'weird'){
        material = new THREE.SpriteMaterial( { map: THREE.ImageUtils.loadTexture( "assets/data/ARtangie2.png" ), color: 0xffffff, fog: true } );
        sprite = new THREE.Sprite( material );
        scene.children[1] = sprite
        state = 'weird'
      }

    })

    arMarker[2] = new THREEx.ArMarkerControls(arContext, camera, {
        type : 'pattern',
        patternUrl : './assets/data/pattern-marker5.patt',
        changeMatrixMode: 'cameraTransformMatrix'
    });





    /* handle */
    arSource.init(function(){
        arSource.onResize();
        arSource.copySizeTo(renderer.domElement);

        if(arContext.arController !== null) arSource.copySizeTo(arContext.arController.canvas);

    });

    arContext.init(function onCompleted(){

        camera.projectionMatrix.copy(arContext.getProjectionMatrix());

    });


    render();

}



function render(){
    requestAnimationFrame(render);
    renderer.render(scene,camera);

    if(arSource.ready === false) return;

    arContext.update(arSource.domElement);
    scene.visible = camera.visible;


    // mesh.rotateX(.1);

}

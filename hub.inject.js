import * as moment from "moment"

AFRAME.registerSystem('clock', {
	init: function () {
		this.clockR = 2
		const clockGeo = new THREE.CircleGeometry(this.clockR, 12);
		const clockMat = new THREE.MeshBasicMaterial( { color: 'skyblue' } );
		const clock = new THREE.Mesh( clockGeo, clockMat );
		clock.position.set(0,5,-10)
		this.el.object3D.add( clock );

		this.secHandLen= 1.7
		this.minHandLen = 1.3
		this.hourHandLen= 1

		const markmat = new THREE.LineBasicMaterial( { color: 'black' } );
		const points1 = [new THREE.Vector3(0,this.secHandLen,0), new THREE.Vector3(0,this.clockR,0)]
		const mark1geo = new THREE.BufferGeometry().setFromPoints( points1 );
		const line1 = new THREE.Line(mark1geo, markmat);
		clock.add(line1);

		const points2 = [new THREE.Vector3(this.secHandLen,0,0), new THREE.Vector3(this.clockR,0,0)]
		const mark2geo = new THREE.BufferGeometry().setFromPoints( points2 );
		const line2 = new THREE.Line(mark2geo, markmat);
		clock.add(line2);

		const points3 = [new THREE.Vector3(0,-this.secHandLen,0), new THREE.Vector3(0,-this.clockR,0)]
		const mark3geo = new THREE.BufferGeometry().setFromPoints( points3 );
		const line3 = new THREE.Line(mark3geo, markmat);
		clock.add(line3);

		const points4 = [new THREE.Vector3(-this.secHandLen,0,0), new THREE.Vector3(-this.clockR,0,0)]
		const mark4geo = new THREE.BufferGeometry().setFromPoints( points4 );
		const line4 = new THREE.Line(mark4geo, markmat);
		clock.add(line4);

		const secMat = new THREE.LineBasicMaterial( { color: 'white' } );
		const secPs = new Float32Array( 2 * 3 );
		for (let i = 0; i < 6; i++) {
			secPs[i] = 0;
		}
		secPs[4] = this.secHandLen;
		const secGeo = new THREE.BufferGeometry().setFromPoints( secPs );
		secGeo.addAttribute( 'position', new THREE.BufferAttribute( secPs, 3 ) );
		const second = this.second = new THREE.Line( secGeo, secMat );
		clock.add(second);

		const hourMat = new THREE.LineBasicMaterial( { color: 'black'} );
		const hourPs = new Float32Array( 2 * 3 );
		for (let i = 0; i < 6; i++) {
			hourPs[i] = 0;
		}
		hourPs[4] = this.hourHandLen;

		const hourGeo = new THREE.BufferGeometry().setFromPoints( hourPs );
		hourGeo.addAttribute( 'position', new THREE.BufferAttribute( hourPs, 3 ) );
		const hour = this.hour = new THREE.Line( hourGeo, hourMat );
		clock.add(hour);

		const minMat = new THREE.LineBasicMaterial( { color: 'gray' } );
		const minPs = new Float32Array( 2 * 3 );
		for (let i = 0; i < 6; i++) {
			minPs[i] = 0;
		}
		minPs[4] = this.minHandLen;

		const minGeo = new THREE.BufferGeometry().setFromPoints( minPs );
		minGeo.addAttribute( 'position', new THREE.BufferAttribute( minPs, 3 ) );
		const minute = this.minute = new THREE.Line( minGeo, minMat );
		clock.add(minute);
	},
	tick() {
		const s = moment().zone("America/New_York").second();
		const m = moment().zone("America/New_York").minute();
		const h = moment().zone("America/New_York").hour();
		// console.log(s)
		this.updateSec(s);
		this.second.geometry.attributes.position.needsUpdate = true; 
		this.updateMin(m);
		this.minute.geometry.attributes.position.needsUpdate = true; 
		this.updateHour(h,m);
		this.hour.geometry.attributes.position.needsUpdate = true; 
	},

	updateSec(s) {
		const pos = this.second.geometry.attributes.position.array;
		const x = s/30*Math.PI;
		pos[3] = this.secHandLen*Math.sin(x);
		pos[4] = this.secHandLen*Math.cos(x);
	},

	updateHour(h, m) {
		const pos = this.hour.geometry.attributes.position.array;
		const x = (h*60 + m)/360*Math.PI;
		pos[3] = this.hourHandLen*Math.sin(x);
		pos[4] = this.hourHandLen*Math.cos(x);
	},

	updateMin(m) {
		const pos = this.minute.geometry.attributes.position.array;
		const x = m/30*Math.PI;
		pos[3] = this.minHandLen*Math.sin(x);
		pos[4] = this.minHandLen*Math.cos(x);
	}
});

AFRAME.registerSystem('posters', {
	init: function() {
	  var inbloc = this.inbloc = false;
	  var k = this.k = 10; //number of posters in a row
	  var gap = this.gap = 10; //gap b/w each poster
	  var loader = this.loader = new THREE.TextureLoader();
	  var material = new THREE.MeshBasicMaterial({
	  map: loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/data/100-img-atlas.jpg')
	  });
	  var blocks = this.blocks = [];
	  var image = {width: 128, height: 128};
	  var atlas = {width: 1280, height: 1280, cols: 10, rows: 10};

	  for (var j=0; j<2; j++) {
		for (var i = 0; i < k; i ++) {
		  var coords = {
			x: i*(image.width+gap),
			y: 0,
			z: 0 - j * 200
		  };
		  var geometry = new THREE.Geometry();
		  
		  geometry.vertices.push(
			new THREE.Vector3(
			coords.x,
			coords.y,
			coords.z
			),
			new THREE.Vector3(
			coords.x + image.width,
			coords.y,
			coords.z
			),
			new THREE.Vector3(
			coords.x + image.width,
			coords.y + image.height,
			coords.z
			),
			new THREE.Vector3(
			coords.x,
			coords.y + image.height,
			coords.z
			)
		  );
		  var faceOne = new THREE.Face3(
			geometry.vertices.length-4,
			geometry.vertices.length-3,
			geometry.vertices.length-2
		  )
		  var faceTwo = new THREE.Face3(
			geometry.vertices.length-4,
			geometry.vertices.length-2,
			geometry.vertices.length-1
		  )
		  geometry.faces.push(faceOne, faceTwo);
		  
		  var xOffset = i*(image.width / atlas.width);
		  var yOffset = j*(image.height / atlas.height);
		  
		  geometry.faceVertexUvs[0].push([
			new THREE.Vector2(xOffset, yOffset),
			new THREE.Vector2(xOffset+.1, yOffset),
			new THREE.Vector2(xOffset+.1, yOffset+.1)
		  ]);

		  geometry.faceVertexUvs[0].push([
			new THREE.Vector2(xOffset, yOffset),
			new THREE.Vector2(xOffset+.1, yOffset+.1),
			new THREE.Vector2(xOffset, yOffset+.1)
		  ]);
		  var block = new THREE.Mesh(geometry, material)
		  block.position.set(-2, 1, 0);
		  block.scale.set(0.02,0.02,0.02);
		  blocks.push(block);
		  this.el.object3D.add(blocks[blocks.length-1])
		}
	  }
	  // console.log(this.el.object3D.children[0].position)
	},
	tick: function() {
	  var pos = this.el.object3D.children[0].position;
	  if (this.inbloc == false && pos.x > -1 && pos.x < 1) {
		  console.log(pos.x)
		  console.log("enter")
		  this.loadPoster(0,0);
		  this.inbloc = true;
	  }
	  if (this.inbloc == true && (pos.x < -1 || pos.x > 1)) {
		  console.log(pos.x)
		  console.log("leave")
		  this.leave(0,0);
		  this.inbloc = false;
	  }
	},
	loadPoster(i, j) {
	  //i,j coords of the poster
	  this.blocks[i+j*this.k].visible = false;
	  var mat1 = new THREE.MeshBasicMaterial({
		  map: this.loader.load('https://s3.amazonaws.com/duhaime/blog/tsne-webgl/data/100-img-atlas.jpg')
	  });
	  var geo1 = new THREE.PlaneGeometry( 2.56, 2.56);
	  var plane = new THREE.Mesh(geo1, mat1);
	  plane.position.set(-0.72 + i*2.76, 1+1.28, 0 - j* 4);
	  this.el.object3D.add(plane);
	},
	leave(i, j) {
	  this.el.object3D.remove(this.el.object3D.children[this.el.object3D.children.length -1]);
	  this.blocks[i+j*this.k].visible = true;
	}
});
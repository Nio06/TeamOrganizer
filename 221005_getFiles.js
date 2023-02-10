fin = {};

fin.downloadTextFile = function (txt, name = 'file.json') {
	let txtAry = [txt];
	let txtBlob = new Blob(txtAry);
  	let blobUrl = URL.createObjectURL(txtBlob);
  	let link = document.createElement("a");

	link.href = blobUrl;
  	link.download = name;

  	document.body.appendChild(link);

  	link.dispatchEvent(
    	new MouseEvent('click', {
      	  bubbles: true,
      	  cancelable: true,
     	   view: window
		})
  	);

  	document.body.removeChild(link);
  	URL.revokeObjectURL(blobUrl);
}

fin.uploadTextFile = function (){
	const [file] = document.querySelector("#gFile").files;
	let frd = new FileReader();
	frd.onload = function(){
		data_unbundleData(frd.result);
	};
	frd.readAsText(file);
	file.value = '';
}

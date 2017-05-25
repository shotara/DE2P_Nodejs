var replaceall = require("replaceall");

exports.saveSession = function(map, req, res) {

  req.session.deepMemberNo = map.sessionMemberNo;
  req.session.deepMemberLevel = map.sessionMemberLevel;
  req.session.deepMemberImage = map.sessionMemberImage;
  //
  // req.session.save(function(){
  //   return;
  // });
}

exports.serversideXSS =function(data){
  //
	// replaceall(/</g,"&lt;",data);
  // replaceall(/>/g,"&gt;",data);
	// replaceall(/\\/g, "&#40;",data);
  // replaceall(/\\/g, "&#41;",data);
	// replaceall(/'/g, "&#39;",data);
	// replaceall(/"/g, "&#34;",data);
	// replaceall("eval\\((.*)\\)", "",data);
	// replaceall("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"",data);
	// replaceall(/script/g, "",data);
	// replaceall(/javascript/g, "x-javascript",data);
	// replaceall(/script/g, "x-script",data);
	// replaceall(/iframe/g, "x-iframe",data);
	// replaceall(/document/g, "x-document",data);
	// replaceall(/vbscript/g, "x-vbscript",data);
	// replaceall(/applet/g, "x-applet",data);
	// replaceall(/embed/g, "x-embed",data);  // embed 태그를 사용하지 않을 경우만
	// replaceall(/object/g, "x-object",data);    // object 태그를 사용하지 않을 경우만
	// replaceall(/frame/g, "x-frame",data);
	// replaceall(/grameset/g, "x-grameset",data);
	// replaceall(/layer/g, "x-layer",data);
	// replaceall(/bgsound/g, "x-bgsound",data);
	// replaceall(/alert/g, "x-alert",data);
	// replaceall(/onblur/g, "x-onblur",data);
	// replaceall(/onchange/g, "x-onchange",data);
	// replaceall(/onclick/g, "x-onclick",data);
	// replaceall(/ondblclick/g, "x-ondblclick",data);
	// replaceall(/enerror/g, "x-enerror",data);
	// replaceall(/onfocus/g, "x-onfocus",data);
	// replaceall(/onload/g, "x-onload",data);
	// replaceall(/onmouse/g, "x-onmouse",data);
	// replaceall(/onscroll/g, "x-onscroll",data);
	// replaceall(/onsubmit/g, "x-onsubmit",data);
	// replaceall(/onunload/g, "x-onunload",data);

	return data;
}

exports.parameterCheck =function(data){

  for(var i in data) {
    var temp = data[i].toString();
    if(temp == "") {
      return false;
    }

    if(temp =="null") {
      return false;
    }

    if(temp == null) {
      return false;
    }
  }

	return true;
}

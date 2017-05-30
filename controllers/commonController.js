
exports.saveSession = function(map, req, res) {

  req.session.deepMemberNo = map.sessionMemberNo;
  req.session.deepMemberLevel = map.sessionMemberLevel;
  req.session.deepMemberImage = map.sessionMemberImage;
  req.session.deepMemberUid = map.sessionMemberUid;

  //
  // req.session.save(function(){
  //   return;
  // });
}

exports.serversideXSS =function(data){

  data.replace(/</g,"&lt;");
  data.replace(/>/g,"&gt;");
  data.replace(/\\/g, "&#40;");
  data.replace(/\\/g, "&#41;");
  data.replace(/'/g, "&#39;");
  data.replace(/"/g, "&#34;");
  data.replace("eval\\((.*)\\)", "");
  data.replace("[\\\"\\\'][\\s]*javascript:(.*)[\\\"\\\']", "\"\"");
  data.replace(/script/g, "");
  data.replace(/javascript/g, "x-javascript");
  data.replace(/script/g, "x-script");
  data.replace(/iframe/g, "x-iframe");
  data.replace(/document/g, "x-document");
  data.replace(/vbscript/g, "x-vbscript");
  data.replace(/applet/g, "x-applet");
  data.replace(/embed/g, "x-embed");  // embed 태그를 사용하지 않을 경우만
  data.replace(/object/g, "x-object");    // object 태그를 사용하지 않을 경우만
  data.replace(/frame/g, "x-frame");
  data.replace(/grameset/g, "x-grameset");
  data.replace(/layer/g, "x-layer");
  data.replace(/bgsound/g, "x-bgsound");
  data.replace(/alert/g, "x-alert");
  data.replace(/onblur/g, "x-onblur");
  data.replace(/onchange/g, "x-onchange");
  data.replace(/onclick/g, "x-onclick");
  data.replace(/ondblclick/g, "x-ondblclick");
  data.replace(/enerror/g, "x-enerror");
  data.replace(/onfocus/g, "x-onfocus");
  data.replace(/onload/g, "x-onload");
  data.replace(/onmouse/g, "x-onmouse");
  data.replace(/onscroll/g, "x-onscroll");
  data.replace(/onsubmit/g, "x-onsubmit");
  data.replace(/onunload/g, "x-onunload");
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

exports.checkSpecialPattern = function(str) {
  var pattern_special = /[~!@\#$%<>^&*\()\-=+_\’]/gi;

  return str.replace(pattern_special,"2");
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

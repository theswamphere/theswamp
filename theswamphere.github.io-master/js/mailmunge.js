// call this in the body to enable
function demungeEmailsOnLoad() {
    body = document.getElementsByTagName("body")[0];
    if (body.onload) {
	body.onload=function () { body.onload(); demungeEmails(); };
    } else {
	body.onload=demungeEmails;
    }
}

function demungeEmail(text) {
    // Split off "mailto:" if necessary
    parts = text.split(":", 2);
    if (parts.length == 1) {
  	mailto = "";
	munged = parts[0];
    } else {
  	mailto = parts[0] + ":";
	munged = parts[1];
    } //-> mailto, munged

    // test if "?" is first character, otherwise skip
    parts = munged.split("?", 2);
    if (!(parts.length == 2 && parts[0] === "")) {
	// ? is not the first character
	// abort; no changes
	console.log("abort");
	return text;
    } //-> parts[1]

    // ? was the first character, so continue
    // remove the "?" from the front while proceeding
    parts = parts[1].split(/(?:\s|%20)+/);
    if (parts[0] === "") {
	parts.shift();
    }
    demunged = reverseStr(parts[1]) + "@" + reverseStr(parts[2]) + "." + reverseStr(parts[0]);
    return mailto + demunged;
}

function reverseStr(s) {
    return s.split("").reverse().join("");
}

function demungeEmails() {
    mailtos = document.getElementsByClassName("mailto");
    for (i = 0; i < mailtos.length; i+=1) {
  	e = mailtos[i];
  	// mailto
	if (e.href) {
	    e.href = demungeEmail(e.href);
	}
	// innerText
	e.innerHTML = demungeEmail(e.innerHTML).replace("@", "<span>@</span>");
    }
}

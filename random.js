'use strict';

function CustomError() {

	return this;
}

CustomError.prototype = Object.create(Array.prototype);

var bizzerror = new CustomError();
bizzerror.message = '.stack.';

function CustomError2() {
	this.warning = 'something new';
}

console.log(CustomError2);








console.log(CustomError.prototype);

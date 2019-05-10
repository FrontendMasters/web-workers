"use strict";

var curFib = 0;

// TODO

// **********************************

function fib(n) {
	if (n < 2) {
		return n;
	}
	return fib(n-1) + fib(n-2);
}

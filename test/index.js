<<<<<<< Updated upstream
'use strict'

const assert = require('chai').assert
const index = require('./../src/index')

describe('index', function() {
	it('should be a function', function() {
		assert.isFunction(index)
=======
import { assert } from 'chai';
import { useAckee } from './../build/index.js';

describe('index', function () {
	it('should be a function', function () {
		assert.isFunction(useAckee)
>>>>>>> Stashed changes
	})
})
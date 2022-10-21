import { assert } from 'chai';
import { useAckee } from './../build/index.js';

describe('index', function () {
	it('should be a function', function () {
		assert.isFunction(useAckee)
	})
})
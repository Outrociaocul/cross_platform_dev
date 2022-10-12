import { Cache } from "../src/cache";

test('Key must be defined', () => {
	const c = new Cache(); 
	const dat = {key: undefined,};
	expect(() => c.addPair(dat)).toThrowError(new Error("Key must be defined!"));
});

test('Defined data must be recorded', () => {
	const c = new Cache(); 
	const normData = {
		key: 'hello', 
		value: 123, 
		requests: 5
	}; 
	c.addPair(normData); 
	expect(c.getPair(normData.key)).toBe(normData.value); 
});

test('Default requests number must be 1', () => { 
	const c = new Cache(); 
	const dat = {
		key: 'hello', 
		value: 123,
	}; 
	c.addPair(dat); 
	expect(c.getLog()[0]).toBe(`Add ${dat.key} ${dat.value} 1`);
	expect(c.getPair(dat.key)).toBe(dat.value); 
	expect(c.getPair(dat.key)).toBeNull(); 
});

test('Requests must correcly decrease', () => {
	const c = new Cache(); 
	const dat = {
		key: 'hello', 
		value: 123,
		requests: 5
	}; 
	c.addPair(dat); 
	expect(c.getLog()[0]).toBe(`Add ${dat.key} ${dat.value} 5`);
	expect(c.getPair(dat.key)).toBe(dat.value); 
	expect(c.getPair(dat.key)).toBe(dat.value); 
	expect(c.getPair(dat.key)).toBe(dat.value); 
	expect(c.getPair(dat.key)).toBe(dat.value); 
	expect(c.getPair(dat.key)).toBe(dat.value); 
	expect(c.getPair(dat.key)).toBeNull(); 
	expect(c.getLog()[4]).toBe(`Get ${dat.key}`);
});

test('Attempt to get not existing key must lead to null', () => {
	const c = new Cache(); 
	const dat = {
		key: 'hello', 
		value: 123,
		requests: 5
	}; 
	c.addPair(dat); 
	expect(c.getPair('Cat')).toBeNull(); 
	expect(c.getPair(dat.key)).toBe(dat.value); 
});

test('Objects are correctly stored', () => {
	const c = new Cache(); 
	const dat1 = {
		key: 'cat', 
		value: 123,
		requests: 5
	}; 
	const dat2 = {
		key: 'dog', 
		value: 111,
		requests: 3
	}; 
	c.addPair(dat1); 
	c.addPair(dat2); 
	expect(c.getPair('cat')).toBe(dat1.value); 
	expect(c.getPair('dog')).toBe(dat2.value); 
});

test('Cache must provide valid statistics', () => {
	const c = new Cache(); 
	const dat1 = {
		key: 'hello', 
		value: 123,
		requests: 5
	};
	const dat2 = {
		key: 'cat', 
		value: 321,
		requests: 3
	};
	const dat3 = {
		key: 'dog', 
		value: 111,
		requests: 2
	};	
	c.addPair(dat1);
	c.addPair(dat2);
	c.addPair(dat3);
	
	const log = [
		`Add ${dat1.key} ${dat1.value} ${dat1.requests}`,
		`Add ${dat2.key} ${dat2.value} ${dat2.requests}`,
		`Add ${dat3.key} ${dat3.value} ${dat3.requests}`	
	];
	expect(c.getLog()[0]).toBe(log[0]);
	expect(c.getLog()[1]).toBe(log[1]);
	expect(c.getLog()[2]).toBe(log[2]);
	
	const stat = [
		`key: ${ dat1.key }, value: ${ dat1.value }, requests: ${ dat1.requests }`,		
		`key: ${ dat2.key }, value: ${ dat2.value }, requests: ${ dat2.requests }`,
		`key: ${ dat3.key }, value: ${ dat3.value }, requests: ${ dat3.requests }`,
	];
	
	expect(c.getStatistics()).toBe(stat.join('\r\n'));
});


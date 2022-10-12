export class Cache {
	#map = new Map();
	#log = [];

	addPair({ key, value, requests = 1 }) {
		if (!key) {
			throw new Error("Key must be defined!");
		}
		if (requests < 1){
			throw new Error("Requests number must be at least 1"); 
		}
		this.#map.set(key, { value, requests });
		this.#log.push(`Add ${key} ${value} ${requests}`); 
	}

	getPair(key) {
		if (!this.#map.has(key)) {
			return null;
		}

		const old_value = this.#map.get(key);
		const new_value = { value: old_value.value, requests: old_value.requests - 1 };

		this.#log.push(`Get ${key}`);

		if (new_value.requests == 0) {
			this.#map.delete(key);
		}
		else {
			this.#map.set(key, new_value);
		}

		return new_value.value;
	}

	getLog() {
		return this.#log;
	}

	getStatistics() {
		let stat = '';
		
		if (this.#map.size < 1) {
			return stat;
		}
		
		let arr = []
		for (const [key, value] of this.#map) {
			stat += `key: ${ key }, value: ${ value.value }, requests: ${ value.requests }\r\n`;
		}
		/*
		this.#map.forEach((key, value, map) => {
			stat += `key: ${ key }, value: ${ value.value }, requests: ${ value.requests }\r\n`;
		});*/
		
		return stat.substring(0, stat.length - 2);
	}
}
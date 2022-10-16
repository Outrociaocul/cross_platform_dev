class MiniMaple
{
	#elems = []; 
	
	addElem(varname, power, coef, sign)
	{
		this.#elems.push({varname, power, coef, sign});
	}

    getElems()
    {
        let res = []; 
        for (const elem of this.#elems)
        {
            res.push(`${elem.varname} ${elem.power} ${elem.coef} ${elem.sign}`);
        }
        return res; 
    }

	scanText(text)
	{
		let sign = undefined; 
		let coef = undefined; 
		let varname = undefined; 
		let power = undefined; 
		for (let i = 0; i < text.length; ++i)
		{
            let c = text.charAt(i);
                //console.log(c); 
			if (c == ' ') 
			{}
			else if (c == '+' || c == '-')
			{
				if (power !== undefined)
				{
					this.addElem(varname, power, coef, sign);
					sign = undefined; 
					coef = undefined; 
					varname = undefined; 
					power = undefined; 
				}
				sign = c; 
                //console.log(c); 
			}
			else if (c.match(/[01-9]/i) && coef === undefined)
			{
				coef = Number(c); 
				if (sign === undefined)
					sign = '+';
			}
			else if (c.match(/[01-9]/i) && varname === undefined)
			{
				coef *= 10; 
				coef += Number(c); 
			}
			else if (c == '*')
			{}
			else if ((/[a-z]/i).test(c))
			{
				if (varname === undefined)
					varname = c; 
				else 
					varname += c; 
			}
			else if (c == '^')
			{}
			else if (c.match(/[01-9]/i))
			{
				if (power === undefined)
					power = Number(c); 
				else 
					{
						power *= 10; 
						power += Number(c); 
					}
			}
			else 
			{
				throw new Error("Wrong symbol in equation");
			}
		}
        //console.log(varname);
        this.addElem(varname, power, coef, sign);
	}
	
	diff(varname)
	{
		let first = true; 
		let result = "";
		for (const elem of this.#elems)
		{
			if (elem.varname.trim() === varname.trim())
			{
				let sign = (first && elem.sign == '+') ? "" : elem.sign;
                //console.log(elem.key);
				result += sign + (elem.coef * elem.power) + "*" + elem.varname + "^" + (elem.power - 1); 
			}
			else 
			{
				let sign = (first && elem.sign == '+') ? "" : elem.sign;
                //console.log(`bad ${varname} ${elem.varname}`);
				result += sign + elem.coef + "*" + elem.varname + "^" + elem.power; 
			}
			first = false;
		}
		return result; 
	}

}


export {MiniMaple}
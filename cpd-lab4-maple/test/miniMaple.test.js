import {MiniMaple} from "../src/miniMaple";

test('elements are parsed correctly', () => {
    const eq = "4*x^2-5*y^2-6*x^7";
    const mm = new MiniMaple(); 
    mm.scanText(eq); 
    const result = mm.getElems(); 
    expect(result[0]).toBe("x 2 4 +");
    expect(result[1]).toBe("y 2 5 -");
    expect(result[2]).toBe("x 7 6 -");
});

test('should throw error when unexpected symbol', () =>
{
    let eq = "4/x^2-5*y^2-6*x^7";
    let mm = new MiniMaple(); 
    expect(() => mm.scanText(eq)).toThrowError(new Error("Wrong symbol in equation"));
    
    eq = "4*x^2-5*:y^2-6*x^7";
    mm = new MiniMaple(); 
    expect(() => mm.scanText(eq)).toThrowError(new Error("Wrong symbol in equation"));
    
    eq = "4*x^2-5*y^2-6*,x^7";
    mm = new MiniMaple(); 
    expect(() => mm.scanText(eq)).toThrowError(new Error("Wrong symbol in equation"));
    
});

test('results of diff should be correct', () => 
{
    let eq = "4*x^2-5*y^2-6*x^7";
    let mm = new MiniMaple(); 
    mm.scanText(eq); 
    let result = mm.diff('x');
    expect(result).toBe("8*x^1-5*y^2-42*x^6");

    eq = "-3*abb^3-5*y^4+2*a^4";
    mm = new MiniMaple(); 
    mm.scanText(eq); 
    result = mm.diff('abb');
    expect(result).toBe("-9*abb^2-5*y^4+2*a^4");

    eq = "10*x^10";
    mm = new MiniMaple(); 
    mm.scanText(eq); 
    result = mm.diff('x');
    expect(result).toBe("100*x^9");
});
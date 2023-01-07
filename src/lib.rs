use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasmCycle(arg: usize) -> String {
    let mut b: usize = 0;
    for num in 0..arg {
        b = b + 2;
    }

    String::from(b.to_string())
}

#[wasm_bindgen]
pub fn wasmIterate(arg: usize) -> Vec<i64> {
    let mut array: [i64; 10000] = [0; 10000];
    for num in 0..arg {
        for i in 0..array.len() {
            array[i] = array[i] + 1;
        }
    }
    array.to_vec()
}

#[wasm_bindgen]
pub fn wasmFib(n: usize) -> usize {
    if n <= 1 {
        return n;
    } else {
        return wasmFib(n - 1) + wasmFib(n - 2);
    }
}




